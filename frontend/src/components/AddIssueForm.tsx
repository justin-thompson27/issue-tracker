import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import type { Resolver } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'
import { ApiError } from '../api'
import type { IssueDraft } from '../api'
import { createIssueSchema } from '../schemas/issueForm'
//so issue form props has 4 fields, which are a function and three optional parameters the function returns void or a promise of void(What does a promise of void mean). The function isPriority checks if the priorities match the priorities array. Some checks if at least one value matches priority. type problems has three optional values but starts off as an empty array. The function add issue form takes 4 parameters and returns an object with a type of AddIssueFormProps title, description, steps have a default of empty if the value is null, and priority has a value of medium if initial is null , problems is an empty array and server message can be a string or null. Busy starts off as false if priority is changed and matches properly the value of priority is changed to the value of the drop down const draft is a trimmed version of user inputed values and const found only gets values in its array if values are missing while an issue is being added busy is set to true which turns of the submit button once successful it clears the values in all the textboxes if a error occurs a server message is sent that will default to could not reach the server if it doesn't match the api error if a problem occurs then a paragraph with the problem title or description or steps to produce will appear with the corresponding error message




 
type AddIssueFormProps = {
  onAdd: (draft: IssueDraft) => Promise<void> | void
  initial?: IssueDraft
  submitLabel?: string
  clearOnSuccess?: boolean
}
 
const emptyDraft: IssueDraft = {
  title: '',
  description: '',
  stepsToReproduce: '',
  priority: 'medium',
}
 
// The server does not trim spaces, so we trim before the schema looks at the text.
const resolver: Resolver<IssueDraft> = (values, context, options) => { 
  const trimmed = {
    ...values,
    title: values.title.trim(),
    description: values.description.trim(),
    stepsToReproduce: values.stepsToReproduce.trim(),
  }
  return zodResolver(createIssueSchema)(trimmed, context, options)
}
//a resolver function takes three parameters: values is from the form , context is addition information passed that can be used to validate for example different roles might have different validation , options can give rules of how the validation should work but in this case context and options aren't used
 
const fieldNames = ['title', 'description', 'stepsToReproduce', 'priority'] as const
type FieldName = (typeof fieldNames)[number]
 
function isFieldName(value: string): value is FieldName {
  return fieldNames.some((name) => name === value)
}
 
export function AddIssueForm({
  onAdd,
  initial = emptyDraft,
  submitLabel = 'Add issue',
  clearOnSuccess = true,
}: AddIssueFormProps) {
  const form = useForm<IssueDraft>({ resolver, defaultValues: initial }) //Creates a form that creates a resolver function that will check the values submitted against the schema and on creation of a form with no values it is made with initial values of empty draft 
 
  async function onValid(draft: IssueDraft) {
    try {
      await onAdd(draft)
      if (clearOnSuccess) form.reset(emptyDraft)
    } catch (err) {
      if (!(err instanceof ApiError)) {
        form.setError('root.server', { message: 'Could not reach the server' }) //Creates a general error message if there is an error that is not an ApiError such as a 502
        return
      }
      // The server checks too. Show its field-by-field problems next to the right box.
      let placed = false
      for (const detail of err.details) {
        if (isFieldName(detail.path)) {
          form.setError(detail.path, { type: 'server', message: detail.message })
          placed = true
        }
      }
      if (!placed) form.setError('root.server', { message: err.message })
    }
  }
 
  const rootMessage = form.formState.errors.root?.server?.message
 
  return (
    <form onSubmit={form.handleSubmit(onValid)} noValidate className="rounded-lg border p-4">
      <FieldGroup>
        <Controller
          name="title" //identifies the field in the form and is used to get the value of the field and check it against the schema
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="issue-title">Title</FieldLabel>
              <Input {...field} id="issue-title" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="issue-description">Description</FieldLabel>
              <Textarea {...field} id="issue-description" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="stepsToReproduce"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="issue-steps">Steps to reproduce</FieldLabel>
              <Textarea {...field} id="issue-steps" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="priority"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="issue-priority">Priority</FieldLabel>
              <NativeSelect {...field} id="issue-priority" aria-invalid={fieldState.invalid}>
                <NativeSelectOption value="low">low</NativeSelectOption>
                <NativeSelectOption value="medium">medium</NativeSelectOption>
                <NativeSelectOption value="high">high</NativeSelectOption>
              </NativeSelect>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {rootMessage && <FieldError>{rootMessage}</FieldError>}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {submitLabel}
        </Button>
      </FieldGroup>
    </form>
  )
}
