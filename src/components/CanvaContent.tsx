import { useCanvas } from "@/hooks/use-canva";
import { useVampGraph } from "@/hooks/use-vamp-graph";
import {
    CanvaEdge,
    CanvaNode,
    createNodeAndEdges,
    filterEdgesToCanvas,
} from "@/lib/canvas";
import { GraphCoord } from "@/lib/creation";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useState } from "react";
import Node from "./canva-elements/Node";
import Edge from "./canva-elements/Edge";
import { Algorithm, MSTSolution, useAnimation } from "@/hooks/use-animation";

export default function CanvaContent() {
    const { currentPage, pages } = useVampGraph();
    const { graphs, updateCoords } = useCanvas();
    const { step, row, solution, algorithm } = useAnimation();

    const [nodes, setNodes] = useState<CanvaNode[]>([]);
    const [edges, setEdges] = useState<CanvaEdge[]>([]);

    const handleNodeDrag = (
        e: KonvaEventObject<DragEvent>,
        node: CanvaNode
    ) => {
        const coords = e.target.attrs;
        if (!coords) return;

        setNodes((prevNodes) => {
            const newNodes = [...prevNodes];
            const index = newNodes.findIndex((p) => p.label === node.label);
            newNodes[index].x = coords.x;
            newNodes[index].y = coords.y;
            return newNodes;
        });
    };

    const handleNodeDragEnd = (
        e: KonvaEventObject<DragEvent>,
        node: CanvaNode
    ) => {
        const coords = e.target.attrs;
        if (!coords) return;

        const graph = graphs.find((p) => p.id === currentPage)?.graph;
        if (!graph) return;

        const coordsCopy = { ...graph };
        coordsCopy[node.label] = {
            x: coords.x,
            y: coords.y,
        };

        const currentCoords = graphs.find((p) => p.id === currentPage);
        if (!currentCoords) return;

        updateCoords({
            id: currentPage!,
            graph: coordsCopy,
        });
    };

    const currentPageGraph =
        useVampGraph.getState().getCurrentPage()!.graph || {};

    useEffect(() => {
        if (currentPage) {
            const coords = graphs.find((p) => p.id === currentPage)
                ?.graph as GraphCoord;

            const { nodes, edges } = createNodeAndEdges(
                currentPageGraph,
                coords
            );

            console.log("NODES", nodes);
            console.log("EDGES", edges);

            setNodes(nodes);

            const filteredEdges = filterEdgesToCanvas(edges);
            setEdges(filteredEdges);
        }
    }, [currentPage, graphs, pages]);

    useEffect(() => {
        if (!solution) return;

        if (algorithm === Algorithm.PRIM) {

            const getStep = (step: number) => {
                const sol = solution as MSTSolution;
                const tree = sol.tree;

                const matches = new Set<string>();
                for (let i = 0; i < step + 1; i++) {
                    matches.add(tree[i][0] + tree[i][1]);
                    matches.add(tree[i][1] + tree[i][0]);
                }

                return matches;
            };
            const combinations = getStep(step);

            const showEdges = (prev: CanvaEdge[]) => {
                const newEdges = prev.map((edge) => {
                    const edgeKey = edge.source.toString() + edge.target.toString();
                    if (!combinations.has(edgeKey)) {
                        edge.selected = false;
                        return edge;
                    }

                    edge.selected = true;
                    return edge;
                });
                return newEdges;
            };

            setEdges(showEdges(edges));
        }




    }, [step, row]);

    return (
        <>
            {nodes.length > 0 && Object.keys(currentPageGraph).length > 0 && (
                <>
                    {edges.map((edge, index) => (
                        <Edge
                            key={index}
                            edge={edge}
                            nodes={nodes}
                            isDirected={
                                currentPageGraph[edge.target][edge.source] ===
                                undefined
                            }
                        />
                    ))}
                    {nodes.map((node, index) => (
                        <Node
                            key={index}
                            node={node}
                            handleNodeDrag={handleNodeDrag}
                            handleNodeDragEnd={handleNodeDragEnd}
                        />
                    ))}
                </>
            )}
        </>
    );
}
