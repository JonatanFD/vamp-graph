import { MSTSolution, useAnimation } from "@/hooks/use-animation";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

export default function MSTTable() {
    const { solution } = useAnimation();
    const sol = { ...solution } as MSTSolution;
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="w-full mt-">
                    Show Table
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Solution</DialogTitle>
                    <DialogDescription>
                        You can see all steps here
                    </DialogDescription>
                </DialogHeader>
                <Table>
                    <TableCaption>Solution Tree</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Index</TableHead>
                            <TableHead className="text-center">Edge</TableHead>
                            <TableHead className="text-center">
                                Weight
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sol.tree.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="text-center">
                                        {index}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item[0]} - {item[1]}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item[2]}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        <TableRow>
                            <TableCell className="text-center"></TableCell>
                            <TableCell className="text-center"></TableCell>
                            <TableCell className="text-center">
                                {solution?.cost}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
}
