import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ArrowLeftRight, Blocks, Book, Check, CheckCircle, DollarSign, Home, Pen } from 'lucide-react'
import Link from 'next/link'

const AppSidebar = () => {
    const items = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "Add Book",
            url: "/dashboard/add-book",
            icon: Book,
        },
        {
            title: "Edit Book",
            url: "/dashboard/edit-book/hi",
            icon: Pen,
        },
        {
            title: "Approve Borrowing",
            url: "/dashboard/approve-borrowing",
            icon: Check,
        },
        {
            title: "Approve Returning",
            url: "/dashboard/approve-returning",
            icon: CheckCircle,
        },
        {
            title: "Holdings",
            url: "/dashboard/holdings",
            icon: Blocks,
        },
        {
            title: "Subscription",
            url: "/dashboard/subscription",
            icon: DollarSign,
        },
        {
            title: "Transactions",
            url: "/dashboard/transactions",
            icon: ArrowLeftRight,
        },
    ]

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>

    )
}

export default AppSidebar
