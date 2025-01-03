import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { ThemeSwitcher } from "./theme-switcher";
import { LogOut, User } from "lucide-react";

export default async function Navbar() {

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold text-xl">
                    <Link href={"/"}>
                        Libom
                    </Link>
                </div>
                <div className="flex gap-2 items-center">
                    <ThemeSwitcher />
                    <NavButton />
                </div>
            </div>
        </nav>
    )

}

const NavButton = async () => {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user ? (
        <div className="flex items-center gap-2">
            <Link href={`/dashboard`} className="hover:bg-accent p-3 rounded-full">
                <User size={16} />
            </Link>
            <form action={signOutAction}>
                <Button type="submit" variant={"outline"}>
                    <LogOut size={16} />
                </Button>
            </form>
        </div>
    ) : (
        <div className="flex gap-2">
            <Button asChild size="sm" variant={"outline"}>
                <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="sm" variant={"default"}>
                <Link href="/sign-up">Sign up</Link>
            </Button>
        </div>
    );
}