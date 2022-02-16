import {
    ButtonName, CheckboxInputType,
    DateInputType,
    DocumentContent, extend,
    NumericInputType,
    RadioInputType, SelectInputType, SelectPromptOptionToValue,
    TextualInputType,
    TimeInputType
} from "./types";
import {AlertOptions} from "./alert";
import {ButtonCallback, Buttons, ConfirmCancelButtons, makeButtons, SanitizedButtons} from "./buttons";
import {ConfirmOptions} from "./confirm";
import {currentLocale} from "./bsbox";
import bootstrap from "bootstrap";
import {PromptOptions} from "./prompt";

export type SpecializedOptions = AlertOptions | ConfirmOptions | PromptOptions;

export interface CommonOptions {
    message?: DocumentContent;
    title?: DocumentContent;
    show?: boolean;
    backdrop?: boolean | "static";
    closeButton?: boolean;
    animate?: boolean;
    className?: string;
    size?: "large" | "small";
    locale?: string;
    swapButtonOrder?: boolean;
    centerVertical?: boolean;
    container?: string | Element | JQuery;
}

export interface DialogOptions extends CommonOptions {
    message: DocumentContent;
    onEscape?: boolean | ButtonCallback;
    onClose?: ButtonCallback;
    buttons?: Buttons;
}

interface SanitizedDialogOptions extends DialogOptions {
    container: string | Element;
    buttons: SanitizedButtons;
}

//  Filter and tidy up any user supplied parameters to this dialog.
//  Also looks for any shorthands used and ensures that the options
//  which are returned are all normalized properly
export function sanitizeOptions(options: DialogOptions): SanitizedDialogOptions {
    const finalOptions = {
        backdrop: "static",
        container: document.body,
        ...options
    };
    return finalOptions as SanitizedDialogOptions;
}

export function mergeDialogOptions<T extends SpecializedOptions>(
    kind: string,
    labels: ButtonName[],
    options: T,
    callback?: T["callback"]):
    T & DialogOptions & { buttons: Buttons } {
    // An earlier implementation was building a hash from ``buttons``. However,
    // the ``buttons`` array is very small. Profiling in other projects have shown
    // that for very small arrays, there's no benefit to creating a table for
    // lookup.
    //
    // An earlier implementation was also performing the check on the merged
    // options (the return value of this function) but that was pointless as it is
    // not possible to add invalid buttons with makeButtons.
    //
    for (const key in options.buttons) {
        // tslint:disable-next-line:no-any
        if (labels.indexOf(key as any) === -1) {
            throw new Error(`button key "${key}" is not allowed (options are \
${labels.join(" ")})`);
        }
    }

    // @ts-ignore
    const {locale, swapButtonOrder} = options;

    return extend({
            className: `bootprompt-${kind}`,
            buttons: makeButtons(swapButtonOrder === true ? labels.slice().reverse() :
                    labels,
                locale !== undefined ? locale : currentLocale),
        }, options, {callback}) as T & DialogOptions & { buttons: Buttons };
}
export type PromptOptionsToValue<T extends { inputType?: string;
    multiple?: boolean }> =
    T extends {} ? string : // This is for when inputType is unset.
        T["inputType"] extends (TextualInputType | NumericInputType | TimeInputType |
                DateInputType | RadioInputType) ? string :
            T["inputType"] extends CheckboxInputType ? (string | string[]) :
                T extends { inputType: SelectInputType } ? SelectPromptOptionToValue<T> :
                    never;


export interface ConfirmCancelCommonOptions {
    buttons?: ConfirmCancelButtons;
}

export interface PromptCommonOptions extends CommonOptions, ConfirmCancelCommonOptions {
    inputType?: string;
    callback?(this: bootstrap.Modal,
              value: PromptOptionsToValue<this> | null): boolean | void;
}

export interface TextPromptOptions extends PromptCommonOptions {

}

export interface NumericPromptOptions extends PromptCommonOptions {

}

export interface TimePromptOptions extends PromptCommonOptions {

}

export interface DatePromptOptions extends PromptCommonOptions {

}

export interface InputOption {

}

export interface CommonSelectOptions extends PromptCommonOptions {

}

export interface CheckboxPromptOptions extends PromptCommonOptions {

}

export interface RadioPromptOptions extends PromptCommonOptions {

}

export interface SingleSelectPromptOptions extends CommonSelectOptions {

}

export interface MultipleSelectPromptOptions extends CommonSelectOptions {

}

export type SelectPromptOptions =
    MultipleSelectPromptOptions | SingleSelectPromptOptions;