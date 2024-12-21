import { useVampGraph } from "@/hooks/use-vamp-graph";
import { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import NoCanva from "./NoCanva";
import CanvaContent from "./CanvaContent";
import { KonvaEventObject } from "konva/lib/Node";
import Tools from "./Tools";
import { useTool } from "@/hooks/use-tool";
import { createNewNodeByPosition, NodeCoord } from "@/lib/creation";
import { useCanvas } from "@/hooks/use-canva";
import { getNodeByPosition } from "@/lib/canvas";
import { useModal } from "./ui/modal";
import NewConnection from "./forms/ConnectionWeight";

export default function Canva() {
    const { currentPage, updatePage } = useVampGraph();
    const { updateCoords } = useCanvas();
    const [size, setSize] = useState({ width: 0, height: 0 });
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const { tool, connect, setConnectNode, clearConnect } = useTool();

    const { setContent } = useModal();

    // zoom
    const handleZoom = useCallback((e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const scaleBy = 1.2;
        const minScale = 0.3; // Límite mínimo de zoom out
        const maxScale = 3; // Límite máximo de zoom in

        const stage = e.target.getStage();
        if (!stage) return;

        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        let direction = e.evt.deltaY > 0 ? 1 : -1;
        if (e.evt.ctrlKey) {
            direction = -direction;
        }

        let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        // Aplicar límites al nuevo scale
        newScale = Math.min(Math.max(newScale, minScale), maxScale);

        // Solo actualizar si el nuevo scale está dentro de los límites
        if (newScale !== oldScale) {
            stage.scale({ x: newScale, y: newScale });
            stage.position({
                x: pointer.x - mousePointTo.x * newScale,
                y: pointer.y - mousePointTo.y * newScale,
            });
        }
    }, []);

    // resize
    useEffect(() => {
        const canvasContainer = canvasContainerRef.current;
        if (!canvasContainer) return;
        setSize({
            width: canvasContainer.clientWidth,
            height: canvasContainer.clientHeight,
        });

        const handleResize = () => {
            setSize({
                width: canvasContainerRef.current?.clientWidth || 0,
                height: canvasContainerRef.current?.clientHeight || 0,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // handle click on canvas
    const handleClick = (e: KonvaEventObject<MouseEvent>) => {
        const page = useVampGraph.getState().getCurrentPage();
        const graphs = useCanvas.getState().graphs;
        if (!page) return;

        const pos = e.target.getStage()!.getRelativePointerPosition();
        const currentCoords = graphs.find((graph) => graph.id === page?.id);

        if (!currentCoords) return;

        if (tool === "addNode") {
            if (!currentCoords) return;

            const updatedCanva = createNewNodeByPosition(
                pos as NodeCoord,
                page.graph,
                currentCoords.graph
            );

            const updatedPage = {
                ...page,
                graph: updatedCanva.graph,
            };
            updatePage(updatedPage);

            const updatedCoords = {
                ...currentCoords,
                graph: updatedCanva.coords,
            };

            updateCoords(updatedCoords);
        } else if (tool === "connect") {
            //sacsa
            const node = getNodeByPosition(
                currentCoords,
                pos as NodeCoord
            ).toString();
            if (node === undefined) return;
            if (node === "-1") return;


            if (connect.source === "") {
                setConnectNode(node, "source");
            } else if (connect.target === "") {
                if (node === connect.source) {
                    clearConnect();
                    // toast error
                    return;
                }
                setConnectNode(node, "target");
                setContent(<NewConnection />);
            }
        }
    };

    return (
        <section ref={canvasContainerRef} className="w-full relative">
            {!currentPage ? (
                <NoCanva />
            ) : (
                <>
                    <Stage
                        width={size.width}
                        height={size.height}
                        draggable
                        onWheel={handleZoom}
                        onClick={handleClick}
                    >
                        <Layer>
                            <CanvaContent />
                        </Layer>
                    </Stage>
                    <Tools />
                </>
            )}
        </section>
    );
}
