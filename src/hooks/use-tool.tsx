import { create } from "zustand";

export type CanvaTool = "addNode" | "connect" | "";
export interface ConnectTool {
    source: string;
    target: string;
}

export interface ToolState {
    tool: CanvaTool;
    setTool: (tool: CanvaTool) => void;
    connect: ConnectTool;
    setConnectNode: (source: string, field: "source" | "target") => void;
    clearConnect: () => void;
}

export const useTool = create<ToolState>((set) => ({
    tool: "",
    setTool: (tool: CanvaTool) => set({ tool }),
    connect: {
        source: "",
        target: "",
    },
    setConnectNode: (source: string, field: "source" | "target") => {
        set((state) => {
            const newConnect = {
                ...state.connect,
                [field]: source,
            };
            return {
                connect: newConnect,
            };
        });
    },
    clearConnect: () => {
        set(() => ({
            connect: {
                source: "",
                target: "",
            },
        }));
    },
}));
