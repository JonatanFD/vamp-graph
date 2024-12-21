import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { z } from "zod";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createGraph } from "@/lib/creation";
import { useVampGraph } from "@/hooks/use-vamp-graph";
import { useCanvas } from "@/hooks/use-canva";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CreateCanvaCode from "./CreateCanvaCode";

const CanvaFormSchema = z.object({
    title: z.string().min(2).max(50),
    nodes: z.coerce.number().min(2).max(100),
    preset: z.enum(["directed", "undirected"]),
    minWeight: z.coerce.number(),
    maxWeight: z.coerce.number(),
});

export default function CreateCanva({
    children,
    defaultValue = "create",
}: {
    children: React.ReactNode;
    defaultValue?: string;
}) {
    const { addPage } = useVampGraph();
    const { addGraph } = useCanvas();

    const formState = useForm<z.infer<typeof CanvaFormSchema>>({
        resolver: zodResolver(CanvaFormSchema),
        defaultValues: {
            title: "",
            nodes: 10,
            preset: "directed",
            minWeight: 1,
            maxWeight: 10,
        },
    });

    const onSubmit = formState.handleSubmit((data) => {
        console.log("PRESET ", data.preset);

        const { graph, coords } = createGraph(
            data.nodes,
            data.preset,
            data.minWeight,
            data.maxWeight
        );

        console.log("GRAPH", graph);
        console.log(coords);

        const pageId = crypto.randomUUID();

        addPage({
            id: pageId,
            name: data.title,
            graph: graph,
        });
        addGraph({
            id: pageId,
            graph: coords,
        });
    });

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent hideCloseButton>
                <Tabs defaultValue={defaultValue} className="space-y-4">
                    <TabsList className="w-full">
                        <TabsTrigger value="create" className="w-full">
                            Create
                        </TabsTrigger>
                        <TabsTrigger value="import" className="w-full">
                            Import
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="create">
                        <Form {...formState}>
                            <form onSubmit={onSubmit} className="space-y-4">
                                <DialogHeader>
                                    <DialogTitle>
                                        Create a new canvas
                                    </DialogTitle>
                                    <DialogDescription>
                                        Customize your canvas as you want
                                    </DialogDescription>
                                </DialogHeader>

                                <FormField
                                    name="title"
                                    control={formState.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your title"
                                                    type="text"
                                                    autoFocus
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                ></FormField>

                                <FormField
                                    name="preset"
                                    control={formState.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Graph Type</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="directed">
                                                            Directed
                                                        </SelectItem>
                                                        <SelectItem value="undirected">
                                                            Undirected
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                ></FormField>

                                <section className="flex gap-4">
                                    <FormField
                                        name="nodes"
                                        control={formState.control}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Nodes</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={2}
                                                        max={50}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        name="minWeight"
                                        control={formState.control}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>
                                                    Min Edge Weight
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={-50}
                                                        max={50}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        name="maxWeight"
                                        control={formState.control}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>
                                                    Max Edge Weight
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={-50}
                                                        max={50}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </section>

                                <DialogClose asChild>
                                    <Button className="w-full" type="submit">
                                        Create
                                    </Button>
                                </DialogClose>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="import">
                        <CreateCanvaCode />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
