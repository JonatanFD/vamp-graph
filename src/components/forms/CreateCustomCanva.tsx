import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useVampGraph } from "@/hooks/use-vamp-graph";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRef } from "react";
import { useCanvas } from "@/hooks/use-canva";

const formSchema = z.object({
    title: z.string().min(2).max(20),
});
export default function CreateCustomCanva({
    children,
}: {
    children: React.ReactNode;
}) {
    const formState = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });
    const { addPage } = useVampGraph();
    const { addGraph } = useCanvas();
    const ref = useRef<HTMLButtonElement>(null);

    const onSubmit = formState.handleSubmit((data) => {
        const id = crypto.randomUUID();
        addPage({
            id: id,
            name: data.title,
            graph: {},
        });
        addGraph({
            id: id,
            graph: {},
        });
        ref.current?.click();
    });
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <Form {...formState}>
                    <DialogHeader>
                        <DialogTitle>Create a new canvas</DialogTitle>
                        <DialogDescription>
                            Lets give a name to your canva
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-4">
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
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="w-full">Create</Button>
                    </form>
                    <DialogClose ref={ref} className="hidden" />
                </Form>
            </DialogContent>
        </Dialog>
    );
}
