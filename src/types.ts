/**
 * types.js
 * license: MIT
 * http://github.com/
 */
import {definedLocales, LocaleField} from "./bsbox";

export type TextInputType = "text";
export type PasswordInputType = "password";
export type TextareaInputType = "textarea";
export type EmailInputType = "email";
export type NumberInputType = "number";
export type RangeInputType = "range";
export type TimeInputType = "time";
export type DateInputType = "date";
export type SelectInputType = "select";
export type CheckboxInputType = "checkbox";
export type RadioInputType = "radio";

/** The input types that present a text field. */
export type TextualInputType = TextInputType | PasswordInputType |
    TextareaInputType | EmailInputType | undefined;

/** The input types that present a numeric field. */
export type NumericInputType = NumberInputType | RangeInputType;



/**
 * This type maps an object representing prompt options for a ``select`` input
 * to the value type to be returned by the prompt.
 */
export type SelectPromptOptionToValue<T extends { inputType: SelectInputType;
    multiple?: boolean }> =
    T["multiple"] extends true ? (string [] | string) : string;


export type DocumentContent =
    string | Element | DocumentFragment | Text;

export type ButtonName = "ok" | "cancel" | "confirm";

export function getText(key: LocaleField, locale: string): string {
    const labels = definedLocales[locale];

    return labels !== undefined ? labels[key] : definedLocales.en[key];
}

export const extend = function (...args: any[]) {
    let extended: {} = {},
     i = 0,
     length = args.length,
     merge = (obj: { [x: string]: any; }) => {
        for ( let prop in obj ) {
            if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                if (Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                    // @ts-ignore
                    extended[prop] = extend(extended[prop], obj[prop] );
                } else {
                    // @ts-ignore
                    extended[prop] = obj[prop];
                }
            }
        }
    };
    for ( ; i < length; i++ ) {
        let obj = arguments[i];
        merge(obj);
    }

    return extended;
}
