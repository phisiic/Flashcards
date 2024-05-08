import { FlashcardPublicType } from "./FlashcardPublicType";

export type SavedFlashcardType = {
    id: number;
    flashcard: FlashcardPublicType;
    user: string;
}