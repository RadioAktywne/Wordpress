import { FieldApi } from "@tanstack/react-form";
import { NumberFormField, SubmissionFields } from "../../../api";
import TextField from '@mui/material/TextField';

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
    <TextField
      type="number"
      label="numer"
      name={field.name}
      value={field.state.value}
      required={data.required}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(Number(e.target.value))}
    />
  );
}
