import { useVampGraph } from "@/hooks/use-vamp-graph";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "../ui/sidebar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Algorithm, useAnimation } from "@/hooks/use-animation";
import { prim } from "@/lib/algorithms/prim";
import { kruskal } from "@/lib/algorithms/kruskal";
import { ford_fulkerson } from "@/lib/algorithms/ford-fulkerson";

export default function CanvaAlgorithm() {
    const { pages, getCurrentPage } = useVampGraph();
    const { setAlgorithm, setSolution } = useAnimation();
    if (pages.length === 0) return null;

    const handleValueChange = (value: Algorithm) => {
        const currentPage = getCurrentPage();
        if (!currentPage) return;

        const graphNames = Object.keys(currentPage.graph);

        setAlgorithm(value);
        if (value === Algorithm.PRIM) {
            setSolution(prim(currentPage.graph, graphNames[0]));
        } else if (value === Algorithm.KRUSKAL) {
            setSolution(kruskal(currentPage.graph));
        } else if (value === Algorithm.FULKERSON) {
            setSolution(
                ford_fulkerson(
                    currentPage.graph,
                    graphNames[0],
                    graphNames[graphNames.length - 1]
                )
            );
        }
    };

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between">
                <span>Algorithm</span>
            </SidebarGroupLabel>

            <SidebarGroupContent>
                <Select onValueChange={handleValueChange}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value={Algorithm.PRIM}>Prim</SelectItem>
                        <SelectItem value={Algorithm.KRUSKAL}>
                            Kruskal
                        </SelectItem>
                        <SelectItem value={Algorithm.FULKERSON}>
                            Ford Fulkerson
                        </SelectItem>
                    </SelectContent>
                </Select>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
