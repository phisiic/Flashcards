import { SimpleGrid } from "@mantine/core";
import { FlashcardPublicType } from "../../types/FlashcardPublicType";
import { FlashcardPublicItem } from "./FlashcardPublicItem";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const FlashcardPublic = () => {
  const [flashcards, setFlashcards] = useState<FlashcardPublicType[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/public/")
      .then((response) => {
        console.log(response.data);
        setFlashcards(response.data);
      })
      .catch((error) => console.log("Error fetching data: ", error));
  }, []);

  return (
    <div style={{ width: 1000, margin: "auto" }}>
      <SimpleGrid cols={{ base: 5, sm: 2, lg: 3 }}>
        {flashcards.map((item) => (
          <FlashcardPublicItem key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </div>
  );
};
