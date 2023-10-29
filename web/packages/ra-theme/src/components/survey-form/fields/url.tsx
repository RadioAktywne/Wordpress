import { FieldApi } from "@tanstack/react-form";
import { SubmissionFields, UrlFormField } from "../../../api";

/**
 * Props of the {@link UrlField} component.
 */
interface UrlFieldProps {
  /**
   * Field data.
   */
  data: UrlFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, string>;
}

/**
 * Url field component.
 */
export default function UrlField({ data, field }: UrlFieldProps): JSX.Element {
  return (
    <input
      type="url"
      name={field.name}
      value={field.state.value}
      required={data.required}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
