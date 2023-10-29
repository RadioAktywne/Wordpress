import { FieldApi } from "@tanstack/react-form";
import { EmailFormField, SubmissionFields } from "../../../api";

/**
 * Props of the {@link EmailField} component.
 */
interface EmailFieldProps {
  /**
   * Field data.
   */
  data: EmailFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, string>;
}

/**
 * Email field component.
 */
export default function EmailField({
  data,
  field,
}: EmailFieldProps): JSX.Element {
  return (
    <input
      type="email"
      name={field.name}
      value={field.state.value}
      required={data.required}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
