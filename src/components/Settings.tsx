import { SettingsIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppSettingsData, DEFAULT_APP_SETTINGS, useAppSettings } from "@/hooks/use-settings";
import { useEffect } from "react";

const formSchema = z.object({
    colors: z.object({
        node: z.string(), // native
        edge: z.string(), // native
        weightText: z.string(),
        weightBackground: z.string(),
        selectedNode: z.string(),
        text: z.string(),
    }),
    canva: z.object({
        nodeRadius: z.coerce.number(),
        nodeFontSize: z.coerce.number(),
        edgeFontSize: z.coerce.number(),
    }),
});

export default function Settings() {
    const { setAppSettings, ...settings } = useAppSettings();

    const formState = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: settings,
    });

    const handleReset = () => {
        localStorage.setItem(
            "app-settings",
            JSON.stringify(DEFAULT_APP_SETTINGS)
        );
        setAppSettings(DEFAULT_APP_SETTINGS as AppSettingsData);
    };

    const onSubmit = formState.handleSubmit((data) => {
        localStorage.setItem("app-settings", JSON.stringify(data));
        setAppSettings(data as AppSettingsData);
    });

    useEffect(() => {
        const savedSettings = localStorage.getItem("app-settings");
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            setAppSettings(settings as AppSettingsData);
        }
    }, []);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <SettingsIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Save your settings here, its locally stored
                    </DialogDescription>
                </DialogHeader>

                <Form {...formState}>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <DialogDescription>Node</DialogDescription>
                        <FormField
                            name="colors.node"
                            control={formState.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <FormLabel>Node Color</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="color"
                                            placeholder="Enter your node color"
                                            className="max-w-20"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            name="colors.selectedNode"
                            control={formState.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <FormLabel>Selected Node Color</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="color"
                                            className="max-w-20"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            name="colors.text"
                            control={formState.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <FormLabel>Node Text Color</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="color"
                                            className="max-w-20"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            name="canva.nodeRadius"
                            control={formState.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <FormLabel>Node Radius</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-fit"
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            name="canva.nodeFontSize"
                            control={formState.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <FormLabel>Node Font Size</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-fit"
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <DialogDescription>Edge</DialogDescription>

                        <FormField
                            name="colors.edge"
                            control={formState.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <FormLabel>Edge Color</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="color"
                                            className="max-w-20"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            name="colors.weightText"
                            control={formState.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <FormLabel>Weight Text Color</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="color"
                                            className="max-w-20"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            name="colors.weightBackground"
                            control={formState.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <FormLabel>
                                        Weight Background Color
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="color"
                                            className="max-w-20"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>

                        <FormField
                            name="canva.edgeFontSize"
                            control={formState.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <FormLabel>Edge Font Size</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-fit"
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>

                    <DialogFooter>
                        <Button
                            className="w-full"
                            type="button"
                            onClick={handleReset}
                        >
                            Reset Values
                        </Button>
                        <Button className="w-full" onClick={onSubmit}>
                            Save
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
