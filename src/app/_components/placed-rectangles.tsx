"use client";

import { useEffect, useState } from "react";
import { DimensionsFormValues } from "./shape-form-dialog/with-dimensions-form";
import { ShapeFormDialog } from "./shape-form-dialog/shape-form-dialog";
import { Container } from "./rectangles-in-container/container";
import { Rectangle } from "./rectangles-in-container/rectangle";
import { Point } from "@/domain/types";
import { listRectanglePointsFetcher } from "../_fetchers/list-rectangle-points.fetcher";

export const PlacedRectangles = () => {
  const [dimensions, setDimensions] = useState<DimensionsFormValues>();
  const [selectedShape, setSelectedShape] = useState<"rectangle" | "triangle">(
    "rectangle"
  );

  const [rectanglePoints, setRectanglePoints] = useState<
    {
      bottomLeft: Point;
      topRight: Point;
    }[]
  >([]);

  const onShapeSelectAndDimensionsChange = async () => {
    if (!selectedShape || !dimensions) return;
    console.log("selectedShape", selectedShape);
    console.log("dimensions", dimensions);

    const points = await listRectanglePointsFetcher(selectedShape, dimensions);

    setRectanglePoints(points);
  };

  useEffect(() => {
    onShapeSelectAndDimensionsChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col gap-8 w-full items-center">
        <ShapeFormDialog
          selectedShape={selectedShape}
          setDimensions={setDimensions}
          setSelectedShape={setSelectedShape}
        />
        {dimensions && (
          <Container
            shape={selectedShape}
            dimensions={{
              width: Number(dimensions.containerWidth),
              height: Number(dimensions.containerHeight),
            }}
          >
            <div className="relative w-full h-full">
              {rectanglePoints.map((point, index) => (
                <Rectangle
                  key={index}
                  bottomLeft={point.bottomLeft}
                  topRight={point.topRight}
                />
              ))}
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};
