from django.contrib import admin
from . import models

@admin.register(models.Flashcard)
class FlashcardAdmin(admin.ModelAdmin):
    list_display = ("id", "source_text", "target_language", "target_text", "user", "status", "created_at", "display_saved_by")
    list_filter = ("status", "created_at", "target_language")
    search_fields = ("source_text", "target_text")

    def display_saved_by(self, obj):
        return ", ".join([user.username for user in obj.saved_by.all()])
    display_saved_by.short_description = 'Saved By'

admin.site.register(models.SavedFlashcard)
