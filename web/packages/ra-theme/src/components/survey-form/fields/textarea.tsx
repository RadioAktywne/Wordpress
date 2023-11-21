import { FieldApi } from "@tanstack/react-form";
import { SubmissionFields, TextareaFormField } from "../../../api";
import TextField from "@mui/material/TextField";

/**
 * Props of the {@link TextareaField} component.
 */
interface TextareaFieldProps {
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
 * Textare field component.
 */
export default function TextareaField({
  data,
  field,
}: TextareaFieldProps): JSX.Element {
  return (
    <TextField
      name={field.name}
      value={field.state.value}
      label="wpisz tekst"
      required={data.required}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      multiline
      minRows={2}
    />
  );
}
