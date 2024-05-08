import { SimpleGrid } from "@mantine/core";
import { FlashcardPublicType } from "../../types/FlashcardPublicType";
import { FlashcardPublicItem } from "./FlashcardPublicItem";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FlashcardSavedItem } from "./FlashcardSavedItem";

interface Flashcard {
    id: number;
    source_text: string;
    target_language: string;
    target_text: string;
    user: string;
  }

interface User {
    id: number;
    username: string;
  }
  
  interface SavedFlashcard {
    created_at: string;
    flashcard: Flashcard;
    id: number;
    user: User;
  }

export const FlashcardSaved = () => {
  const [flashcards, setFlashcards] = useState<FlashcardPublicType[]>([]);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    axios
      .get("http://127.0.0.1:8000/api/saved/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const flashcards = response.data.map((item: SavedFlashcard) => item.flashcard);
        setFlashcards(flashcards);
      })
      .catch((error) => console.log("Error fetching data: ", error));
  }, []);

  return (
    <div style={{ width: 1000, margin: "auto" }}>
      <SimpleGrid cols={{ base: 5, sm: 2, lg: 3 }}>
        {flashcards.map((item) => (
          <FlashcardSavedItem key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </div>
  );
};
