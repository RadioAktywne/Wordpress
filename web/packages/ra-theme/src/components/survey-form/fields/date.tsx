import { FieldApi } from "@tanstack/react-form";
import { DateFormField, SubmissionFields } from "../../../api";

/**
 * Props of the {@link DateField} component.
 */
interface DateFieldProps {
  /**
   * Field data.
   */
  data: DateFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, string>;
}

/**
 * Date field component.
 */
export default function DateField({
  data,
  field,
}: DateFieldProps): JSX.Element {
  return (
    <input
      type="date"
      name={field.name}
      value={field.state.value}
      required={data.required}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
