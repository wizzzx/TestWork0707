/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { FC, HTMLAttributes } from "react";
import {
  FormProvider,
  UseFormClearErrors,
  UseFormStateReturn,
} from "react-hook-form";
import { UseFormReturn } from "react-hook-form/dist/types";
import get from "lodash/get";
import styles from "./index.module.css";
import cn from "classnames";

const onChangeForm = (
  e: any,
  errors: UseFormStateReturn<any>["errors"],
  clearErrors: UseFormClearErrors<any>,
) => {
  try {
    const name = e.target.name;
    const errorObject = get(errors, name);
    if (errorObject?.message) {
      clearErrors(name);
    }
  } catch (e) {
    console.log("An error occurred inside Form/onChangeForm", e);
  }
};

type propsType = {
  submit: (data: any) => void;
  form: UseFormReturn<any, any>;
  composition?: boolean;
} & HTMLAttributes<HTMLFormElement>;

export const SmartForm: FC<propsType> = ({
  children,
  submit,
  form,
  composition,
  ...props
}) => {
  const onFormChange = (e: any) => {
    props.onChange && props.onChange(e);
    onChangeForm(e, form.formState.errors, form.clearErrors);
  };

  return (
    <form
      onSubmit={form.handleSubmit(submit)}
      onChange={onFormChange}
      {...props}
      className={cn(styles.container, props.className, {
        [styles["container--composed"]]: composition,
      })}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
};
