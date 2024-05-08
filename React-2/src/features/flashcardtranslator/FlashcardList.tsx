import { SimpleGrid } from "@mantine/core";
import { FlashcardType } from "../../types/FlashcardType";
import { FlashcardListItem } from "./FlashcardListItem";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);

  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");

    axios.get("http://127.0.0.1:8000/api/", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
      })
      .then((response) => {
        console.log(response.data);
        setFlashcards(response.data);
      })
      .catch((error) => console.log("Error fetching data: ", error));
  }, []);

  if (flashcards.length === 0){
     return (
      <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
        <h1>Welcome, {userName}!</h1>
        <h2>Looks like you have no flashcards yet!</h2>
      </div>
     )
    }

  return (
    <div style={{ width: 1000, margin: "auto" }}>
      <h1>Welcome, {userName}!</h1>
      <SimpleGrid cols={{ base: 5, sm: 2, lg: 3 }}>
        {flashcards.map((item) => (
          <FlashcardListItem key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </div>
  );
};
