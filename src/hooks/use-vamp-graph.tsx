import { create } from "zustand";

export interface Graph {
    [name: string]: {
        [name: string]: number;
    };
}

export interface Page {
    id: string;
    name: string;
    graph: Graph;
}

export interface VampGraphState {
    pages: Page[];
    addPage: (page: Page) => void;
    removePage: (id: string) => void;
    currentPage: string | null;
    setCurrentPage: (id: string) => void;
    updatePage: (page: Page) => void;
    getCurrentPage: () => Page | undefined;
}

export const useVampGraph = create<VampGraphState>((set, get) => ({
    pages: [],
    addPage: (page: Page) => {
        set((state) => ({
            pages: [...state.pages, page],
            currentPage: page.id,
        }));
    },
    removePage: (id: string) => {
        set((state) => ({
            pages: state.pages.filter((p) => p.id !== id),
        }));
    },
    currentPage: null,
    setCurrentPage: (id: string) => {
        set(() => ({
            currentPage: id,
        }));
    },
    updatePage: (page: Page) => {
        set((state) => ({
            pages: state.pages.map((p) => {
                if (p.id === page.id) {
                    return { ...page };
                }
                return p;
            }),
            currentPage: page.id,
        }));
    },
    getCurrentPage: () => {
        return get().pages.find((p) => p.id === get().currentPage);
    },
}));
