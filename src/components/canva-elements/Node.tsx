import { useTool } from "@/hooks/use-tool";
import { calcCanvaTextSize, CanvaNode } from "@/lib/canvas";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useState } from "react";
import { Circle, Group, Text } from "react-konva";

export default function Node({
    node,
    handleNodeDrag,
    handleNodeDragEnd,
}: {
    node: CanvaNode;
    handleNodeDrag: (e: KonvaEventObject<DragEvent>, node: CanvaNode) => void;
    handleNodeDragEnd: (
        e: KonvaEventObject<DragEvent>,
        node: CanvaNode
    ) => void;
}) {
    const { x, y, label } = node;
    const { connect } = useTool();
    const [isConnected, setIsConnected] = useState(false);

    const FONT_SIZE = 14;
    const FILL_COLOR = "black";
    const RADIUS = 14;

    const { height, width } = calcCanvaTextSize(label, FONT_SIZE);

    useEffect(() => {
        if (connect.source === label) {
            setIsConnected(true);
        } else if (connect.target === label) {
            setIsConnected(true);
        } else {
            setIsConnected(false);
        }
    }, [connect]);

    return (
        <Group
            x={x}
            y={y}
            draggable
            onDragMove={(e) => handleNodeDrag(e, node)}
            onDragEnd={(e) => handleNodeDragEnd(e, node)}
        >
            {isConnected && (
                <Circle
                    radius={RADIUS + 4}
                    fill={"black"}
                    stroke={"#0C59DF"}
                    strokeWidth={2}
                />
            )}
            <Circle radius={RADIUS} fill={"white"} />

            <Text
                x={-(width / 2)}
                y={-(height / 2)}
                width={width}
                height={height}
                text={label}
                fontSize={FONT_SIZE} // Tamaño de fuente proporcional al radio
                fill={FILL_COLOR} // Color del texto
                align="center"
                verticalAlign="middle"
                listening={false}
            />
        </Group>
    );
}
