# Forms And Validation Reference

Use this folder when the scenario asks for user input.

## Which File To Open

- `form-cases-reference.tsx`: common field types and submit flow.
- `booking-form-with-api-callback.tsx`: best A3-style full form pattern.
- `validation-display-pattern.tsx`: how to show field errors.
- `controlled-form-validation.tsx`: course example controlled form.
- `simple-two-field-form.tsx`: smallest form example.
- `login-form-with-error.tsx`: simple error message example.

## Fast Form Flow

```text
useState formData
-> input value comes from formData
-> onChange updates formData
-> onSubmit preventDefault
-> validate
-> if valid call API
-> pass result to parent or show result
```

## Common Field Types

```text
text/email/date     -> input value is string
number              -> Number(event.target.value)
select              -> event.target.value
radio               -> same name, checked by value comparison
checkbox            -> event.target.checked
textarea            -> string value
```

## What To Unit Test

Do not test every input manually if time is short. Move validation into a helper and test that helper.

```text
src/utils/validation.ts
src/tests/validation.test.ts
```

