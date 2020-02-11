import * as React from 'react';
import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from '@material-ui/pickers';
import { FieldProps, getIn } from 'formik';

export interface DateTimePickerProps
  extends FieldProps,
    Omit<MuiDateTimePickerProps, 'name' | 'value' | 'error' | 'onChange'> {}

export function fieldToDateTimePicker({
  disabled,
  field,
  form: { isSubmitting, touched, errors, setFieldValue, setFieldError },
  ...props
}: DateTimePickerProps): MuiDateTimePickerProps {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    ...props,
    ...field,
    error: showError,
    helperText: showError ? fieldError : props.helperText,
    disabled: disabled != undefined ? disabled : isSubmitting,
    onChange(date) {
      setFieldValue(field.name, date);
    },
    onError(error) {
      if (error !== fieldError) {
        setFieldError(field.name, String(error));
      }
    },
  };
}

export function DateTimePicker({ children, ...props }: DateTimePickerProps) {
  return (
    <MuiDateTimePicker {...fieldToDateTimePicker(props)}>
      {children}
    </MuiDateTimePicker>
  );
}

DateTimePicker.displayName = 'FormikMaterialUIDateTimePicker';
