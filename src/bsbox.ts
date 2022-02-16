/**
 * bsbox.js
 * license: MIT
 * http://github.com/
 */

// tslint:disable-next-line:no-import-side-effect
import "bootstrap";
const version = "1.0.0";

export const VERSION = version;
export type LocaleField = "OK" | "CANCEL" | "CONFIRM";
export type LocaleSpec = Record<LocaleField, string>;

export const LOCALE_FIELDS: LocaleField[] = ["OK",  "CANCEL", "CONFIRM"];
export let currentLocale = "en";
export const definedLocales: Record<string, LocaleSpec> = Object.create(null);
export function locales(): Record<string, LocaleSpec>;
export function locales(name: string): LocaleSpec | undefined;
export function locales(name?: string):
    Record<string, LocaleSpec> | LocaleSpec | undefined {
    return name !== undefined ? definedLocales[name] : definedLocales;
}
export function addLocale(name: string, values: LocaleSpec): void {
    for (const field of LOCALE_FIELDS) {
        if (typeof values[field] !== "string") {
            throw new Error(`Please supply a translation for "${field}"`);
        }
    }

    definedLocales[name] = values;
}

export {dialog} from "./dialog";
export {prompt} from "./prompt";
export {confirm} from "./confirm";
export {alert} from "./alert";

const _global = (window || global) as any;
_global.bxbox = this;