"use server";

import { fromDimensionsGetVertices } from "@/repositories/geometry.repository";
import {
  getRectanglesPointToPlace,
  getRectanglesPointToPlaceInTriangle,
} from "@/repositories/placement.repository";
import { Dimension } from "@types";
import { getSolarPanelsPlacedInRectanglePoints } from "./get-solar-panels-placed-in-rectangle-points.use-case";

export const getSolarPanelsPlacedInTrianglePoints = async (params: {
  rectangleContainerDimensions: Dimension;
  rectangleDimensions: Dimension;
}) => {
  const { rectangleContainerDimensions } = params;

  let points = await getSolarPanelsPlacedInRectanglePoints(params);

  const vertices = fromDimensionsGetVertices(rectangleContainerDimensions);

  points = getRectanglesPointToPlaceInTriangle(vertices, points);

  return points;
};
