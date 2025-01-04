"use client";
import { signUpAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

export default async function Signup() {
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = {
            email: formData.get("email")?.toString() || "",
            password: formData.get("password")?.toString() || "",
        }
        if (data?.email.length <= 0 || data.password.length <= 0) {
            console.log("Invalid data");
            return;
        }
        await signUpAction(data)

        if (formRef.current) {
            //     if (result.status === 201 || result.status === 200) {
            //         router.push('/dashboard')
            //         toast(result.data.success)
            //     } else {
            //         toast(result.data.error)
            //     }
            toast("Successfully signed up")
            formRef.current.reset()
            router.push('/dashboard')
        }
    }

    return (
        <form className="flex flex-col w-full" ref={formRef} onSubmit={handleSubmit}>
            <h1 className="text-2xl font-medium">Sign up</h1>
            <p className="text-sm text text-foreground">
                Already have an account?{" "}
                <Link className="text-primary font-medium underline" href="/auth/sign-in">
                    Sign in
                </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    minLength={6}
                    required
                />
                <SubmitButton pendingText="Signing up...">
                    Sign up
                </SubmitButton>
            </div>
        </form>
    );
}
