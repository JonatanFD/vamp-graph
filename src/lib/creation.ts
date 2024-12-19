import { Graph } from "@/hooks/use-vamp-graph";
import Delaunator from "delaunator";
import { randomInt } from "./utils";

export interface NodeCoord {
    x: number;
    y: number;
}

export interface GraphCoord {
    [name: string]: NodeCoord;
}

function calculateEdges(nodes: GraphCoord) {
    const values = Object.values(nodes);
    const points: number[] = [];

    values.forEach((node) => {
        points.push(node.x, node.y);
    });

    return new Delaunator(points).triangles;
}

export function createCoords(nodes: number) {
    const graph: GraphCoord = {};
    for (let i = 0; i < nodes; i++) {
        graph[i] = {
            x: randomInt(0, window.innerWidth),
            y: randomInt(0, window.innerHeight),
        };
    }
    return graph;
}

export function createGraph(
    nodes: number,
    type: "directed" | "undirected",
    min: number,
    max: number
) {
    const coords = createCoords(nodes);

    const edgesRaw = calculateEdges(coords);

    const graph: Graph = {};
    for (let i = 0; i < nodes; i++) {
        graph[i] = {};
    }

    for (let i = 0; i < edgesRaw.length; i += 3) {
        const a = edgesRaw[i];
        const b = edgesRaw[i + 1];
        const c = edgesRaw[i + 2];

        const weight_1 = randomInt(min, max);
        const weight_2 = randomInt(min, max);
        const weight_3 = randomInt(min, max);

        // Crear las aristas A->B, B->C, C->A
        if (graph[b][a] === undefined) {
            graph[a][b] = weight_1;
        }
        if (graph[c][b] === undefined) {
            graph[b][c] = weight_2;
        }
        if (graph[a][c] === undefined) {
            graph[c][a] = weight_3;
        }

        // Si es no dirigido, duplicamos las aristas con el mismo peso
        if (type === "undirected") {
            graph[b][a] = weight_1; // B -> A con el mismo peso
            graph[c][b] = weight_2; // C -> B con el mismo peso
            graph[a][c] = weight_3; // A -> C con el mismo peso
        }
    }

    return { graph, coords };
}

export function createNewNodeByPosition(
    pos: NodeCoord,
    graph: Graph,
    coords: GraphCoord
) {
    const names = Object.keys(graph);
    console.log(names);

    const newGraph = { ...graph };
    newGraph[names.length] = {};

    const newCoords = { ...coords };
    newCoords[names.length] = {
        x: pos.x,
        y: pos.y,
    };

    return { graph: newGraph, coords: newCoords };
}
