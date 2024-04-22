import { Dimension, Point, TriangleVertices } from "@types";

const getTriangleArea = (point1: Point, point2: Point, point3: Point) => {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  const { x: x3, y: y3 } = point3;

  return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
};

export const isPointInsideTriangleVertices = (
  pointToCompare: Point,
  vertices: TriangleVertices
) => {
  const { vertex1, vertex2, vertex3 } = vertices;
  const triangleArea = getTriangleArea(vertex1, vertex2, vertex3);

  const trianglePV2V3Area = getTriangleArea(pointToCompare, vertex2, vertex3);

  const triangleV1PV3Area = getTriangleArea(vertex1, pointToCompare, vertex3);

  const triangleV1V2PArea = getTriangleArea(vertex1, vertex2, pointToCompare);

  return (
    triangleArea == trianglePV2V3Area + triangleV1PV3Area + triangleV1V2PArea
  );
};

export const getPointToAdd = (params: {
  i: number;
  j: number;
  rectangleDimensions: Dimension;
  abscissaOriginShift: number;
  ordinateOriginShift: number;
}) => {
  const {
    i,
    j,
    rectangleDimensions: { width: rectangleWidth, height: rectangleHeight },
    abscissaOriginShift,
    ordinateOriginShift,
  } = params;

  return {
    bottomLeft: {
      x: i * rectangleWidth + abscissaOriginShift,
      y: j * rectangleHeight + ordinateOriginShift,
    },
    bottomRight: {
      x: (i + 1) * rectangleWidth + abscissaOriginShift,
      y: j * rectangleHeight + ordinateOriginShift,
    },
    topLeft: {
      x: i * rectangleWidth + abscissaOriginShift,
      y: (j + 1) * rectangleHeight + ordinateOriginShift,
    },
    topRight: {
      x: (i + 1) * rectangleWidth + abscissaOriginShift,
      y: (j + 1) * rectangleHeight + ordinateOriginShift,
    },
  };
};

export const fromDimensionsGetVertices = (rectangleDimensions: Dimension) => {
  const { width, height } = rectangleDimensions;

  return {
    vertex1: { x: 0, y: 0 },
    vertex2: { x: width, y: 0 },
    vertex3: { x: Math.ceil(width / 2), y: height },
  };
};
