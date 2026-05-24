# Layout Components Reference

Use this folder when you need to quickly build the visible page structure.

For Assignment 3 style questions, the most common layout is:

```text
Header
Main content with two columns
  Left: form
  Right: result/summary
Footer
```

## Which File To Open

- `two-column-form-summary.tsx`: best match for A3 booking/quote/form tasks.
- `list-detail-layout.tsx`: list on the left, selected details on the right.
- `dashboard-cards-layout.tsx`: overview stats and summary cards.
- `table-detail-layout.tsx`: table of records plus selected details.
- `search-filter-cards-layout.tsx`: search/filter controls with card results.
- `step-form-layout.tsx`: simple multi-step form layout.
- `app-shell-no-sidebar.tsx`: simple header/main/footer app shell.
- `app-shell-with-sidebar.tsx`: only use this if the task asks for a sidebar.
- `layout-normal-css-example.css`: normal CSS version if Tailwind is not available.
- `nav-top-basic.tsx`: basic header nav links.
- `nav-active-state.tsx`: top nav that switches content with state.
- `nav-tabs.tsx`: tabs inside the main content.
- `nav-sidebar.tsx`: sidebar navigation.
- `components/Header.tsx`: simple header component example.
- `components/Footer.tsx`: simple footer component example.
- `components/MainContent.tsx`: older two-card content example.
- `components/Sidebar.tsx`: sidebar example.

## Pick Layout By Scenario

```text
Form + result summary        -> two-column-form-summary.tsx
List + selected details      -> list-detail-layout.tsx
Many records with columns    -> table-detail-layout.tsx
Stats / totals / overview    -> dashboard-cards-layout.tsx
Search or filter items       -> search-filter-cards-layout.tsx
Long form with stages        -> step-form-layout.tsx
Simple app pages             -> app-shell-no-sidebar.tsx + nav-top-basic.tsx
Dashboard/admin navigation   -> nav-sidebar.tsx or app-shell-with-sidebar.tsx
Multiple views in one page   -> nav-tabs.tsx
```

## Pick Nav By Scenario

```text
Normal site header links     -> nav-top-basic.tsx
No React Router page switch  -> nav-active-state.tsx
Switch sections on same page -> nav-tabs.tsx
Admin/dashboard menu         -> nav-sidebar.tsx
```

## Fast Rule

If the question says "two-column layout", do not build a sidebar.

Use:

```text
main -> grid -> section left -> section right
```

Not:

```text
sidebar + main
```

## Tailwind Two-Column Pattern

```tsx
<main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <section className="rounded border bg-white p-6 shadow-sm">Left</section>
    <section className="rounded border bg-white p-6 shadow-sm">Right</section>
  </div>
</main>
```

Meaning:

- `mx-auto`: centre the content area.
- `w-full`: allow the content to use available width.
- `max-w-6xl`: prevent the content becoming too wide.
- `grid-cols-1`: one column on small screens.
- `md:grid-cols-2`: two columns on medium and larger screens.
- `gap-6`: space between columns.
