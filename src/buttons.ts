/**
 * This is the kind of callback all buttons accept.
 *
 * @param this This is set to the jQuery object that models the modal.
 *
 * @param event The jQuery event that triggered the button.
 *
 * @returns ``false`` to keep the modal up. Anything else will hide the modal.
 */
import {ButtonName, getText} from "./types";
import {LocaleField} from "./bsbox";
import bootstrap from "bootstrap";

export type ButtonCallback =
    (this: bootstrap.Modal, event: Event) => boolean | void;


/**
 * This interface provides the detailed way to specify a modal button.
 */
export interface Button {
    /**
     * The name of the button shown to the user. The buttons for a modal are
     * specified by a plain JS object with fields whose values conform to the
     * [[Button]] interface. (See [[Buttons]].) If a label is not specified, this
     * fields gets a value from the key with which the [[Button]] object is
     * associated in the map.
     */
    label?: string;

    /** An additional class name to give to the button. */
    className?: string;

    /** A callback to call when the button is clicked. */
    callback?: ButtonCallback;
}
/**
 * Used internally after the buttons specifications for a modal have been
 * processed to a sanitized form. After sanitization, all labels and class names
 * are set.
 */
interface SanitizedButton extends Button {
    label: string;
    className: string;
}

/**
 * A button specification. A button can be specified in one of two ways: by
 * providing a detailed object, or by only providing the button callback and
 * letting Bootprompt use defaults for the rest.
 */
export type ButtonSpec = Button;

/**
 * We pass an object of this shape to specify all the buttons to be shown in a
 * modal.
 */
export interface Buttons {
    // We want | undefined here so that we can declare specific names as being
    // optional.
    [key: string]: ButtonSpec | undefined;
}

/**
 * Used internally after the buttons specifications for a modal have been
 * processed to a sanitized form.
 */
export interface SanitizedButtons extends Buttons {
    [key: string]: SanitizedButton;
}

/**
 * A "specialized button" is a button for one of the specialized functions. This
 * interface eliminates the ``callback`` field. The specialized functions
 * overwrite any callback set on these buttons with their own callbacks, so it
 * is not sensible to allow setting ``callback``.
 */
export interface SpecializedButton extends Button {
    callback?: never;
}

/**
 * [[alert]] only takes the ``ok`` button, and so its button specification
 * *must* conform to this interface.
 */
export interface OkButton extends Buttons {
    ok?: SpecializedButton;
}

/**
 * [[confirm]] and [[prompt]] only take the ``confirm`` and ``cancel`` buttons,
 * so their button specification *must* conform to this interface.
 */
export interface ConfirmCancelButtons extends Buttons {
    confirm?: SpecializedButton;
    cancel?: SpecializedButton;
}

export function makeButtons(labels: ButtonName[], locale: string): Buttons {
    const buttons: Buttons = Object.create(null);

    for (const label of labels) {
        buttons[label.toLowerCase()] = {
            label: getText(label.toUpperCase() as LocaleField, locale),
        };
    }

    return buttons;
}