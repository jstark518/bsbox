import bootstrap from "bootstrap";
import {CommonOptions, mergeDialogOptions} from "./options";
import {dialog} from "./dialog";
import {Button, OkButton} from "./buttons";

export interface AlertOptions extends CommonOptions {
    callback?(this: bootstrap.Modal): boolean | void;
    buttons?: OkButton;
}

export function alert(options: AlertOptions): bootstrap.Modal;

export function alert(message: string,
                      callback?: AlertOptions["callback"]): bootstrap.Modal;
export function alert(messageOrOptions: string | AlertOptions,
                      callback?: AlertOptions["callback"]): bootstrap.Modal {
    return _alert(typeof messageOrOptions === "string" ?
        {message: messageOrOptions} :
        messageOrOptions, callback);
}


export async function alert$(messageOrOptions: string | AlertOptions):
    Promise<void> {
    return new Promise(resolve => {
        _alert(typeof messageOrOptions === "string" ?
                {message: messageOrOptions} : messageOrOptions,
            undefined);
        resolve();
    });
}

function _alert(options: AlertOptions,
                callback: AlertOptions["callback"]): bootstrap.Modal {
    const finalOptions = mergeDialogOptions("alert", ["ok"], options, callback);

    const { callback: finalCallback } = finalOptions;

    // tslint:disable-next-line:no-suspicious-comment
    // @TODO: can this move inside exports.dialog when we're iterating over each
    // button and checking its button.callback value instead?
    if (finalCallback !== undefined && typeof finalCallback !== "function") {
        throw new Error("alert requires callback property to be a function when \
provided");
    }

    const customCallback = function(this: bootstrap.Modal): boolean | void {
        return typeof finalCallback === "function" ?
            finalCallback.call(this) : true;
    };

    (finalOptions.buttons.ok as Button).callback = customCallback;

   // setupEscapeAndCloseCallbacks(finalOptions, customCallback);

    return dialog(finalOptions);
}