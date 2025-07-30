# Internationalization (i18n) System

This project uses a clean, organized internationalization system with JSON files for translations.

## Structure

```
src/utilities/i18n/
├── en.json          # English translations
├── ru.json          # Russian translations
├── uz.json          # Uzbek translations
├── index.ts         # Main i18n utilities
└── README.md        # This file
```

## Usage

### 1. In Client Components

```tsx
"use client";

import { useTranslation } from "@/providers/i18n";

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pages.home.title')}</h1>
      <p>{t('pages.home.subtitle')}</p>
      <button>{t('common.save')}</button>
    </div>
  );
};
```

### 2. With Parameters

```tsx
const { t } = useTranslation();

// In JSON: "minLength": "Must be at least {min} characters"
const message = t('forms.validation.minLength', { min: 5 });
// Result: "Must be at least 5 characters"
```

### 3. In Server Components

For server components, use the utility function directly:

```tsx
import { t } from "@/utilities/i18n";

const MyServerComponent = ({ locale }: { locale: string }) => {
  return (
    <div>
      <h1>{t(locale as Locale, 'pages.home.title')}</h1>
    </div>
  );
};
```

## Translation Keys Organization

The translations are organized into logical categories:

- `common.*` - Common UI elements (buttons, labels, etc.)
- `navigation.*` - Navigation menu items
- `pages.*` - Page-specific content
- `errors.*` - Error messages
- `success.*` - Success messages
- `forms.*` - Form-related text
- `components.*` - Component-specific text

## Adding New Translations

1. Add the key to all language files (`en.json`, `ru.json`, `uz.json`)
2. Use the key in your component with `t('your.key')`
3. Keep translations organized and consistent

## Best Practices

1. **Use descriptive keys**: `pages.tours.title` instead of `tours_title`
2. **Group related translations**: Keep related text under the same category
3. **Use parameters for dynamic content**: `{min}` for validation messages
4. **Keep translations clean**: Avoid hardcoded text in components
5. **Be consistent**: Use the same key structure across similar content

## Example Translation Structure

```json
{
  "pages": {
    "tours": {
      "title": "Our Tours",
      "subtitle": "Discover amazing destinations",
      "noTours": "No tours available"
    }
  },
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
  }
}
```

## Provider Setup

The i18n provider is automatically set up in `src/providers/index.tsx` and wraps your entire application, making translations available throughout the app. 