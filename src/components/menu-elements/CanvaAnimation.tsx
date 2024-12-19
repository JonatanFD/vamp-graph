import { Algorithm, useAnimation } from "@/hooks/use-animation";
import { useVampGraph } from "@/hooks/use-vamp-graph";
import { SidebarGroup, SidebarGroupLabel } from "../ui/sidebar";
import Prim from "../algorithms/Prim";
import Kruskal from "../algorithms/Kruskal";
import FordFulkerson from "../algorithms/FordFulkerson";

export default function CanvaAnimation() {
    const { pages } = useVampGraph();
    const { algorithm } = useAnimation();

    if (pages.length === 0) return null;
    if (algorithm === null) return null;

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between">
                <span>Animation</span>
            </SidebarGroupLabel>

            {algorithm === Algorithm.PRIM && <Prim />}
            {algorithm === Algorithm.KRUSKAL && <Kruskal />}
            {algorithm === Algorithm.FULKERSON && <FordFulkerson />}
        </SidebarGroup>
    );
}
