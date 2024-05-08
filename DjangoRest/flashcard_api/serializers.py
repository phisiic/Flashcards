from rest_framework import serializers
from flashcard.models import Flashcard, SavedFlashcard
from googletrans import Translator

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ["id", "source_text", "target_language", "target_text", "user", "status"]

class FlashcardTranslatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['source_text', 'target_language', 'status']

    def create(self, validated_data):
        translator = Translator()
        translated_text = translator.translate(validated_data['source_text'], dest=validated_data['target_language'])
        validated_data['target_text'] = translated_text.text
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        instance.source_text = validated_data.get('source_text', instance.source_text)
        instance.target_language = validated_data.get('target_language', instance.target_language)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance


class FlashcardWithUsernameSerializer(FlashcardSerializer):
    user = serializers.SerializerMethodField()

    class Meta(FlashcardSerializer.Meta):
        fields = FlashcardSerializer.Meta.fields + ["user"]

    def get_user(self, obj):
        return obj.user.username
    
class SavedFlashcardSerializer(serializers.ModelSerializer):
    flashcard = FlashcardSerializer(read_only=True)
    user = serializers.SerializerMethodField()

    class Meta:
        model = SavedFlashcard
        fields = ["id", "user", "flashcard", "created_at"]

    def get_user(self, obj):
        return obj.user.username
