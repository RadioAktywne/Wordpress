import { FieldApi } from "@tanstack/react-form";
import { Fragment } from "react";
import { CheckboxFormField, SubmissionFields } from "../../../api";
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from "@mui/material";

/**
 * Props of the {@link CheckboxField} component.
 */
interface CheckboxFieldProps {
  /**
   * Field data.
   */
  data: CheckboxFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, string[]>;
}

/**
 * Checkbox field component.
 */
export default function CheckboxField({
  data,
  field,
}: CheckboxFieldProps): JSX.Element {
  const sortedOptions = data.options.sort((a, b) => a.id.localeCompare(b.id));
  return (
    <>
      {sortedOptions.map((option) => {
        const name = `${field.name}-${option.id}`;

        return (
          <Fragment key={option.id}>
            <FormControlLabel label={option.title} control={
              <Checkbox
                name={name}
                required={data.required}
                checked={field.state.value?.includes(option.value)}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const value = option.value;
                  const values = field.state.value || [];
                  if (values.includes(value)) {
                    field.handleChange(values.filter((v) => v !== value));
                  } else {
                    field.handleChange([...values, value]);
                  }
                }}
              />
            }/>
          </Fragment>
        );
      })}
    </>
  );
}
