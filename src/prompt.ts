import {
    CheckboxPromptOptions,
    DatePromptOptions,
    DialogOptions,
    NumericPromptOptions, RadioPromptOptions,
    sanitizeOptions, SelectPromptOptions,
    TextPromptOptions,
    TimePromptOptions
} from "./options";
import Modal from "bootstrap/js/dist/modal";

export type PromptOptions = TextPromptOptions | SelectPromptOptions |
    NumericPromptOptions | TimePromptOptions | DatePromptOptions |
    CheckboxPromptOptions | RadioPromptOptions;


export function prompt(options: DialogOptions): Modal | null {
    const finalOptions = sanitizeOptions(options);
    let el = document.getElementById('myModal');
    if(el != null) return new Modal(el);
    console.log(finalOptions);
    return null;
}