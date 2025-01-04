"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
    pendingText?: string;
};

export function SubmitButton({
    children,
    pendingText = "Submitting...",
    ...props
}: Props) {
    const formState = useFormStatus();
    const pending = formState.pending;

    return (
        <Button type="submit" aria-disabled={pending} {...props}>
            {pending ? pendingText : children}
        </Button>
    );
}
