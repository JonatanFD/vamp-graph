import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef } from "react";
import { useTool } from "@/hooks/use-tool";
import { useVampGraph } from "@/hooks/use-vamp-graph";

const NewConnectionSchema = z.object({
    weight: z.coerce.number(),
});

export default function NewConnection() {
    const closeRef = useRef<HTMLButtonElement>(null);
    const { connect, clearConnect } = useTool();
    const { getCurrentPage, updatePage } = useVampGraph();

    const formState = useForm<z.infer<typeof NewConnectionSchema>>({
        resolver: zodResolver(NewConnectionSchema),
        defaultValues: {
            weight: 1,
        },
    });

    const onSubmit = formState.handleSubmit((data) => {
        console.log("DATA", data);
        console.log("CONNECT", connect);
        const page = getCurrentPage();
        if (!page) return;

        page.graph[connect.source][connect.target] = data.weight;

        if (page.graph[connect.target][connect.source]) {
            page.graph[connect.target][connect.source] = data.weight;
        }

        updatePage(page);
        clearConnect();
        closeRef.current?.click();
    });

    return (
        <>
            <DialogHeader>
                <DialogTitle>Create Connection</DialogTitle>
                <DialogDescription>
                    Set a weight for the connection
                </DialogDescription>
            </DialogHeader>
            <Form {...formState}>
                <form onSubmit={onSubmit} className="space-y-4">
                    <FormField
                        name="weight"
                        control={formState.control}
                        render={({ field }) => (
                            <FormItem>
                                <Input {...field} type="number" />
                            </FormItem>
                        )}
                    />

                    <Button className="w-full">Create</Button>
                </form>
                <DialogClose className="hidden" ref={closeRef} />
            </Form>
        </>
    );
}
