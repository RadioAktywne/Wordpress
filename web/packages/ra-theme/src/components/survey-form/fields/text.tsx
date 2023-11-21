import { FieldApi } from "@tanstack/react-form";
import { SubmissionFields, TextareaFormField } from "../../../api";
import TextField from "@mui/material/TextField";

/**
 * Props of the {@link TextField} component.
 */
interface TextLineFieldProps {
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
export default function TextLineField({
  data,
  field,
}: TextLineFieldProps): JSX.Element {
  return (
    <TextField
      type="text"
      label="wpisz tekst"
      name={field.name}
      value={field.state.value}
      required={data.required}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
