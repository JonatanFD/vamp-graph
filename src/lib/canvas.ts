import { Graph } from "@/hooks/use-vamp-graph";
import { GraphCoord, NodeCoord } from "./creation";
import Konva from "konva";
import { GraphCanva } from "@/hooks/use-canva";

export interface CanvaNode {
    x: number;
    y: number;
    label: string;
}

export interface CanvaEdge {
    source: number;
    target: number;
    weight: number;
}

export function createNodeAndEdges(graph: Graph, coords: GraphCoord) {
    const nodes: CanvaNode[] = [];

    for (const nodeName in coords) {
        const node: CanvaNode = {
            x: coords[nodeName].x,
            y: coords[nodeName].y,
            label: nodeName,
        };

        nodes.push(node);
    }

    const edges: CanvaEdge[] = [];

    for (const source of Object.keys(graph)) {
        for (const target of Object.keys(graph[source])) {
            const edge: CanvaEdge = {
                source: nodes.findIndex((node) => node.label === source),
                target: nodes.findIndex((node) => node.label === target),
                weight: 1,
            };
            edges.push(edge);
        }
    }

    return {
        nodes,
        edges,
    };
}

export function calcCanvaTextSize(text: string, fontSize: number) {
    const txt = new Konva.Text({
        text: text,
        fontSize: fontSize,
        fontFamily: "Arial",
        fill: "black",
    });
    const width = txt.getWidth();
    const height = txt.getHeight();
    return { width, height };
}

export function filterEdgesToCanvas(edges: CanvaEdge[]) {
    const filteredEdges: CanvaEdge[] = [];

    const combinations = new Set();

    for (const edge of edges) {
        const keyab = `${edge.source}-${edge.target}`;
        const keyba = `${edge.target}-${edge.source}`;

        if (!combinations.has(keyba)) {
            filteredEdges.push(edge);
            combinations.add(keyba);
        } else if (!combinations.has(keyab)) {
            filteredEdges.push(edge);
            combinations.add(keyab);
        }
    }

    return filteredEdges;
}

export function getNodeByPosition(
    coords: GraphCanva,
    pos: NodeCoord,
    radius: number = 10
) {
    const values = Object.values(coords.graph);

    const node = values.findIndex((node) => {
        const distance = Math.sqrt(
            Math.pow(node.x - pos.x, 2) + Math.pow(node.y - pos.y, 2)
        );
        return distance < radius;
    });

    return node;
}

export function getPoints(from: CanvaNode, to: CanvaNode, nodeRadius: number) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = Math.atan2(-dy, dx);
    const radio = nodeRadius + 8;
    return [
        from.x + -radio * Math.cos(angle + Math.PI),
        from.y + radio * Math.sin(angle + Math.PI),
        to.x + -radio * Math.cos(angle),
        to.y + radio * Math.sin(angle),
    ];
}
