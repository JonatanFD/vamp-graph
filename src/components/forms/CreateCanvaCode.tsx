import ReactCodeMirror from "@uiw/react-codemirror";
import { Button } from "../ui/button";
import {
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { json } from "@codemirror/lang-json";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { z } from "zod";
import { createCoordsFromGraph } from "@/lib/creation";
import { useCanvas } from "@/hooks/use-canva";
import { useVampGraph } from "@/hooks/use-vamp-graph";
import { Input } from "../ui/input";
import { useRef } from "react";

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
    const closeRef = useRef<HTMLButtonElement>(null);

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

        closeRef.current?.click();
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
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <ReactCodeMirror
                                    theme="dark"
                                    height="220px"
                                    width="462px"
                                    extensions={[dracula, json()]}
                                    basicSetup={{
                                        tabSize: 4,
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit">
                    Create
                </Button>
            </form>
            <DialogClose ref={closeRef} className="hidden"></DialogClose>
        </Form>
    );
}
