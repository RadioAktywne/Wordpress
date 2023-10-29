import { FieldApi } from "@tanstack/react-form";
import { NumberFormField, SubmissionFields } from "../../../api";

/**
 * Props of the {@link NumberField} component.
 */
interface NumberFieldProps {
  /**
   * Field data.
   */
  data: NumberFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, number>;
}

/**
 * Number field component.
 */
export default function NumberField({
  data,
  field,
}: NumberFieldProps): JSX.Element {
  return (
    <input
      type="number"
      name={field.name}
      value={field.state.value}
      required={data.required}
      step="any"
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.valueAsNumber)}
    />
  );
}
