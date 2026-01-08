"use client";

import React, { ReactNode, useEffect, useMemo } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  DefaultValues,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema, TypeOf } from "zod";
import isEqual from "lodash/isEqual";

interface BaseFormProps<T extends ZodSchema> {
  schema: T;
  defaultValues?: DefaultValues<TypeOf<T>>;
  onSubmit: SubmitHandler<TypeOf<T>>;
  children: ReactNode;
  methodsRef?: React.MutableRefObject<UseFormReturn<TypeOf<T>> | null>;
  onDefault?: (isDefault: boolean) => void;
}

export const BaseForm = <T extends ZodSchema>({
  schema,
  defaultValues,
  onSubmit,
  children,
  methodsRef,
  onDefault,
}: BaseFormProps<T>) => {
  const methods = useForm<TypeOf<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { watch } = methods;
  const values = watch();

  const isDefault = useMemo(() => {
    if (!defaultValues) return true;
    return isEqual(values, defaultValues);
  }, [values, defaultValues]);

  useEffect(() => {
    console.log("[BaseForm]isDefault:", isDefault);
    onDefault?.(isDefault);
  }, [isDefault, onDefault]);

  if (methodsRef) {
    methodsRef.current = methods;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
