import ReactCodeMirror from "@uiw/react-codemirror";
import { Button } from "../ui/button";
import {
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { json } from "@codemirror/lang-json";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { z } from "zod";
import { createCoordsFromGraph } from "@/lib/creation";
import { useCanvas } from "@/hooks/use-canva";
import { useVampGraph } from "@/hooks/use-vamp-graph";
import { Input } from "../ui/input";

const ImportFormSchema = z.object({
    file: z.string(),
    title: z.string().min(2).max(50),
});

export default function CreateCanvaCode() {
    const { addGraph } = useCanvas();
    const { addPage } = useVampGraph();
    const importFormState = useForm<z.infer<typeof ImportFormSchema>>({
        resolver: zodResolver(ImportFormSchema),
        defaultValues: {
            file: "",
            title: "",
        },
    });

    const onSubmitImport = importFormState.handleSubmit((data) => {
        console.log("DATA", data);
        const graph = JSON.parse(data.file);
        console.log("GRAPH", graph);

        const coords = createCoordsFromGraph(graph);

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
        <Form {...importFormState}>
            <form onSubmit={onSubmitImport} className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Import your canvas</DialogTitle>
                    <DialogDescription>
                        Paste here your canvas in JSON format
                    </DialogDescription>
                </DialogHeader>

                <FormField
                    name="title"
                    control={importFormState.control}
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
                    name="file"
                    control={importFormState.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>File</FormLabel>
                            <FormControl>
                                <ReactCodeMirror
                                    theme="dark"
                                    height="220px"
                                    extensions={[dracula, json()]}
                                    basicSetup={{
                                        tabSize: 4,
                                    }}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <DialogClose asChild>
                    <Button className="w-full" type="submit">
                        Create
                    </Button>
                </DialogClose>
            </form>
        </Form>
    );
}
