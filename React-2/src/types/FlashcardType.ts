export type FlashcardType = {
    id?: number;
    source_text: string;  // The text to be translated
    target_language: string;  // The language to translate to
    target_text?: string;  // The translated text
    status: boolean;  // The status of the flashcard     1 - Published    0 - Private
}