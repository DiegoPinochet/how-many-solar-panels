import { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
  shape: "rectangle" | "triangle";
  dimensions: {
    width: number;
    height: number;
  };
}

export const Container = ({ children, shape, dimensions }: ContainerProps) => {
  const { width, height } = dimensions;
  const renderRectangle = (): ReactNode => {
    return (
      <div
        style={{ width: `${width * 20}px`, height: `${height * 20}px` }}
        className={"box-content border-4 bg-muted border-black"}
      >
        {children}
      </div>
    );
  };

  const renderTriangle = (): ReactNode => {
    return (
      <div
        style={{
          width: `${width * 20}px`,
          height: `${height * 20}px`,
          clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
        }}
        className="bg-muted"
      >
        {children}
      </div>
    );
  };

  return <>{shape === "rectangle" ? renderRectangle() : renderTriangle()}</>;
};
