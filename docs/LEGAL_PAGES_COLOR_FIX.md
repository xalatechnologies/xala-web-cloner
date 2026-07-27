# Legal Pages Color Fix

## Issue
The list item titles in legal pages (like "Personlig Informasjon", "Bruksdata", "Tekniske Data") were not displaying with the correct colors:
- Light mode: Should be rose/magenta (#E6007A)
- Dark mode: Should be amber/yellow (#FFB703 or text-amber-400)

## Solution
Updated the legal pages to explicitly use the correct color classes for both light and dark modes:

### Changes Made
1. **PrivacyPolicy.tsx** - Updated list item titles to use `text-primary dark:text-amber-400`
2. **Terms.tsx** - Updated list item titles to use `text-primary dark:text-amber-400`
3. **CookiesPolicy.tsx** - Updated list item titles to use `text-primary dark:text-amber-400`

### Before
```tsx
<strong className="text-primary">{item.title}: </strong>
```

### After
```tsx
<strong className="text-primary dark:text-amber-400">{item.title}: </strong>
```

## Color Scheme
- **Light Mode**: 
  - `text-primary` = rose/magenta (#E6007A)
- **Dark Mode**: 
  - `dark:text-amber-400` = amber/yellow

This ensures consistency with the service titles and follows the project's unified dark mode and light mode UI styling standards.

## Testing
To verify the changes:
1. Open each legal page in light mode and confirm list item titles are rose/magenta
2. Switch to dark mode and confirm list item titles are amber/yellow
3. Test both English and Norwegian language versions

The list item titles should now properly display the correct colors in both light and dark modes.

## Superseded

The brand palette moved off Polkadot magenta/amber to a single Xala green (`#7ED956`) for `--primary` in both themes. Legal page list item titles now use `text-primary dark:text-primary` — the same color in both modes, not the magenta/amber split described above.