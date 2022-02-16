import {DialogOptions, sanitizeOptions} from "./options";
import {template, toDom} from "./template";
import bootstrap from "bootstrap";
import {ButtonCallback} from "./buttons";

export function dialog(options: DialogOptions): bootstrap.Modal {
    const finalOptions = sanitizeOptions(options),
        domElement = toDom(template.dialog);

    let modal = new bootstrap.Modal(domElement);
        modal.show();

    const callbacks: Record<string, ButtonCallback | boolean | undefined> = {
        onEscape: finalOptions.onEscape,
        onClose: finalOptions.onClose,
    };

    const { buttons, message, title } = finalOptions;

    let elements = {
        'title': domElement.getElementsByClassName('modal-title')[0],
        'body': domElement.getElementsByClassName('modal-body')[0],
        'footer': domElement.getElementsByClassName('modal-footer')[0]
    };
    if (typeof message === "string") {
        elements.body.innerHTML = message;
    }
    if (typeof title === "string") {
        elements.title.innerHTML = title;
    }

    for (const key in buttons) {
        const b = buttons[key],
            button_node = toDom(template.button);
        button_node.innerHTML = b.label;
        button_node.classList.add(b.className);
        if(b) {
            callbacks[key] = b.callback;
        }
        elements.footer.append(button_node);
    }

    console.log(finalOptions);
    return modal;
}