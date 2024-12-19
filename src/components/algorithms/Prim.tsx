import { StepBack, StepForward } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVampGraph } from "@/hooks/use-vamp-graph";
import { MSTSolution, useAnimation } from "@/hooks/use-animation";
import { SidebarGroupContent } from "../ui/sidebar";
import { prim } from "@/lib/algorithms/prim";

const PrimFormSchema = z.object({
    origin: z.string(),
});

export default function Prim() {
    const { getCurrentPage } = useVampGraph();
    const { step, setStep, solution, setSolution } = useAnimation();
    const nodeNames = Object.keys(getCurrentPage()!.graph);

    const formState = useForm<z.infer<typeof PrimFormSchema>>({
        resolver: zodResolver(PrimFormSchema),
        defaultValues: {
            origin: nodeNames[0],
        },
    });

    const onSubmit = formState.handleSubmit((data) => {
        const currentPage = getCurrentPage();
        if (!currentPage) return;
        setSolution(prim(currentPage.graph, data.origin));
    });

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
            <Form {...formState}>
                <form className="px-2" onSubmit={onSubmit}>
                    <FormField
                        name="origin"
                        control={formState.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Origin</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {nodeNames.map((item, index) => {
                                                return (
                                                    <SelectItem
                                                        key={index}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        className="w-full mt-3"
                    >
                        Calculate
                    </Button>
                </form>
            </Form>
            <div className="px-2 mb-3">
                <Label className="text-xs">Step: </Label>
            </div>

            <div className="flex gap-1 flex-1 px-2 items-center">
                <Button
                    onClick={handlePrevStep}
                    variant="outline"
                    className="w-full"
                >
                    <StepBack />
                </Button>

                <span className="px-4">{step + 1}</span>

                <Button
                    onClick={handleNextStep}
                    variant="outline"
                    className="w-full"
                >
                    <StepForward />
                </Button>
            </div>
        </SidebarGroupContent>
    );
}
