import { Point } from "@types";

export interface RectangleProps {
  bottomLeft: Point;
  topRight: Point;
}

export const Rectangle = ({ bottomLeft, topRight }: RectangleProps) => {
  return (
    <div
      className="absolute border border-blue-500 bg-blue-200"
      style={{
        left: bottomLeft.x * 20,
        bottom: bottomLeft.y * 20,
        width: (topRight.x - bottomLeft.x) * 20,
        height: (topRight.y - bottomLeft.y) * 20,
      }}
    />
  );
};
