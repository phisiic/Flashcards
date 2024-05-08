export type FlashcardPublicType = {
    id?: number;
    source_text: string;  // The text to be translated
    target_language: string;  // The language to translate to
    target_text?: string;  // The translated text
    user: string;  // The username of the user who created the flashcard
}