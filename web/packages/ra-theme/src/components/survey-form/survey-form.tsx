import { FieldApi, useForm } from "@tanstack/react-form";
import {
  CheckboxFormField,
  DateFormField,
  DropdownFormField,
  EmailFormField,
  GetResponseForm,
  NumberFormField,
  RadioFormField,
  SliderFormField,
  SubmissionFields,
  TextFormField,
  TextareaFormField,
  UrlFormField,
  YesNoFormField,
} from "../../api";
import {
  CheckboxField,
  DateField,
  DefaultField,
  DropdownField,
  EmailField,
  NumberField,
  RadioField,
  SliderField,
  TextField,
  TextareaField,
  UrlField,
  YesNoField,
} from "./fields";

type Field<T> = FieldApi<SubmissionFields, string, any, any, T>;

/**
 * Props of the {@link SurveyForm} component.
 */
interface SurveyFormProps {
  /**
   * Form data.
   */
  data: GetResponseForm;

  /**
   * Field errors.
   */
  errors?: {
    [key: string]: string;
  };

  /**
   * Submit handler.
   */
  onSubmit: (data: SubmissionFields) => Promise<void>;
}

/**
 * The Component that is used to render the survey form.
 */
export default function SurveyForm({
  data,
  errors,
  onSubmit,
}: SurveyFormProps): JSX.Element {
  const form = useForm<SubmissionFields, any>({
    defaultValues: data.fields.reduce(
      (acc, field) => ({ ...acc, [field.id]: field.default }),
      {},
    ),
    onSubmit: async (values) => {
      await onSubmit(values);
      form.reset();
    },
  });

  return (
    <form.Provider>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {data.fields.map((fieldData) => (
          <form.Field
            name={fieldData.id}
            key={fieldData.id}
            children={(field) => (
              <div>
                <label htmlFor={field.name}>{fieldData.title}</label>
                {fieldData.description && <p>{fieldData.description}</p>}
                {(() => {
                  switch (fieldData.type) {
                    case "checkbox":
                      return (
                        <CheckboxField
                          field={field as Field<string[]>}
                          data={fieldData as CheckboxFormField}
                        />
                      );
                    case "date":
                      return (
                        <DateField
                          field={field as Field<string>}
                          data={fieldData as DateFormField}
                        />
                      );
                    case "dropdown":
                      return (
                        <DropdownField
                          field={field as Field<string>}
                          data={fieldData as DropdownFormField}
                        />
                      );
                    case "email":
                      return (
                        <EmailField
                          field={field as Field<string>}
                          data={fieldData as EmailFormField}
                        />
                      );
                    case "number":
                      return (
                        <NumberField
                          field={field as Field<number>}
                          data={fieldData as NumberFormField}
                        />
                      );
                    case "radio":
                      return (
                        <RadioField
                          field={field as Field<string>}
                          data={fieldData as RadioFormField}
                        />
                      );
                    case "slider":
                      return (
                        <SliderField
                          field={field as Field<number>}
                          data={fieldData as SliderFormField}
                        />
                      );
                    case "text":
                      return (
                        <TextField
                          field={field as Field<string>}
                          data={fieldData as TextFormField}
                        />
                      );
                    case "textarea":
                      return (
                        <TextareaField
                          field={field as Field<string>}
                          data={fieldData as TextareaFormField}
                        />
                      );
                    case "url":
                      return (
                        <UrlField
                          field={field as Field<string>}
                          data={fieldData as UrlFormField}
                        />
                      );
                    case "yes-no":
                      return (
                        <YesNoField
                          field={field as Field<boolean>}
                          data={fieldData as YesNoFormField}
                        />
                      );
                    default:
                      return (
                        <DefaultField
                          field={field as Field<string>}
                          data={fieldData}
                        />
                      );
                  }
                })()}
                {errors && errors[fieldData.id] && (
                  <p>{errors[fieldData.id]}</p>
                )}
              </div>
            )}
          />
        ))}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        />
      </form>
    </form.Provider>
  );
}
