import { FieldApi } from "@tanstack/react-form";
import { SubmissionFields, TextareaFormField } from "../../../api";

/**
 * Props of the {@link TextField} component.
 */
interface TextFieldProps {
  /**
   * Field data.
   */
  data: TextareaFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, string>;
}

/**
 * Text field component.
 */
export default function TextField({
  data,
  field,
}: TextFieldProps): JSX.Element {
  return (
    <input
      type="text"
      name={field.name}
      value={field.state.value}
      required={data.required}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
