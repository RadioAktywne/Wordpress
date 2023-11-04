import { FieldApi } from "@tanstack/react-form";
import { SubmissionFields, YesNoFormField } from "../../../api";
import Switch from "@mui/material/Switch";

/**
 * Props of the {@link YesNoField} component.
 */
interface YesNoFieldProps {
  /**
   * Field data.
   */
  data: YesNoFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, boolean>;
}

/**
 * Yes/No field component.
 */
export default function YesNoField({
  data,
  field,
}: YesNoFieldProps): JSX.Element {
  return (
    <Switch 
      onBlur={field.handleBlur}
      checked={field.state.value}
      required={data.required}
      onChange={(e) => field.handleChange(e.target.checked)}
    />
  );
}
