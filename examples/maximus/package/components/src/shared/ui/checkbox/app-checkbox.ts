import { html, LitElement, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-checkbox")
export class AppCheckbox extends LitElement {
  @property() label = "";
  @property() name = "";
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) checked = false;

  protected createRenderRoot(): HTMLElement {
    return this;
  }

  render(): TemplateResult<1> {
    return html`<label class="checkbox"
      ><input
        type="checkbox"
        name=${this.name}
        ?required=${this.required}
        ?disabled=${this.disabled}
        .checked=${this.checked}
        @change=${(event: Event) => (this.checked = (event.target as HTMLInputElement).checked)}
      /><span>${this.label}</span></label
    >`;
  }
}
