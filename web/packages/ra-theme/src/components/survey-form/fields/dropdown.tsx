import { FieldApi } from "@tanstack/react-form";
import { DropdownFormField, SubmissionFields } from "../../../api";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

/**
 * Props of the {@link DropdownField} component.
 */
interface DropdownFieldProps {
  /**
   * Field data.
   */
  data: DropdownFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, string>;
}

/**
 * Dropdown field component.
 */
export default function DropdownField({
  data,
  field,
}: DropdownFieldProps): JSX.Element {
  return (
    <FormControl fullWidth>
        <InputLabel>wybierz opcję</InputLabel>
        <Select
          value={field.state.value}
          /*label={field.name}*/
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          required={data.required}
        >
          {data.options.map((option) => (
            <MenuItem key={option.id} value={option.value}>{option.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
