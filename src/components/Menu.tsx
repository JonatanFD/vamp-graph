import { Waypoints } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarSeparator,
} from "./ui/sidebar";
import CanvaPicker from "./menu-elements/CanvaPicker";
import CanvaAlgorithm from "./menu-elements/CanvaAlgorithm";
import CanvaSettings from "./menu-elements/CanvaSettings";

export default function Menu() {
    return (
        <Sidebar variant="floating">
            <SidebarHeader>
                <div className="p-2 flex items-center flex-row gap-2">
                    <Waypoints />
                    <h1>Vamp Graph</h1>
                </div>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>
                <CanvaPicker />
                <CanvaAlgorithm />
            </SidebarContent>

            <SidebarSeparator />

            <SidebarFooter className="flex gap-2 flex-row">
                <CanvaSettings />
            </SidebarFooter>
        </Sidebar>
    );
}
