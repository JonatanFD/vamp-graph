import { CanvaEdge, CanvaNode, getPoints } from "@/lib/canvas";
import { Arrow, Line } from "react-konva";

export default function Edge({
    edge,
    nodes,
    index,
    isDirected,
}: {
    edge: CanvaEdge;
    nodes: CanvaNode[];
    index: number;
    isDirected: boolean;
}) {
    const NODE_RADIUS = 14;

    const points = getPoints(
        nodes[edge.source],
        nodes[edge.target],
        NODE_RADIUS
    );

    return (
        <>
            {isDirected ? (
                <Arrow
                    key={index}
                    stroke={"white"}
                    points={points}
                    strokeWidth={2}
                    fill={"white"}
                    lineCap="round"
                />
            ) : (
                <Line
                    key={index}
                    points={points}
                    stroke={"white"}
                    strokeWidth={2}
                />
            )}
        </>
    );
}
