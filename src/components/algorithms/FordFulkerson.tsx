import { z } from "zod";
import { SidebarGroup } from "../ui/sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVampGraph } from "@/hooks/use-vamp-graph";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { StepBack, StepForward } from "lucide-react";
import { useAnimation } from "@/hooks/use-animation";
import { FordFulkersonSolution } from "@/lib/algorithms/ford-fulkerson";
import { Label } from "../ui/label";

const FordFormSchema = z.object({
    source: z.string(),
    target: z.string(),
});

export default function FordFulkerson() {
    const { getCurrentPage } = useVampGraph();
    const { row, step, setRow, setStep, solution } = useAnimation();
    const currentGraph = getCurrentPage()!;
    const names = Object.keys(currentGraph.graph);

    const formState = useForm<z.infer<typeof FordFormSchema>>({
        resolver: zodResolver(FordFormSchema),
        defaultValues: {
            source: Object.keys(currentGraph.graph)[0],
            target: Object.keys(currentGraph.graph)[
                Object.keys(currentGraph.graph).length - 1
            ],
        },
    });

    const onSubmit = formState.handleSubmit((data) => {
        console.log(data);
    });

    const handleNextStep = () => {
        const sol = solution as FordFulkersonSolution;
        if (sol.steps[row] === undefined) return;
        if (step === sol.steps[row].length - 1) return;
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        if (step === -1) return;
        setStep(step - 1);
    };

    const handleNextRow = () => {
        const sol = solution as FordFulkersonSolution;
        if (row === sol.steps.length - 1) return;
        setRow(row + 1);
        setStep(-1);
    };

    const handlePrevRow = () => {
        if (row === -1) return;
        setRow(row - 1);
        setStep(-1);
    };

    return (
        <SidebarGroup>
            <Form {...formState}>
                <form onSubmit={onSubmit} className="space-y-3">
                    <FormField
                        name="source"
                        control={formState.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-xs">
                                    Source
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {names.map((item, index) => {
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

                    <FormField
                        name="target"
                        control={formState.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-xs">
                                    Target
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {names.map((item, index) => {
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

            <Label className="text-xs">Flow: </Label>
            <div className="flex gap-1 flex-1 items-center">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handlePrevRow}
                >
                    <StepBack />
                </Button>

                <span className="px-4">{row + 1}</span>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleNextRow}
                >
                    <StepForward />
                </Button>
            </div>
            
            <Label className="text-xs">Step: </Label>
            <div className="flex gap-1 flex-1 items-center">
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
        </SidebarGroup>
    );
}
