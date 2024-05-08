import React, { FC, memo } from "react";
import { FlashcardType } from "../../types/FlashcardType";
import { Card, Text, Badge, Center, ActionIcon } from "@mantine/core";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FlashcardListItemProps {
  item: FlashcardType;
}

export const FlashcardListItem: FC<FlashcardListItemProps> = memo(
  ({ item }) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
      navigate(`/flashcard/${item.id}/edit`);
    };

    const handleDeleteClick = async () => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/${item.id}/delete/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        console.log("Flashcard deleted: ", response.data);
        navigate("/flashcard");
      } catch (error) {
        console.error(error); // Handle the error as needed
      }
    };

    return (
      <Card shadow="sm" padding="sm" radius="md" style={{ marginBottom: 10, border: "2px solid #e3e8ee" }}>
        {item.status ? (
          <ActionIcon
            variant="gradient"
            size="sm"
            aria-label="Gradient action icon"
            gradient={{ from: "green", to: "lightgray", deg: 90 }}
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={handleDeleteClick}
          >
            <IconSquareRoundedX />
          </ActionIcon>
        ) : (
          <ActionIcon
            variant="gradient"
            size="sm"
            aria-label="Gradient action icon"
            gradient={{ from: "blue", to: "lightgray", deg: 90 }}
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={handleDeleteClick}
          >
            <IconSquareRoundedX />
          </ActionIcon>
        )}

        <Text fw={700} size="lg" mt="nd">
          {item.source_text}
        </Text>
        <Text fw={700} size="lg" mt="nd">
          {item.target_language}
        </Text>
        <Text fw={700} size="lg" mt="nd">
          {item.target_text}
        </Text>
        {item.status ? (
          <Badge variant="outline" color="green" mt={10}>
            Published
          </Badge>
        ) : (
          <Badge variant="outline" color="Blue" mt={10}>
            Private
          </Badge>
        )}
      </Card>
    );
  }
);
