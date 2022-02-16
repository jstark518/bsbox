export const template = {
    dialog: `<div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>`,
    button: `<button type="button" class="btn"></button>`,
};

export function toDom(html: string): Element {
    let temp = document.createElement("div");
    temp.innerHTML = html;
    document.body.append(temp);
    return temp.firstChild as Element;
}