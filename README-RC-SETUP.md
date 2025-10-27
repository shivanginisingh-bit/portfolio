# Risk & Controls Case Study - Fresh Setup

## Files Created

### Core Files
- `risk-controls.v2.html` - Main HTML file
- `rc.css` - Stylesheet for the case study
- `content.js` - Content data and JavaScript

### Asset Structure
```
assets/rc/
├── hero.svg (banner.png renamed)
├── process.png
├── visual-flow.png (vd.png)
├── usability.png
├── challenge.png
└── [other images...]
```

## Navigation Updates
Updated the following files to point to `risk-controls.v2.html`:
- `index.html`
- `work.html` 
- `nav.js`
- `js/content.js`

## How It Works

1. **Content Management**: All content is stored in `content.js` as a JavaScript object
2. **Dynamic Loading**: The HTML file loads content via JavaScript
3. **CSS Variables**: Layout tokens are applied at runtime from the content object
4. **Responsive Design**: Mobile-first approach with proper breakpoints

## Key Features

- **140px Left Alignment**: All content starts at the same vertical line
- **Black Text**: Forced black text throughout for consistency
- **Lilac Cards**: Challenge, Vision, Process, and Learnings use `#EDE3FF` background
- **12px Minimum Gap**: Process and Usability sections maintain exact spacing
- **Single Watermark**: Non-sticky footer with duplicate hiding
- **Responsive**: Proper mobile stacking while maintaining alignment

## Testing

1. Open `risk-controls.v2.html` in browser
2. Hard reload with Cmd+Shift+R (Mac) / Ctrl+Shift+R (Win)
3. Verify all images load correctly
4. Check that text is black and properly aligned
5. Test responsive behavior on different screen sizes

## Troubleshooting

### Broken Images
- Check that files exist in `assets/rc/`
- Verify paths in `content.js` match exactly (case-sensitive)

### Text Not Black
- Ensure `<body class="rc">` is present
- Make sure `rc.css` is the last stylesheet loaded

### Alignment Issues
- Verify all content is wrapped in `.rail` containers
- Check that CSS variables are being applied correctly

## Future Reuse

To create another case study:
1. Duplicate `risk-controls.v2.html` → `new-case.html`
2. Add new object in `content.js`: `window.CASESTUDIES.newCase = { ... }`
3. Update the data reference: `const data = window.CASESTUDIES?.newCase;`
