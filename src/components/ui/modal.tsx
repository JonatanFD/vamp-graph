import { create } from "zustand";
import { Dialog, DialogContent } from "./dialog";
import { useEffect } from "react";

export interface ModalStore {
    content: React.ReactNode | null;
    setContent: (content: React.ReactNode) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const useModal = create<ModalStore>((set) => ({
    content: null,
    setContent: (content: React.ReactNode) =>
        set({
            content: content,
        }),
    open: false,
    setOpen: (open: boolean) => set({ open }),
}));

export default function Modal() {
    const { content, setOpen, open } = useModal();

    const handleChange = (value: boolean) => {
        setOpen(value);
    };

    useEffect(() => {
        if (!content) return;
        setOpen(true);
    }, [content]);

    return (
        <Dialog modal={true} open={open} onOpenChange={handleChange}>
            <DialogContent>{content}</DialogContent>
        </Dialog>
    );
}
