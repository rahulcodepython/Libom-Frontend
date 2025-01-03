import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { ThemeSwitcher } from "./theme-switcher";
import UserIcon from "./user-icon";

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
                    <Link href={"/books"}>
                        Books
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
        <UserIcon />
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