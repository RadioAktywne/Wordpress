import { FieldApi } from "@tanstack/react-form";
import { DateFormField, SubmissionFields } from "../../../api";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

/**
 * Props of the {@link DateField} component.
 */
interface DateFieldProps {
  /**
   * Field data.
   */
  data: DateFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, string>;
}

/**
 * Date field component.
 */
export default function DateField({
  data,
  field,
}: DateFieldProps): JSX.Element {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={field.state.value} onChange={(e) => field.handleChange(e)} /*label={field.name}*//>
    </LocalizationProvider>
  );
}
