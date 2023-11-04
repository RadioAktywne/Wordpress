import { FieldApi, Updater } from "@tanstack/react-form";
import { SliderFormField, SubmissionFields } from "../../../api";
import Slider from '@mui/material/Slider';
import React from "react";

/**
 * Props of the {@link SliderField} component.
 */
interface SliderFieldProps {
  /**
   * Field data.
   */
  data: SliderFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, number>;
}

/**
 * Slider field component.
 */
export default function SliderField({
  data,
  field,
}: SliderFieldProps): JSX.Element {
  const [value, setValue] = React.useState<number>(field.state.value);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    field.handleChange(value);
  };

  return (
    <Slider 
      name={field.name}
      value={value}
      min={data.min}
      max={data.max}
      step={data.step}
      onBlur={field.handleBlur}
      onChange={handleChange}
      aria-label="wybierz wartość" 
    />
  );
}
