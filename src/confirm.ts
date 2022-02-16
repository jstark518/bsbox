import {CommonOptions, ConfirmCancelCommonOptions, DialogOptions, sanitizeOptions} from "./options";
import bootstrap from "bootstrap";

export interface ConfirmOptions extends CommonOptions, ConfirmCancelCommonOptions {
    callback?(this: bootstrap.Modal, value: boolean): boolean | void;
}

export function confirm(options: DialogOptions): bootstrap.Modal {
    const finalOptions = sanitizeOptions(options);
    let modal = new bootstrap.Modal(finalOptions.container);
    return modal;
}