import React, { FC, memo, useState, useContext } from "react";
import { FlashcardType } from "../../types/FlashcardType";
import {
  Card,
  Text,
  Badge,
  Center,
  ActionIcon,
  Image,
  Title,
} from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FlashcardPublicType } from "../../types/FlashcardPublicType";
import { AuthContext } from "../../AuthContext";

interface FlashcardPublicItemProps {
  item: FlashcardPublicType;
}

interface LanguageImages {
  [key: string]: string;
}

// Mapping of languages to country flags
const languageImages: LanguageImages = {
  English:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png",
  French:
    "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/255px-Flag_of_France.svg.png",
  Spanish:
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg",
  German:
    "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png",
  Italian:
    "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/255px-Flag_of_Italy.svg.png",
  Russian:
    "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/255px-Flag_of_Russia.svg.png",
  Polish:
    "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/255px-Flag_of_Poland.svg.png",
  // Add more languages and flags as needed
};

export const FlashcardPublicItem: FC<FlashcardPublicItemProps> = memo(
  ({ item }) => {
    const navigate = useNavigate();
    const imageUrl = languageImages[item.target_language];
    const [isSaved, setIsSaved] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);

    const handleSaveFlashcard = async () => {
      const url = `http://127.0.0.1:8000/api/save/${item.id}/`;
      console.log("Sending POST request to:", url);
      try {
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (response.status === 201) {
          // Flashcard saved successfully
          setIsSaved(true);
          console.log("Flashcard saved successfully");
        } else if (response.status === 400) {
          // Flashcard already saved
          console.log("This flashcard is already saved.");
        } else {
          // Handle other statuses
          console.log("An error occurred while saving the flashcard.");
        }
      } catch (error) {
        console.error("Error saving flashcard:", error);
      }
    };

    return (
      <Card
        shadow="sm"
        padding="sm"
        radius="md"
        style={{ marginBottom: 10, border: "2px solid #e3e8ee" }}
      >
        <Card.Section>
          <Image
            src={imageUrl}
            alt={item.target_language}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "md",
              marginBottom: 10,
            }}
          />
        </Card.Section>
        {isLoggedIn && (
          <ActionIcon
            size="sm"
            aria-label="Gradient action icon"
            bg={"pink"}
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={handleSaveFlashcard}
          >
            {isSaved ? <IconHeartFilled /> : <IconHeart />}
          </ActionIcon>
        )}
        <Title order={3} mt="md">
          Phrase:
        </Title>
        <Text size="lg" mt="xs">
          {item.source_text}
        </Text>
        <Title order={3} mt="md">
          Language:
        </Title>
        <Text size="lg" mt="xs">
          {item.target_language}
        </Text>
        <Title order={3} mt="md">
          Translation:
        </Title>
        <Text size="lg" mt="xs">
          {item.target_text}
        </Text>
        <Title order={3} mt="md">
          Author:
        </Title>
        <Text size="lg" mt="xs">
          {item.user}
        </Text>
      </Card>
    );
  }
);
