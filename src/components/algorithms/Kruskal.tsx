import { StepBack, StepForward } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { SidebarGroupContent } from "../ui/sidebar";
import { MSTSolution, useAnimation } from "@/hooks/use-animation";
import MSTTable from "./MSTTable";

export default function Kruskal() {
    const { solution, setStep, step } = useAnimation();
    const handlePrevStep = () => {
        if (step === -1) return;
        setStep(step - 1);
    };

    const handleNextStep = () => {
        const sol = { ...solution } as MSTSolution;
        if (step === sol.tree.length - 1) return;
        setStep(step + 1);
    };
    return (
        <SidebarGroupContent>
            <div className="px-2 mb-3">
                <Label className="text-xs">Step: </Label>
            </div>

            <div className="flex gap-1 flex-1 px-2 items-center">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handlePrevStep}
                >
                    <StepBack />
                </Button>

                <span className="px-4">{step + 1}</span>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleNextStep}
                >
                    <StepForward />
                </Button>
            </div>

            <MSTTable />
        </SidebarGroupContent>
    );
}
