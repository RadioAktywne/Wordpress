import { FieldApi } from "@tanstack/react-form";
import { SliderFormField, SubmissionFields } from "../../../api";

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
  return (
    <input
      type="range"
      name={field.name}
      value={field.state.value}
      required={data.required}
      min={data.min}
      max={data.max}
      step={data.step}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.valueAsNumber)}
    />
  );
}
