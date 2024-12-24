import { Code2 } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useVampGraph } from "@/hooks/use-vamp-graph";
import { useToast } from "@/hooks/use-toast";

export default function CanvaCode() {
    const currentPage = useVampGraph.getState().getCurrentPage();
    const content = JSON.stringify(currentPage!.graph, null, 4);

    const {toast} = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(content).then(() => {
            toast({
                title: "Copied to clipboard",
                description: "Code copied to clipboard",
            });
        }).catch(() => {
            toast({
                title: "Failed to copy",
                variant: "destructive",
                description: "Failed to copy code to clipboard",
            });
        });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon">
                    <Code2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Code</DialogTitle>
                    <DialogDescription>
                        Copy the code to your clipboard
                    </DialogDescription>
                </DialogHeader>

                <Textarea
                    className="font-[GeistMono]"

                    rows={20}
                    value={content}
                />

                <DialogFooter>
                    <Button className="w-full" onClick={handleCopy}>
                        Copy to clipboard
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
