import { Dimension, Point, TriangleVertices } from "@/domain/types";
import {
  getPointToAdd,
  isPointInsideTriangleVertices,
} from "./geometry.repository";

interface RectanglePoints {
  bottomLeft: Point;
  bottomRight: Point;
  topLeft: Point;
  topRight: Point;
}

const getPlacedRectanglesPoints = (params: {
  points: RectanglePoints[];
  rectangleDimensions: Dimension;
  horizontalRectangles: number;
  verticalRectangles: number;
  abscissaOriginShift: number;
  ordinateOriginShift: number;
}) => {
  const {
    points,
    rectangleDimensions,
    horizontalRectangles,
    verticalRectangles,
    abscissaOriginShift,
    ordinateOriginShift,
  } = params;

  Array.from({ length: horizontalRectangles }).forEach((_, i) => {
    Array.from({ length: verticalRectangles }).forEach((_, j) => {
      points.push(
        getPointToAdd({
          i,
          j,
          rectangleDimensions,
          abscissaOriginShift,
          ordinateOriginShift,
        })
      );
    });
  });

  return points;
};

export const getRectanglesPointToPlaceInTriangle = (
  vertices: TriangleVertices,
  points: RectanglePoints[]
) => {
  const rectanglesIndexesToRemove: number[] = [];

  points.forEach((rectangle, index) => {
    Object.values(rectangle).forEach((point) => {
      const isPointOutsideTriangle = !isPointInsideTriangleVertices(
        point,
        vertices
      );
      if (isPointOutsideTriangle) {
        rectanglesIndexesToRemove.push(index);
        return;
      }
    });
  });

  points = points.filter(
    (_, index) => !rectanglesIndexesToRemove.includes(index)
  );
  return points;
};

const getAmountOfRectanglesPlacedWithoutRotation = (params: {
  newContainerDimension: Dimension;
  rectangleDimension: Dimension;
}) => {
  const { newContainerDimension, rectangleDimension } = params;

  const { width: containerNewWidth, height: containerNewHeight } =
    newContainerDimension;

  const { width: rectangleWidth, height: rectangleHeight } = rectangleDimension;

  const rectanglesPlacedHorizontally = Math.floor(
    containerNewWidth / rectangleWidth
  );
  const rectanglesPlacedVertically = Math.floor(
    containerNewHeight / rectangleHeight
  );

  return { rectanglesPlacedHorizontally, rectanglesPlacedVertically };
};

const getNewShapeContainerDimensions = (
  containerNewDimensions: Dimension,
  remainingContainerDimensions: Dimension
) => {
  const { width: containerNewWidth, height: containerNewHeight } =
    containerNewDimensions;
  const { width: remainingContainerWidth, height: remainingContainerHeight } =
    remainingContainerDimensions;

  const isRemainingContainerHeight =
    remainingContainerHeight > 0 && remainingContainerWidth === 0;
  const isRemainingContainerWidth =
    remainingContainerWidth > 0 && remainingContainerHeight === 0;

  const isAShapeRemaining =
    isRemainingContainerHeight || isRemainingContainerWidth;

  if (isRemainingContainerHeight) {
    return {
      isAShapeRemaining,
      containerNewDimensions: {
        width: containerNewWidth,
        height: remainingContainerHeight,
      },
    };
  } else if (isRemainingContainerWidth) {
    return {
      isAShapeRemaining,
      containerNewDimensions: {
        width: remainingContainerWidth,
        height: containerNewHeight,
      },
    };
  }

  return {
    isAShapeRemaining,
    containerNewDimensions,
  };
};

export const getRectanglesPointToPlace = (params: {
  points: RectanglePoints[];
  remainingContainerDimensions: Dimension;
  containerOriginalDimensions: Dimension;
  containerNewDimensions: Dimension;
  rectangleDimensions: Dimension;
}): {
  points: RectanglePoints[];
  remainingContainerWidth: number;
  remainingContainerHeight: number;
} => {
  let {
    points,
    remainingContainerDimensions,
    containerOriginalDimensions,
    containerNewDimensions,
    rectangleDimensions,
  } = params;

  let { width: remainingContainerWidth, height: remainingContainerHeight } =
    remainingContainerDimensions;

  const { width: containerOriginalWidth, height: containerOriginalHeight } =
    containerOriginalDimensions;

  const { width: containerNewWidth, height: containerNewHeight } =
    containerNewDimensions;

  const { width: rectangleWidth, height: rectangleHeight } =
    rectangleDimensions;

  const { rectanglesPlacedHorizontally, rectanglesPlacedVertically } =
    getAmountOfRectanglesPlacedWithoutRotation({
      newContainerDimension: containerNewDimensions,
      rectangleDimension: rectangleDimensions,
    });

  const abscissaOriginShift = containerOriginalWidth - containerNewWidth;
  const ordinateOriginShift = containerOriginalHeight - containerNewHeight;

  points = getPlacedRectanglesPoints({
    points,
    rectangleDimensions,
    horizontalRectangles: rectanglesPlacedHorizontally,
    verticalRectangles: rectanglesPlacedVertically,
    abscissaOriginShift,
    ordinateOriginShift,
  });

  remainingContainerWidth +=
    containerNewWidth - rectanglesPlacedHorizontally * rectangleWidth;
  remainingContainerHeight +=
    containerNewHeight - rectanglesPlacedVertically * rectangleHeight;

  const result = getNewShapeContainerDimensions(containerNewDimensions, {
    width: remainingContainerWidth,
    height: remainingContainerHeight,
  });

  const { isAShapeRemaining } = result;
  containerNewDimensions = result.containerNewDimensions;

  const rotatedRectangleDimensions = {
    width: rectangleHeight,
    height: rectangleWidth,
  };

  if (isAShapeRemaining) {
    return getRectanglesPointToPlace({
      points,
      remainingContainerDimensions: {
        width: remainingContainerWidth,
        height: rectangleHeight,
      },
      containerOriginalDimensions,
      containerNewDimensions,
      rectangleDimensions: rotatedRectangleDimensions,
    });
  }

  return { points, remainingContainerWidth, remainingContainerHeight };
};
