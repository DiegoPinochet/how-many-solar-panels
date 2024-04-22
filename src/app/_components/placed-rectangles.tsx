"use client";

import { useState } from "react";
import {
  DimensionsFormValues,
  WithDimensionsForm,
} from "./shape-form-dialog/with-dimensions-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui";
import { DimensionsForm } from "./shape-form-dialog/dimensions-form";
import { ShapeFormDialog } from "./shape-form-dialog/shape-form-dialog";
import { Container } from "./rectangles-in-container/container";
import { Rectangle } from "./rectangles-in-container/rectangle";

export const PlacedRectangles = () => {
  const [dimensions, setDimensions] = useState<DimensionsFormValues>();
  const [selectedShape, setSelectedShape] = useState<"rectangle" | "triangle">(
    "rectangle"
  );

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
              <Rectangle
                x={0}
                y={0}
                width={Number(dimensions.rectangleWidth) * 20}
                height={Number(dimensions.rectangleHeight) * 20}
              />
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};
