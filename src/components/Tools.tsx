import { ArrowBigRightIcon, Circle, Mouse } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { CanvaTool, useTool } from "@/hooks/use-tool";

export default function Tools() {
    const { setTool } = useTool();

    const handleValueChange = (value: CanvaTool) => {
        setTool(value);
    };

    return (
        <section className="absolute left-0 right-0 bottom-0 w-fit mx-auto mb-4 flex items-center gap-4">
            <ToggleGroup
                type="single"
                variant="outline"
                defaultValue="select"
                onValueChange={handleValueChange}
            >
                <ToggleGroupItem value="select">
                    <Mouse />
                </ToggleGroupItem>
                <ToggleGroupItem value="addNode">
                    <Circle />
                </ToggleGroupItem>
                <ToggleGroupItem value="connect">
                    <ArrowBigRightIcon />
                </ToggleGroupItem>
            </ToggleGroup>
        </section>
    );
}
