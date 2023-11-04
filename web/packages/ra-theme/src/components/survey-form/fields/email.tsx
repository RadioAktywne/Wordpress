import { FieldApi } from "@tanstack/react-form";
import { EmailFormField, SubmissionFields } from "../../../api";
import TextField from '@mui/material/TextField';

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
    <TextField
      type="email"
      label="adres e-mail"
      name={field.name}
      value={field.state.value}
      required={data.required}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
