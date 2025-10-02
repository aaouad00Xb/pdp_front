# Language Toggle Setup - Arabic/French

## Overview
This implementation adds a language toggle feature to switch between Arabic and French in the PDP (Plan de Développement Préfectoral) application.

## Features Implemented

### 1. Translation Service (`src/app/services/translation.service.ts`)
- Dynamic language switching between French (`fr`) and Arabic (`ar`)
- Persistent language selection using localStorage
- Automatic RTL/LTR direction switching
- Comprehensive translations for:
  - Navigation elements
  - Dashboard components
  - Form fields
  - Login interface
  - Strategic axes and objectives

### 2. Language Toggle Component (`src/app/components/language-toggle/`)
- Dropdown-style language selector
- Visual indicators (flags and checkmarks)
- Responsive design
- Bootstrap integration

### 3. Translation Pipe (`src/app/pipes/translate.pipe.ts`)
- Easy-to-use pipe for templates: `{{ 'key.path' | translate }}`
- Reactive to language changes
- Fallback to French if Arabic translation missing

### 4. RTL Support (`src/styles-rtl.css`)
- Complete right-to-left layout support for Arabic
- Bootstrap RTL overrides
- Form controls, tables, and navigation RTL styling
- Icon flipping for appropriate UI elements

## Usage

### In Templates
```html
<!-- Simple translation -->
<h1>{{ 'dashboard.title' | translate }}</h1>

<!-- Dynamic placeholder -->
<input [placeholder]="'login.email' | translate">

<!-- Language toggle component -->
<app-language-toggle></app-language-toggle>
```

### In Components
```typescript
import { TranslationService } from './services/translation.service';

constructor(private translationService: TranslationService) {}

// Get current language
const currentLang = this.translationService.getCurrentLanguage();

// Set language programmatically
this.translationService.setLanguage('ar');

// Get translation in component
const translation = this.translationService.translate('dashboard.title');
```

## Translation Keys Structure

```
nav.dashboard          → Dashboard navigation
nav.editor            → Editor navigation
nav.login             → Login navigation

dashboard.title       → Main dashboard title
dashboard.totalBudget → Total budget label

fields.axes           → Axes field label
fields.objectif       → Objective field label
fields.projetAction   → Project/Action field label

login.title           → Login page title
login.email           → Email field placeholder
login.password        → Password field placeholder

common.yes            → Yes button
common.no             → No button
common.loading        → Loading message
```

## Components Updated

1. **Dashboard Component**: Added language toggle in header, translated key labels
2. **Login Component**: Added language toggle, translated form elements
3. **App Component**: Initialized language service
4. **App Module**: Registered new components and pipes

## Files Created/Modified

### New Files:
- `src/app/services/translation.service.ts`
- `src/app/components/language-toggle/language-toggle.component.ts`
- `src/app/components/language-toggle/language-toggle.component.html`
- `src/app/components/language-toggle/language-toggle.component.css`
- `src/app/pipes/translate.pipe.ts`
- `src/styles-rtl.css`

### Modified Files:
- `src/app/app.module.ts` - Added new components and pipes
- `src/app/app.component.ts` - Added language service initialization
- `src/app/dashboard/dashboard.component.html` - Added translations and language toggle
- `src/app/login/login.component.html` - Added translations and language toggle
- `angular.json` - Added RTL styles

## Running the Application

1. **Install dependencies** (if needed):
   ```bash
   cd pdp_Front
   npm install
   ```

2. **Start the development server**:
   ```bash
   ng serve
   ```

3. **Access the application**:
   - Open browser to `http://localhost:4200`
   - Use the language toggle (globe icon) to switch between French and Arabic
   - Language preference is saved in localStorage

## Language Toggle Locations

- **Dashboard**: Top header next to the logo
- **Login Page**: Below the title in the login form

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- RTL support tested on Chrome, Firefox, Safari, and Edge
- Mobile responsive design included

## Customization

### Adding New Translations
1. Open `src/app/services/translation.service.ts`
2. Add new keys to both `fr` and `ar` translation objects
3. Use the new keys in templates with the translate pipe

### Styling RTL Elements
1. Add custom RTL styles to `src/styles-rtl.css`
2. Use `[dir="rtl"]` selector for Arabic-specific styles
3. Test with both languages to ensure proper layout

## Notes

- The application defaults to French if no language is previously selected
- Arabic text uses standard Arabic fonts available on most systems
- Charts and graphs maintain LTR orientation for better readability
- All user-facing text should be translatable - avoid hardcoded strings
