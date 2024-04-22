"use server";

import { getRectanglesPointToPlace } from "@/repositories/placement.repository";
import { Dimension } from "@types";

export const getSolarPanelsPlacedInRectanglePoints = async (params: {
  rectangleContainerDimensions: Dimension;
  rectangleDimensions: Dimension;
}) => {
  const { rectangleContainerDimensions, rectangleDimensions } = params;

  const { points } = getRectanglesPointToPlace({
    points: [],
    remainingContainerDimensions: { width: 0, height: 0 },
    containerOriginalDimensions: rectangleContainerDimensions,
    containerNewDimensions: { ...rectangleContainerDimensions },
    rectangleDimensions,
  });

  return points;
};
