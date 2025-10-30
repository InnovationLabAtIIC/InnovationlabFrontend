import { SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "@/providers/theme-provider";

import { Calendar, Home, Inbox, Settings, UsersIcon } from "lucide-react"

import "../globals.css"


export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}


export function AppSidebar() {
    const items = [
        {
            title: "Home",
            url: "#",
            icon: Home,
        },
        {
            title: "News",
            url: "#",
            icon: Inbox,
        },
        {
            title: "Events",
            url: "#",
            icon: Calendar,
        },
        {
            title: "About",
            url: "#",
            icon: UsersIcon,
        },
        {
            title: "Testimonials",
            url: "#",
            icon: UsersIcon,
        },
        {
            title: "Users",
            url: "#",
            icon: UsersIcon,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
    ]

    return (

        <html lang="en" suppressHydrationWarning>
            <body className={` antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Sidebar>
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>MENU</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild>
                                                    <a href={item.url}>
                                                        <item.icon />
                                                        <span>{item.title}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                </ThemeProvider>
            </body>
        </html>
    )
}