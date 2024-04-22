import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    containerWidth: z
      .string({
        required_error: "Container width is required",
      })
      .min(0),
    containerHeight: z
      .string({
        required_error: "Container height is required",
      })
      .min(0),
    rectangleWidth: z
      .string({
        required_error: "Rectangle width is required",
      })
      .min(0),
    rectangleHeight: z
      .string({
        required_error: "Rectangle height is required",
      })
      .min(0),
  })
  .refine(
    (data) => {
      const containerWidth = parseFloat(data.containerWidth);
      const rectangleWidth = parseFloat(data.rectangleWidth);

      return containerWidth >= rectangleWidth;
    },
    {
      message: "Rectangle must fit inside the container",
      path: ["rectangleWidth"],
    }
  )
  .refine(
    (data) => {
      const containerHeight = parseFloat(data.containerHeight);
      const rectangleHeight = parseFloat(data.rectangleHeight);

      return containerHeight >= rectangleHeight;
    },
    {
      message: "Rectangle must fit inside the container",
      path: ["rectangleHeight"],
    }
  );

export type DimensionsFormValues = z.infer<typeof formSchema>;

export const WithDimensionsForm = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const form = useForm<DimensionsFormValues>({
    resolver: zodResolver(formSchema),
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};
