from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings

# Create your models here.

class SavedFlashcard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flashcard = models.ForeignKey('Flashcard', on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'flashcard')

class Flashcard(models.Model):

    class FlashcardObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status=True)


    source_text = models.CharField(max_length=200)
    target_language = models.CharField(max_length=200)
    target_text = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    status = models.BooleanField(default=False, verbose_name="Published?")
    saved_by = models.ManyToManyField(User, related_name='saved_flashcards', through=SavedFlashcard)

    objects = models.Manager() # The default manager
    flashcardobjects = FlashcardObjects() # Our custom manager

    class Meta:
        ordering = ('-created_at',) # The negative sign indicates descending order

    def __str__(self):
        return self.source_text + " -> " + self.target_text
