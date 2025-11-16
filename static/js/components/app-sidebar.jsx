import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Trophy,
  Users,
  UserCircle,
  BarChart3,
  DollarSign,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { SettingsDialog } from "@/components/settings-dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Navigation items with submenus
const navItems = [
  {
    title: "Tournaments",
    url: "/",
    icon: Trophy,
    items: [
      { title: "Diamond/Open", url: "/tournaments/diamond-open" },
      { title: "Silver/Gold", url: "/tournaments/silver-gold" },
      { title: "Iron/Bronze", url: "/tournaments/iron-bronze" },
      { title: "Daily", url: "/tournaments/daily" },
      { title: "Weekly", url: "/tournaments/weekly" },
      { title: "Quick", url: "/tournaments/quick" },
      { title: "Perfect Draft", url: "/tournaments/perfect-draft" },
    ],
  },
  {
    title: "Teams",
    url: "/teams",
    icon: Users,
  },
  {
    title: "Players",
    url: "/players",
    icon: UserCircle,
  },
  {
    title: "Leaderboards",
    url: "/leaderboards",
    icon: BarChart3,
  },
  {
    title: "Cap Values",
    url: "/cap-values",
    icon: DollarSign,
  },
]

export function AppSidebar({ currentPath, ...props }) {
  const location = useLocation()
  const activePath = currentPath || location.pathname

  // Helper to check if a link is active
  const isActive = (url) => {
    if (url === "/") {
      return activePath === "/"
    }
    return activePath.startsWith(url)
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Tournament Stats
        </h2>
      </SidebarHeader>

      <SidebarContent>
        {/* Navigation Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                // Item with submenu
                if (item.items) {
                  return (
                    <Collapsible key={item.title} asChild defaultOpen={false}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={isActive(item.url)}
                            className="rounded-lg"
                          >
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActive(subItem.url)}
                                >
                                  <Link to={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                // Regular item without submenu
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      className="rounded-lg"
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            v1.0.0 • Flask + React
          </p>
          <SettingsDialog />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}