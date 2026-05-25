# Memo And Ref Hooks Reference

Use this folder when the task mentions performance, derived values, input focus, or avoiding unnecessary child renders.

## Which File To Open

- `useMemo-derived-value.tsx`: calculate a derived value only when its inputs change.
- `useRef-input-focus.tsx`: focus or access an input element.
- `useRef-vs-useState.tsx`: compare state and ref behaviour.
- `useCallback-child-prop-reference.tsx`: keep a callback stable when passing it to a child component.

## Fast Memory

```text
useMemo      -> memoise a calculated value
useCallback  -> memoise a function
useRef       -> store a DOM reference or mutable value without re-rendering
```

