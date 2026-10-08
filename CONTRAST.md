# Colour contrast rule

One rule for the whole site: the felt pages (landing, features, changelog, starter) and the
docs, light and dark. It is stricter than the usual WCAG AA, so text stays comfortable to
read in dim rooms, on small phones and for low-vision readers.

## The rule

| What | Minimum | Basis |
| --- | --- | --- |
| Normal text (under 24px, or under 18.66px bold) | **7:1** | WCAG 1.4.6, AAA |
| Large text (24px+, or 18.66px+ bold) | **4.5:1** | WCAG 1.4.6, AAA |
| Form-field edge or fill against what is behind it | **3:1** | WCAG 1.4.11 |
| Keyboard focus ring against what it sits on | **3:1** | WCAG 1.4.11, 2.4.7 |
| Hover and focus states | the same as the resting state | |
| Placeholder text | same as text | |

Also:

- **Never colour alone.** Links inside running text keep an underline or another non-colour cue;
  a hover change must also change something other than hue.
- **No opacity on text.** Dimming text with `opacity` or a translucent colour lowers its
  contrast without showing up in the token. Pick a colour that already meets the rule.
- **Text smaller than 12px** is reported as a warning even when its contrast passes.
- **Exempt:** decorative stitching, patch edges and shadows, disabled controls, logos,
  and text that is part of a game screenshot.

## How to meet it when choosing colours

- Contrast is measured on the colour actually behind the text, composited through every
  translucent layer. The felt texture lines and the page noise are not counted, so keep a
  little headroom: aim for 7.5:1 on felt fills.
- Every felt patch colour has an `--ink` that passes 7:1 on its `--fill`. Use `var(--ink)` on a
  patch, never a hard-coded colour. Marigold (`#ffb454`) is only for text on the dark ground
  and surface, never on the grape footer or a coloured fill.
- A new accent needs its pair checked first. With any contrast calculator, check the
  foreground against *every* background it can land on (ground `#1c1b2b`, surface `#2e2d45`,
  the patch fills).
- Docs colours come from the Infima variables in `src/css/custom.css`, and code colours from
  `src/prism/themes.ts`. Change the variable, not individual selectors.
- A focus ring that sits outside an element is drawn against the parent's background. Inside
  a patch the ring uses the patch's ink instead (see the focus rules in `src/css/felt.css`).

## Checking it

```bash
npm run build
npm run contrast                       # every page, both colour modes
npm run contrast -- /features/hearts   # selected pages
npm run contrast -- --theme dark --verbose
npm run contrast -- --base http://localhost:3000   # a running dev server
```

`scripts/contrast-check.mjs` serves `build/`, opens every page in headless Chrome in light and
dark, and measures the rendered result: each visible text node (including `::placeholder`),
form-field edges, the keyboard focus ring of one element per distinct look, and the hover state
of the same elements. It prints each distinct problem once, with the pages it appears on, and
exits 1 if anything is under the rule. Run it before merging any change to colours or layout.

It measures against the flat background colour. A text node on a `url()` image or a non-texture
gradient is reported as a warning (shown with `--verbose`) and needs a manual look. It does not
check text inside the game screenshots, or colours of anything rendered after a click (open
menus, the Quick Bar).
