import { FlashcardPublicType } from "../../types/FlashcardPublicType";

describe('FlashcardPublicType', () => {
  it('should have the correct structure', () => {
    const flashcard: FlashcardPublicType = {
      source_text: 'Test Source Text',
      target_language: 'Test Target Language',
      user: 'TestUser',
    };

    expect(flashcard).toHaveProperty('source_text', 'Test Source Text');
    expect(flashcard).toHaveProperty('target_language', 'Test Target Language');
    expect(flashcard).toHaveProperty('user', 'TestUser');
    expect(flashcard).toHaveProperty('target_text', undefined);
    expect(flashcard).toHaveProperty('id', undefined);
  });
});
