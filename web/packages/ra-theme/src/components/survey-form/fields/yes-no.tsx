import { FieldApi } from "@tanstack/react-form";
import { SubmissionFields, YesNoFormField } from "../../../api";

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
    <input
      type="checkbox"
      name={field.name}
      required={data.required}
      checked={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.checked)}
    />
  );
}
