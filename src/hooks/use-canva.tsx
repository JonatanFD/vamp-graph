import { GraphCoord } from "@/lib/creation";
import { create } from "zustand";

export interface GraphCanva {
    id: string;
    graph: GraphCoord;
}

interface CanvasState {
    graphs: GraphCanva[];
    addGraph: (newGraph: GraphCanva) => void;
    removeGraph: (id: string) => void;
    updateCoords: (coord: GraphCanva) => void;
}

export const useCanvas = create<CanvasState>((set) => ({
    graphs: [],
    addGraph: (newGraph: GraphCanva) => {
        set((state) => ({
            graphs: [...state.graphs, newGraph],
        }));
    },
    removeGraph: (id: string) => {
        set((state) => ({
            graphs: state.graphs.filter((p) => p.id !== id),
        }));
    },
    updateCoords(coord) {
        set((state) => ({
            graphs: state.graphs.map((p) => {
                if (p.id === coord.id) {
                    return coord;
                }
                return { ...p };
            }),
        }));
    },
}));
