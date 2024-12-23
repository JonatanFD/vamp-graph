import { CanvaEdge, CanvaNode, getPoints } from "@/lib/canvas";
import Konva from "konva";
import { useEffect, useRef } from "react";
import { Arrow, Group, Line, Rect, Text } from "react-konva";

export default function Edge({
    edge,
    nodes,
    isDirected,
}: {
    edge: CanvaEdge;
    nodes: CanvaNode[];
    isDirected: boolean;
}) {
    const NODE_RADIUS = 14;
    const EDGE_COLOR = edge.selected ? "#0C59DF" : "white";

    const points = getPoints(
        nodes.find((node) => node.label === edge.source)!,
        nodes.find((node) => node.label === edge.target)!,
        NODE_RADIUS
    );

    return (
        <Group>
            {isDirected ? (
                <Arrow
                    stroke={EDGE_COLOR}
                    points={points}
                    strokeWidth={2}
                    fill={EDGE_COLOR}
                    lineCap="round"
                />
            ) : (
                <Line points={points} stroke={EDGE_COLOR} strokeWidth={2} />
            )}
            <EdgeWeight edge={edge} points={points} />
        </Group>
    );
}

function EdgeWeight({ edge, points }: { edge: CanvaEdge; points: number[] }) {
    const weightRef = useRef<Konva.Text>(null);
    const rectRef = useRef<Konva.Rect>(null);
    const weightWidth = Math.abs(points[2] - points[0]);
    const weightHeight = Math.abs(points[3] - points[1]);

    const NODE_RADIUS = 14;
    const FONT_SIZE = 14;

    useEffect(() => {
        if (!weightRef.current) return;
        if (!rectRef.current) return;

        const computedLabel = new Konva.Text({
            text: edge.weight.toString(),
            fontSize: FONT_SIZE,
            fill: "white",
        });
        const width = computedLabel.getWidth();
        const height = computedLabel.getHeight();

        const xcentered = (points[2] + points[0]) / 2;
        const ycentered = (points[3] + points[1]) / 2;

        rectRef.current.setAttrs({
            x: xcentered - width / 2 - 4,
            y: ycentered - height / 2 - 2,
            width: width + 8,
            height: height + 4,
        });
    }, [points]);

    return (
        <>
            <Rect fill={"black"} ref={rectRef} cornerRadius={1} />
            <Text
                x={
                    (points[0] < points[2] ? points[0] : points[2]) -
                    NODE_RADIUS
                }
                y={
                    (points[1] < points[3] ? points[1] : points[3]) -
                    NODE_RADIUS
                }
                text={edge.weight.toString()}
                fontSize={14}
                fill={"white"}
                align="center"
                verticalAlign="middle"
                width={weightWidth + NODE_RADIUS * 2}
                height={weightHeight + NODE_RADIUS * 2}
                ref={weightRef}
            />
        </>
    );
}
