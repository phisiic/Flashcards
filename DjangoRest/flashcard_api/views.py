# Importing necessary modules
from django.http import Http404
from rest_framework import generics
from flashcard.models import Flashcard, SavedFlashcard
from .serializers import FlashcardSerializer, FlashcardTranslatorSerializer, FlashcardWithUsernameSerializer, SavedFlashcardSerializer
from rest_framework.permissions import BasePermission, IsAuthenticated, AllowAny, SAFE_METHODS
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


class IsAuthenticatedOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated


class PostUserWritePermission(BasePermission):
    message = "Editing flashcards is restricted to the author only."

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
    
class FlashcardCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardTranslatorSerializer

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        print(self.request.data)
        serializer.save(user=self.request.user)

class FlashcardList(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = FlashcardSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Flashcard.objects.filter(user=user)
        else:
            return Flashcard.objects.none()

class FlashcardDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
#     permission_classes = [PostUserWritePermission]
#     queryset = Flashcard.objects.all()
#     serializer_class = FlashcardSerializer
    pass

class FlashcardUpdateView(generics.UpdateAPIView):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
    lookup_field = 'id'
    permission_classes = [PostUserWritePermission]

class FlashcardDeleteView(generics.DestroyAPIView):
    queryset = Flashcard.objects.all()
    lookup_field = 'id'

class PublicFlashcardsView(generics.ListAPIView):
    serializer_class = FlashcardWithUsernameSerializer

    def get_queryset(self):
        return Flashcard.objects.filter(status=True)
    

class SaveFlashcardView(APIView):
    def post(self, request, flashcard_id, format=None):
        user = request.user
        try:
            flashcard = Flashcard.objects.get(id=flashcard_id)
        except Flashcard.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if SavedFlashcard.objects.filter(user=user, flashcard=flashcard).exists():
            return Response({"detail": "This flashcard is already saved."}, status=status.HTTP_400_BAD_REQUEST)
        
        SavedFlashcard.objects.create(user=user, flashcard=flashcard)
        return Response(status=status.HTTP_201_CREATED)

class UserSavedFlashcardsView(generics.ListAPIView, generics.DestroyAPIView):
    serializer_class = SavedFlashcardSerializer

    def get_queryset(self):
        user = self.request.user
        return SavedFlashcard.objects.filter(user=user)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = SavedFlashcardSerializer(queryset, many=True)
        print(serializer.data)  # Print the serialized data
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def perform_destroy(self, instance):
        instance.delete()

class DeleteSavedFlashcardView(generics.DestroyAPIView):
    queryset = SavedFlashcard.objects.all()
    lookup_field = 'id'


