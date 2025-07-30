/**
 * Utility function to clean up double-encoded localized data
 * This function handles cases where localized fields are stored as JSON strings instead of proper objects
 */

export const cleanLocalizedData = (data: any, locale: string): any => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const cleaned: any = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Check if the string looks like JSON
      if (value.startsWith('{') && value.endsWith('}')) {
        try {
          const parsed = JSON.parse(value);
          
          // If it's a localized object with the current locale
          if (parsed && typeof parsed === 'object' && parsed[locale]) {
            // Extract the value for the current locale
            cleaned[key] = parsed[locale];
          } else if (parsed && typeof parsed === 'object') {
            // If it's a nested localized object, recursively clean it
            cleaned[key] = cleanLocalizedData(parsed, locale);
          } else {
            // If parsing failed or it's not a localized object, keep original
            cleaned[key] = value;
          }
        } catch {
          // If JSON parsing fails, keep the original value
          cleaned[key] = value;
        }
      } else {
        // Not JSON, keep as is
        cleaned[key] = value;
      }
    } else if (Array.isArray(value)) {
      // Handle arrays
      cleaned[key] = value.map(item => cleanLocalizedData(item, locale));
    } else if (typeof value === 'object' && value !== null) {
      // Handle nested objects
      cleaned[key] = cleanLocalizedData(value, locale);
    } else {
      // Keep other types as is
      cleaned[key] = value;
    }
  }

  return cleaned;
};

/**
 * Clean a specific field that might be double-encoded
 */
export const cleanLocalizedField = (fieldValue: any, locale: string): any => {
  if (typeof fieldValue === 'string') {
    if (fieldValue.startsWith('{') && fieldValue.endsWith('}')) {
      try {
        const parsed = JSON.parse(fieldValue);
        if (parsed && typeof parsed === 'object' && parsed[locale]) {
          return parsed[locale];
        }
      } catch {
        // If parsing fails, return original
        return fieldValue;
      }
    }
  }
  return fieldValue;
};