import { css, html, LitElement, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { icon } from "./icons";

@customElement("cta-button")
export class CtaButton extends LitElement {
  @property() label = "";
  @property() type: "submit" | "button" = "submit";
  @property({ type: Boolean }) disabled = false;

  protected createRenderRoot(): HTMLElement {
    return this;
  }

  render(): TemplateResult<1> {
    return html`<button class="button primary cta" type=${this.type} ?disabled=${this.disabled}>
      <span>${this.label}</span>${icon("arrow")}
    </button>`;
  }
}

export const ctaButtonStyles = css`
  cta-button {
    display: block;
  }
  .cta {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    width: 100%;
  }
  .cta span {
    grid-column: 2;
  }
  .cta svg {
    grid-column: 3;
    justify-self: end;
  }
`;
