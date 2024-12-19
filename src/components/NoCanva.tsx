import CustomCanva from "./forms/CreateCustomCanva";
import { Button } from "./ui/button";

export default function NoCanva() {
    return (
        <section className="h-full flex flex-col items-center justify-center">
            <section className="max-w-5xl">
                <div className="text-center space-y-3">
                    <h1 className="text-5xl font-bold">Vamp Graph</h1>
                    <p>Create your own Graph to model your needs</p>
                </div>

                <div className="mt-8 text-center flex flex-col gap-2 w-full">
                    <CustomCanva>
                        <Button variant="outline">Create custom Graph</Button>
                    </CustomCanva>
                    <Button variant="outline">Create a new Canva</Button>
                    <Button variant="outline">Load a Graph</Button>
                </div>
            </section>
        </section>
    );
}
