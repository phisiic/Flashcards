import { FlashcardFormValues } from "../../types/FlashcardFormValues";
import { useFlashcardForm } from "./hooks/useFlashcardForm";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LoadingOverlay,
  Button,
  Group,
  Box,
  NativeSelect,
  Checkbox,
} from "@mantine/core";
import { Stack } from "@mantine/core";
import { TextInput } from "@mantine/core";

interface FlashcardEditFormProps {
  flashcardId: string;
}

export const FlashcardEditForm = () => {
  const { id } = useParams();
  const form = useFlashcardForm();

  useEffect(() => {
    // Load the flashcard data when the component is first rendered
    const loadFlashcard = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/${id}/edit/`
      );
      form.setValues(response.data);
    };

    loadFlashcard();
  }, [id]);

  const handleSubmit = async () => {
    console.log("Deleting flashcard:", id); // Log the id

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/${id}/delete/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log("Flashcard deleted: ", response.data);
    } catch (error) {
      console.error(error); // Handle the error as needed
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Box>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Source Text"
              {...form.getInputProps("source_text")}
            />
            <TextInput
              label="Target Language"
              {...form.getInputProps("target_language")}
            />
            <TextInput
              label="Target Text"
              {...form.getInputProps("target_text")}
            />
            <Checkbox
              style={{ marginTop: 10 }}
              label="Publish"
              description="Make this flashcard public?"
              {...form.getInputProps("status", { type: "checkbox" })}
            />
            <Group align="center" justify="center" style={{ marginTop: 10 }}>
              <Button type="submit">Submit</Button>
            </Group>
          </Stack>
        </form>
        </Box>
    </div>
  );
};
