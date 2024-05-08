from django.urls import path
from .views import FlashcardList, FlashcardDeleteView, FlashcardCreate, FlashcardUpdateView, PublicFlashcardsView, SaveFlashcardView, UserSavedFlashcardsView, DeleteSavedFlashcardView

app_name = "flashcard_api"

urlpatterns = [
    path("<int:id>/edit/", FlashcardUpdateView.as_view(), name="flashcardedit"),
    path("", FlashcardList.as_view(), name="listcreate"),
    path("create/", FlashcardCreate.as_view(), name="flashcardcreate"),
    path("<int:id>/delete/", FlashcardDeleteView.as_view(), name="flashcarddelete"),
    path("public/", PublicFlashcardsView.as_view(), name="publiclist"),
    path("save/<int:flashcard_id>/", SaveFlashcardView.as_view(), name="saveflashcard"),
    path("saved/", UserSavedFlashcardsView.as_view(), name="savedflashcards"),
    path("saved/<int:id>/delete/", DeleteSavedFlashcardView.as_view(), name="deletesavedflashcard"),
]
