import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
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
});

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
