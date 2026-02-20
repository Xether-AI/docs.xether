# Accessibility Guide

## Overview

This document outlines the accessibility features and best practices implemented in the Xether AI documentation site.

## WCAG Compliance

Target: WCAG 2.1 Level AA compliance

## Implemented Features

### 1. Semantic HTML

- Proper use of semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`)
- Heading hierarchy (h1 → h2 → h3, no skipping levels)
- Landmark regions for screen readers

### 2. Keyboard Navigation

- All interactive elements accessible via keyboard
- Skip to main content link (visible on focus)
- Proper focus indicators
- Logical tab order
- Keyboard shortcuts documented (Cmd/Ctrl+K for search)

### 3. ARIA Labels

- Descriptive `aria-label` attributes on buttons and links
- `aria-pressed` for toggle buttons (theme toggle)
- `aria-modal` and `role="dialog"` for modals
- `aria-hidden` for decorative icons
- Proper `role` attributes where needed

### 4. Color Contrast

- Primary color (#78fcd6) meets WCAG AA standards
- Text colors have sufficient contrast ratios
- Dark mode maintains proper contrast
- No information conveyed by color alone

### 5. Focus Management

- Visible focus indicators on all interactive elements
- Focus trapped in modals
- Focus restored when closing modals
- Skip links for keyboard users

### 6. Screen Reader Support

- Descriptive link text (no "click here")
- Alt text for images (when implemented)
- Proper labeling of form inputs
- Status messages announced appropriately
- Hidden decorative elements (`aria-hidden="true"`)

### 7. Responsive Design

- Mobile-friendly navigation
- Touch targets at least 44x44px
- Readable text at all zoom levels
- No horizontal scrolling required

## Testing Checklist

### Keyboard Navigation

- [ ] Tab through all interactive elements
- [ ] Activate buttons with Enter/Space
- [ ] Navigate links with Enter
- [ ] Close modals with Escape
- [ ] Use search with Cmd/Ctrl+K

### Screen Reader Testing

- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Test with TalkBack (Android)

### Visual Testing

- [ ] Zoom to 200% - content still readable
- [ ] High contrast mode works
- [ ] Dark mode has proper contrast
- [ ] Focus indicators visible
- [ ] No color-only information

### Automated Testing

```bash
# Run Lighthouse accessibility audit
npm run lighthouse

# Check for accessibility issues
npm run lint
```

## Common Patterns

### Buttons

```tsx
<button
  onClick={handleClick}
  aria-label="Descriptive action"
  className="..."
>
  <Icon aria-hidden="true" />
  <span className="sr-only">Screen reader text</span>
</button>
```

### Links

```tsx
<Link href="/path" aria-label="Descriptive destination">
  Link text
</Link>
```

### Modals

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-label="Dialog title"
>
  {/* Modal content */}
</div>
```

### Skip Links

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only"
>
  Skip to main content
</a>
```

## Known Issues

None currently. Report accessibility issues via GitHub.

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [WebAIM Resources](https://webaim.org/resources/)

## Contributing

When adding new features:

1. Use semantic HTML
2. Add proper ARIA labels
3. Ensure keyboard accessibility
4. Test with screen readers
5. Verify color contrast
6. Document any new patterns

## Contact

For accessibility concerns or suggestions, please open an issue on GitHub.
