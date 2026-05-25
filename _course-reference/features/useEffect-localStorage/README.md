# useEffect Reference

Use this folder when the app needs something to happen because the component loaded or because a value changed.

## When To Use `useEffect`

```text
GET data when page loads              -> yes
GET data again when selected ID changes -> yes
save state to localStorage            -> yes
set up timer/listener and clean up    -> yes
submit a form after button click      -> usually no, use handleSubmit
calculate total from form fields      -> usually no, calculate directly or use useMemo
```

## Files To Open

- `useEffect-cases-reference.tsx`: main exam-style examples.
- `useEffect-get-on-load.tsx`: fetch data once when component loads.
- `useEffect-save-result-localStorage.tsx`: save latest result when it changes.
- `useEffect-dependency-array.tsx`: dependency array basics.
- `useEffect-with-props.tsx`: effect runs when prop changes.
- `localStorage-todos.tsx`: localStorage with state.
- `local-storage-form-draft-reference.tsx`: save and reload a form draft.
- `hooks/useLocalStorage.ts`: custom hook pattern.

## Fast Memory

```text
useEffect(() => {
  do side effect here
}, [valuesThatTriggerIt]);
```

Dependency array:

```text
no array       -> runs after every render
[]             -> runs once when component loads
[quoteId]      -> runs when quoteId changes
return cleanup -> runs before unmount or before effect reruns
```
