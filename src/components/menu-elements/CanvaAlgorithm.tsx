import { useVampGraph } from "@/hooks/use-vamp-graph";

export default function CanvaAlgorithm() {
    const { pages } = useVampGraph();
    if (pages.length === 0) return null;

    return <div>CanvaAlgorithm</div>;
}
