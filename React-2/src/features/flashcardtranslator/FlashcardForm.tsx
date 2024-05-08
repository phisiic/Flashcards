import { FlashcardFormValues } from "../../types/FlashcardFormValues";
import { useFlashcardForm } from "./hooks/useFlashcardForm";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

export const FlashcardForm = () => {
  const form = useFlashcardForm();
  const navigate = useNavigate();
  

  const handleSubmit = async (values: FlashcardFormValues) => {
    
    console.log('Sending data to endpoint:', values); // Log the data
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create/", values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log('Flashcard created: ', response.data);
      navigate("/flashcard");
    } catch (error) {
      console.error(error); // Handle the error as needed
    }
  }

  return (
    <div style={{ marginTop: 30 }}>
      <Box pos="relative">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack h={300} bg="var(--mantine-color-body)" align="center">
            <TextInput
              variant="unstyled"
              size="md"
              label="Text"
              withAsterisk
              description="What do you wish to translate?"
              placeholder="Text"
              {...form.getInputProps("source_text")}
            />
            <NativeSelect
              label="Language"
              withAsterisk
              description="What language are we translating to?"
              defaultValue={"English"}
              data={[
                "English",
                "Spanish",
                "French",
                "German",
                "Italian",
                "Polish",
                "Russian",
              ]}
              {...form.getInputProps("target_language")}
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
