import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import UserIcon from "@/components/user-icon";
import Link from "next/link";
import React from 'react'

const DashboardLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
                <nav className="w-full flex border-b border-b-foreground/10 h-16">
                    <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
                        <div className="flex gap-5 items-center font-semibold">
                            <SidebarTrigger />
                            <Link href={"/"} className="text-xl">
                                Libom
                            </Link>
                        </div>
                        <div className="flex gap-2 items-center">
                            <UserIcon />
                        </div>
                    </div>
                </nav>
                <main className="flex flex-col items-center px-5 my-8">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout
