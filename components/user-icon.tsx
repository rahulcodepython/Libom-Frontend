import React from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react'
import Link from 'next/link'
import { signOutAction } from "@/app/actions";

export default function UserIcon() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span className='p-2 rounded-full bg-accent cursor-pointer'>
                    <User className="w-4 h-4" />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className='cursor-pointer'>
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>
                        Subscription
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <form action={signOutAction}>
                    <DropdownMenuItem className='cursor-pointer'>
                        Logout
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}