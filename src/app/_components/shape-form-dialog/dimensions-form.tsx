"use client";

import { useFormContext } from "react-hook-form";
import { DimensionsFormValues } from "./with-dimensions-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@ui";

export interface DimensionsFormProps {
  setDimensions: (dimensions: DimensionsFormValues) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
}

export const DimensionsForm = ({
  setDimensions,
  setIsDialogOpen,
}: DimensionsFormProps) => {
  const form = useFormContext<DimensionsFormValues>();

  const onSubmit = (values: DimensionsFormValues) => {
    setDimensions(values);
    setIsDialogOpen(false);
  };

  const renderFormErrors = () => {
    return (
      <>
        <span>{form.formState.errors.containerWidth?.message}</span>
        <span>{form.formState.errors.containerHeight?.message}</span>
        <span>{form.formState.errors.rectangleWidth?.message}</span>
        <span>{form.formState.errors.rectangleHeight?.message}</span>
      </>
    );
  };

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col gap-8"
      >
        <div>
          <div className="flex flex-row justify-center">
            <h4 className="text-lg font-bold text-center">
              Container Dimensions <br /> (Width x Height)
            </h4>
          </div>
          <div className="flex flex-row justify-between mt-2 gap-4">
            <FormField
              control={form.control}
              name="containerWidth"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Width" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="containerHeight"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Height" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-center">
            <h4 className="text-lg font-bold text-center">
              Rectangle Dimensions <br /> (Width x Height)
            </h4>
          </div>
          <div className="flex flex-row justify-between mt-2 gap-4">
            <FormField
              control={form.control}
              name="rectangleWidth"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Width" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rectangleHeight"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Height" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <Button type="submit" className="w-full">
            Generate rectangles
          </Button>
        </div>
      </form>
    </Form>
  );
};
