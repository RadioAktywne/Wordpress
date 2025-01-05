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
  TextLineField,
  TextareaField,
  UrlField,
  YesNoField,
} from "./fields";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { styled } from "frontity";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Link from "../link";
import parse from "html-react-parser";

export const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#30241a',
    },
    secondary: {
      main: '#6aba9c',
    },
    background: {
      default: '#FFF4DC',
      paper: '#FFF4DC',
    },
    text: {
      primary: '#30241A',
      secondary: '#30241A',
      disabled: '#30241A',
    },
    error: {
      main: 'rgb(232, 90, 87)',
    },
    warning: {
      main: 'rgb(255, 245, 90)',
    },
    info: {
      main: 'rgb(113, 144, 188)',
    },
    success: {
      main: 'rgb(106, 186, 156)',
    },
  },
});

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
  const sortedFields = data.fields.sort((a, b) => a.id.localeCompare(b.id));

  const form = useForm<SubmissionFields, any>({
    defaultValues: sortedFields.reduce(
      (acc, field) => ({ ...acc, [field.id]: field.default }),
      {},
    ),
    onSubmit: async (values) => {
      handleClickOpen();
      form.reset();
      await onSubmit(values);
    },
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <ThemeProvider theme={themeOptions}>
      <form.Provider>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {sortedFields.map((fieldData) => (
            <form.Field
              name={fieldData.id}
              key={fieldData.id}
              children={(field) => (
                <FormField>
                  <label className="formFieldLabel" htmlFor={field.name}>{fieldData.title}</label>
                  {fieldData.description && <p>{parse(fieldData.description)}</p>}
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
                          <TextLineField
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
                </FormField>
              )}
            />
          ))}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <ButtonContainer>
                <Button disabled={!canSubmit} type="submit" variant="contained">{isSubmitting ? "..." : "Wyślij!"}</Button>
              </ButtonContainer>
            )}
          />
        </form>
      </form.Provider>

      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Ankieta wysłana."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Twoje odpowiedzi zostały zapisane. Dziękujemy!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link link="/"><Button onClick={handleClose}>Przejdź na stronę radia</Button></Link>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const FormField = styled.div`
  display: flex;
  flex-direction: column;

  .formFieldLabel {
    font-size: 18px;
    margin-top: 20px;
    font-weight: 400;
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  padding: 20px 0;
`