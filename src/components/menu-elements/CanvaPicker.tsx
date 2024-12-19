import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import { useVampGraph } from "@/hooks/use-vamp-graph";
import CreateCanva from "../forms/CreateCanva";

export default function CanvaPicker() {
    const { pages, currentPage, setCurrentPage } = useVampGraph();
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between">
                <span>Pages</span>
                <CreateCanva>
                    <Button variant="ghost" className="p-1 h-fit">
                        <Plus size={16} />
                    </Button>
                </CreateCanva>
            </SidebarGroupLabel>

            <SidebarGroupContent>
                <SidebarMenu>
                    {pages.map((item) => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton
                                asChild
                                isActive={item.id === currentPage}
                                onClick={() => setCurrentPage(item.id)}
                            >
                                <span>{item.name}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
