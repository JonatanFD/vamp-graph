import { FordFulkersonSolution } from "@/lib/algorithms/ford-fulkerson";
import { create } from "zustand";

export enum Algorithm {
    PRIM = "prim",
    KRUSKAL = "kruskal",
    FULKERSON = "fullkerson",
}

export type MSTStep = [string, string, number];

export interface MSTSolution {
    tree: MSTStep[];
    cost: number;
}

interface AnimationState {
    algorithm: Algorithm | null;
    setAlgorithm: (algorithm: Algorithm) => void;

    solution: MSTSolution | FordFulkersonSolution | null;
    setSolution: (solution: MSTSolution | FordFulkersonSolution) => void;

    row: number;
    step: number;
    setRow: (row: number) => void;
    setStep: (step: number) => void;
}

export const useAnimation = create<AnimationState>((set) => ({
    algorithm: null,
    setAlgorithm: (algorithm: Algorithm) => set({ algorithm }),
    solution: null,
    setSolution: (solution: MSTSolution | FordFulkersonSolution) => set({ solution, step: -1, row: -1 }),
    row: -1,
    step: -1,
    setRow: (row: number) => set({ row }),
    setStep: (step: number) => set({ step }),
}));
