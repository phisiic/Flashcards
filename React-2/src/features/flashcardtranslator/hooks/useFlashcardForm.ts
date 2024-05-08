import { useForm } from "@mantine/form";
import { FlashcardFormValues } from "../../../types/FlashcardFormValues";

export const useFlashcardForm = () => {
    const form = useForm<FlashcardFormValues>({
        initialValues: {
            source_text: "",
            target_language: "",
            status: false,
        },

        validate: {
            source_text: (value: string) => {
                if (value.trim().length === 0) {
                    return "Source text is required";
                }
            },
            target_language: (value: string) => {
                if (value.trim().length === 0) {
                    return "Target language is required";
                }
            }
        }
    });

    return form;
}