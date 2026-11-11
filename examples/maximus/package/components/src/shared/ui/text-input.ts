import { css, html, LitElement, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { icon, type IconName } from "./icons";
import { uiText } from "./messages";

export type InputType = "text" | "email" | "password" | "search" | "tel" | "url";
export type Autocomplete =
  "off" | "name" | "email" | "username" | "current-password" | "new-password";

@customElement("text-input")
export class TextInput extends LitElement {
  @property() label = "";
  @property() name = "";
  @property() value = "";
  @property() icon?: IconName;
  @property() type: InputType = "text";
  @property() autocomplete?: Autocomplete;
  @property() prefix = "";
  @property() placeholder = "";
  @property() pattern?: string;
  @property() patternMessage = "";
  @property() hint = "";
  @property({ type: Boolean }) required = false;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) maxlength?: number;
  @property({ type: Boolean, attribute: "no-autocorrect" }) noAutocorrect = false;
  @state() private errorVisible = false;
  @query(".input", true) private input!: HTMLInputElement;
  protected readonly blankIsMissing: boolean = true;

  private get error(): string {
    return this.errorVisible ? this.validationMessage() : "";
  }

  private get describedBy(): string | undefined {
    if (this.error) {
      return `${this.name}-error`;
    }
    return this.hint ? `${this.name}-hint` : undefined;
  }

  protected createRenderRoot(): HTMLElement {
    return this;
  }

  protected updated(changed: PropertyValues<this>): void {
    const constraints = ["value", "type", "required", "minlength", "maxlength", "pattern"] as const;
    if (!constraints.some((name) => changed.has(name))) {
      return;
    }
    this.syncValidity();
    if (this.errorVisible) {
      this.errorVisible = !this.input.validity.valid;
    }
  }

  private validationMessage(): string {
    const { validity, value } = this.input;
    if (validity.valueMissing || (this.required && this.blankIsMissing && !value.trim())) {
      return uiText.validation.required;
    }
    if (validity.typeMismatch && this.type === "email") {
      return uiText.validation.email;
    }
    if (this.minlength && value.length < this.minlength) {
      return uiText.validation.tooShort({
        min: this.minlength,
        length: value.length,
      });
    }
    if (validity.patternMismatch) {
      return this.patternMessage || uiText.validation.invalid;
    }
    return validity.typeMismatch ? uiText.validation.invalid : "";
  }

  private syncValidity(): void {
    this.input.setCustomValidity("");
    this.input.setCustomValidity(this.validationMessage());
  }

  private showValidity(): void {
    this.syncValidity();
    this.errorVisible = !this.input.validity.valid;
  }

  private blurred(): void {
    if (this.input.value || this.errorVisible) {
      this.showValidity();
    }
  }

  private changed(): void {
    this.value = this.input.value;
    this.dispatchEvent(
      new CustomEvent<string>("value-change", {
        detail: this.value,
        bubbles: true,
        composed: true,
      }),
    );
    this.syncValidity();
    if (this.errorVisible) {
      this.errorVisible = !this.input.validity.valid;
    }
  }

  protected renderLabel(): TemplateResult<1> {
    return html`<label for=${this.name}>${this.label}</label>`;
  }

  protected renderInput(type: InputType = this.type): TemplateResult<1> {
    return html`<input
      class="input"
      id=${this.name}
      name=${this.name}
      type=${type}
      .value=${live(this.value)}
      autocomplete=${ifDefined(this.autocomplete)}
      autocapitalize=${ifDefined(this.noAutocorrect ? "none" : undefined)}
      spellcheck=${ifDefined(this.noAutocorrect ? "false" : undefined)}
      placeholder=${this.placeholder}
      pattern=${ifDefined(this.pattern)}
      ?required=${this.required}
      minlength=${ifDefined(this.minlength)}
      maxlength=${ifDefined(this.maxlength)}
      aria-describedby=${ifDefined(this.describedBy)}
      aria-invalid=${ifDefined(this.error ? "true" : undefined)}
      @blur=${this.blurred}
      @invalid=${this.showValidity}
      @input=${this.changed}
    />`;
  }

  protected renderTrailing(): TemplateResult<1> | typeof nothing {
    return nothing;
  }

  private renderIcon(): TemplateResult<1> | typeof nothing {
    if (!this.icon) {
      return nothing;
    }
    return html`<span class="field-icon">${icon(this.icon, 16)}</span>`;
  }

  private renderMessage(): TemplateResult<1> | typeof nothing {
    const error = this.error;
    if (error) {
      return html`<p id="${this.name}-error" class="hint error">${error}</p>`;
    }
    return this.hint ? html`<p id="${this.name}-hint" class="hint">${this.hint}</p>` : nothing;
  }

  private renderPrefix(): TemplateResult<1> | typeof nothing {
    if (!this.prefix) {
      return nothing;
    }
    return html`<span class="field-prefix" aria-hidden="true">${this.prefix}</span>`;
  }

  render(): TemplateResult<1> {
    const prefixWidth = `--input-prefix-width:${this.prefix.length}ch`;
    const fieldClass = `field ${this.icon ? "has-icon" : ""} ${this.prefix ? "has-prefix" : ""}`;
    return html`${this.renderLabel()}
      <div class=${fieldClass} style=${prefixWidth}>
        ${this.renderInput()}${this.renderIcon()}${this.renderPrefix()}${this.renderTrailing()}
      </div>
      ${this.renderMessage()}`;
  }
}

export const textInputStyles = css`
  text-input,
  password-input {
    display: grid;
    gap: 8px;
    font-size: var(--font-size-label);
  }
  .field {
    --input-leading-space: 14px;
    position: relative;
  }
  .input {
    width: 100%;
    height: var(--input-height, 48px);
    padding: 0 14px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-control);
    background: var(--color-sidebar);
    color: var(--color-text);
    font-size: var(--font-size-label);
    transition:
      border-color var(--motion-duration-control),
      background var(--motion-duration-control);
  }
  .has-icon {
    --input-leading-space: 42px;
  }
  .has-prefix .input {
    padding-left: calc(var(--input-leading-space) + var(--input-prefix-width));
  }
  .field-prefix {
    position: absolute;
    top: 50%;
    left: var(--input-leading-space);
    transform: translateY(-50%);
    color: var(--color-muted);
    pointer-events: none;
  }
  .has-icon:not(.has-prefix) .input {
    padding-left: 42px;
  }
  .field-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    display: grid;
    color: var(--color-muted);
    transform: translateY(-50%);
    pointer-events: none;
    transition: color var(--motion-duration-control);
  }
  .input:hover {
    border-color: var(--color-muted);
  }
  .input:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-soft);
    background: var(--color-panel);
  }
  .input:focus ~ .field-icon {
    color: var(--color-accent);
  }
  .input::placeholder {
    color: var(--color-muted);
    opacity: 0.7;
  }
  .input:user-invalid,
  .input[aria-invalid="true"] {
    border-color: var(--color-error);
  }
  .hint {
    margin: 0;
    color: var(--color-muted);
    font-size: var(--font-size-fine-print);
    line-height: var(--line-height-relaxed);
  }
  .hint.error {
    color: var(--color-error);
  }
`;
