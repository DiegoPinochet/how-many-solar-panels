import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui";
import { DimensionsForm } from "./dimensions-form";
import { WithDimensionsForm } from "./with-dimensions-form";
import { useState } from "react";

export interface PlacedRectanglesProps {
  selectedShape: string;
  setSelectedShape: (shape: "rectangle" | "triangle") => void;
  setDimensions: (dimensions: any) => void;
}

export const ShapeFormDialog = ({
  selectedShape,
  setSelectedShape,
  setDimensions,
}: PlacedRectanglesProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>
          Set Roof and Panel values
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row justify-center">
            Select roof and panels dimensions
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-row justify-center mt-4">
              <div className="flex flex-col gap-8">
                <div className="flex flex-row justify-center">
                  <Select
                    defaultValue={selectedShape}
                    onValueChange={(value) =>
                      setSelectedShape(value as "rectangle" | "triangle")
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a shape" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="rectangle">Rectangle</SelectItem>
                        <SelectItem value="triangle">Triangle</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-row justify-center">
                  <WithDimensionsForm>
                    <DimensionsForm
                      setDimensions={setDimensions}
                      setIsDialogOpen={setIsDialogOpen}
                    />
                  </WithDimensionsForm>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
