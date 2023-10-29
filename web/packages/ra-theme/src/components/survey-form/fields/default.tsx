import { FieldApi } from "@tanstack/react-form";
import { FormFieldsItem, SubmissionFields } from "../../../api";

/**
 * Props of the {@link DefaultField} component.
 */
interface DefaultFieldProps {
  /**
   * Field data.
   */
  data: FormFieldsItem;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, string>;
}

/**
 * Default field component.
 */
export default function DefaultField({
  data,
  field,
}: DefaultFieldProps): JSX.Element {
  return (
    <input
      name={field.name}
      value={field.state.value}
      required={data.required}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
