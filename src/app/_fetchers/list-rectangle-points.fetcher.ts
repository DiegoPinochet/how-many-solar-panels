"use server";

import { getSolarPanelsPlacedInRectanglePoints } from "@/use-cases/solar-panel/get-solar-panels-placed-in-rectangle-points.use-case";
import { DimensionsFormValues } from "../_components/shape-form-dialog/with-dimensions-form";
import { getSolarPanelsPlacedInTrianglePoints } from "@/use-cases/solar-panel/get-triangular-solar-panels-placed-points.use-case";

export const listRectanglePointsFetcher = async (
  selectedShape: "triangle" | "rectangle",
  dimensions: DimensionsFormValues
) => {
  const { containerWidth, containerHeight, rectangleWidth, rectangleHeight } =
    dimensions;

  const params = {
    rectangleContainerDimensions: {
      width: Number(containerWidth),
      height: Number(containerHeight),
    },
    rectangleDimensions: {
      width: Number(rectangleWidth),
      height: Number(rectangleHeight),
    },
  };

  if (selectedShape === "rectangle") {
    const points = await getSolarPanelsPlacedInRectanglePoints(params);
    return points.map((point) => {
      return {
        bottomLeft: point.bottomLeft,
        topRight: point.topRight,
      };
    });
  }

  const points = await getSolarPanelsPlacedInTrianglePoints(params);
  return points.map((point) => {
    return {
      bottomLeft: point.bottomLeft,
      topRight: point.topRight,
    };
  });
};
