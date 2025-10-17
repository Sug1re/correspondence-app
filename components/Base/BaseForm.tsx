"use client";

import React, { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema, TypeOf } from "zod";

interface BaseFormProps<T extends ZodSchema> {
  schema: T;
  defaultValues?: DefaultValues<TypeOf<T>>;
  onSubmit: SubmitHandler<TypeOf<T>>;
  children: ReactNode;
}

export const BaseForm = <T extends ZodSchema>({
  schema,
  defaultValues,
  onSubmit,
  children,
}: BaseFormProps<T>) => {
  const methods = useForm<TypeOf<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
