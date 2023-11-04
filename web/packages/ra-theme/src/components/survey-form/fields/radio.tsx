import { FieldApi } from "@tanstack/react-form";
import { Fragment } from "react";
import { RadioFormField, SubmissionFields } from "../../../api";
import { FormControlLabel, Radio } from "@mui/material";

/**
 * Props of the {@link RadioField} component.
 */
interface RadioFieldProps {
  /**
   * Field data.
   */
  data: RadioFormField;

  /**
   * Form field.
   */
  field: FieldApi<SubmissionFields, string, any, any, string>;
}

/**
 * Radio field component.
 */
export default function RadioField({
  data,
  field,
}: RadioFieldProps): JSX.Element {
  return (
    <>
      {data.options.map((option) => {
        const name = `${field.name}-${option.id}`;

        return (
          <Fragment key={option.id}>
            <FormControlLabel value="female" control={
            <Radio 
              name={name}
              required={data.required}
              checked={field.state.value === option.value}
              onBlur={field.handleBlur}
              onChange={() => field.handleChange(option.value)}
            />
            } label={option.title} />
          </Fragment>
        );
      })}
    </>
  );
}
