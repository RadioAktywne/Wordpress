import { FieldApi } from "@tanstack/react-form";
import { DropdownFormField, SubmissionFields } from "../../../api";

/**
 * Props of the {@link DropdownField} component.
 */
interface DropdownFieldProps {
  /**
   * Field data.
   */
  data: DropdownFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, string>;
}

/**
 * Dropdown field component.
 */
export default function DropdownField({
  data,
  field,
}: DropdownFieldProps): JSX.Element {
  return (
    <select
      name={field.name}
      value={field.state.value}
      required={data.required}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    >
      {data.options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
}
