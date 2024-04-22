export interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Rectangle = ({ x, y, width, height }: RectangleProps) => {
  return (
    <div
      className="absolute border border-blue-500 bg-blue-200"
      style={{
        left: x,
        top: y,
        width,
        height,
      }}
    />
  );
};
