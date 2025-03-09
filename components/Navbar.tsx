import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import UserIcon from "./user-icon";
import { getAccessToken } from "@/app/actions";
import { isAuthenticated } from "@/utils/utils";

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
    const access = await getAccessToken();
    const isAuth = isAuthenticated(access);

    return isAuth ? (
        <UserIcon />
    ) : (
        <Button asChild size="sm" variant={"outline"}>
            <Link href="/auth/sign-in">Sign in</Link>
        </Button>
    );
}