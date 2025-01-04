"use client"
import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

export default function Login() {
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
        const result = await signInAction(data)

        if (result && formRef.current) {
            if (result.status === 201 || result.status === 200) {
                router.push('/dashboard')
                toast(result.data.success)
            } else {
                toast(result.data.error)
            }
            formRef.current.reset()
        }
    }
    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <h1 className="text-2xl font-medium">Sign in</h1>
            <p className="text-sm text-foreground">
                Don't have an account?{" "}
                <Link className="text-foreground font-medium underline" href="/auth/sign-up">
                    Sign up
                </Link>
            </p>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        className="text-xs text-foreground underline"
                        href="/forgot-password"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required
                />
                <SubmitButton pendingText="Signing In...">
                    Sign in
                </SubmitButton>
            </div>
        </form>
    );
}
