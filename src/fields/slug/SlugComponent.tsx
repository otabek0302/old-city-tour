"use client";
import React, { useCallback, useEffect } from "react";
import { TextFieldClientProps } from "payload";

import { useField, Button, TextInput, FieldLabel, useFormFields, useForm } from "@payloadcms/ui";

import { formatSlug } from "./formatSlug";
import "./index.scss";

type SlugComponentProps = { fieldToUse: string; checkboxFieldPath: string } & TextFieldClientProps;

export const SlugComponent: React.FC<SlugComponentProps> = ({ field, fieldToUse, checkboxFieldPath: checkboxFieldPathFromProps, path, readOnly: readOnlyFromProps }) => {
  const { label } = field;

  const checkboxFieldPath = path?.includes(".") ? `${path}.${checkboxFieldPathFromProps}` : checkboxFieldPathFromProps;

  const { value, setValue } = useField<string>({ path: path || field.name });

  const { dispatchFields } = useForm();

  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string;
  });

  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string;
  });

  useEffect(() => {
    if (checkboxValue && !value && targetFieldValue) {
      const formattedSlug = formatSlug(targetFieldValue);
      setValue(formattedSlug);
    }
  }, [targetFieldValue, checkboxValue, setValue, value]);

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault();

      dispatchFields({
        type: "UPDATE",
        path: checkboxFieldPath,
        value: !checkboxValue,
      });
    },
    [checkboxValue, checkboxFieldPath, dispatchFields]
  );

  const readOnly = readOnlyFromProps;

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />

        <Button className="lock-button" buttonStyle="none" onClick={handleLock}>
          {checkboxValue ? "🔒 Auto-generate" : "✏️ Manual"}
        </Button>
      </div>

      <TextInput value={value} onChange={setValue} path={path || field.name} readOnly={Boolean(readOnly)} placeholder="Enter URL slug in English (e.g., samarkand-bukhara-tour)" />

      {!checkboxValue && <div className="text-xs text-gray-500 mt-1">💡 Tip: Write in English for all languages. Use hyphens, no spaces or special characters.</div>}
    </div>
  );
};
