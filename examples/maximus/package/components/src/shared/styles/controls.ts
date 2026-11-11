import { css } from "lit";

export const controls = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  button,
  input,
  textarea,
  select {
    font: inherit;
    letter-spacing: inherit;
  }
  button,
  a,
  input {
    -webkit-tap-highlight-color: transparent;
  }
  button {
    cursor: pointer;
  }
  button:disabled {
    cursor: wait;
    opacity: 0.6;
  }
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  summary:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
  }
  a {
    color: var(--color-accent);
    text-underline-offset: 4px;
  }
  .button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    min-height: 48px;
    padding: 12px 20px;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--color-panel);
    color: var(--color-text);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-button);
    text-decoration: none;
    transition:
      background var(--motion-duration-control),
      transform var(--motion-duration-control);
  }
  .button:hover:not(:disabled) {
    background: var(--color-panel-hover);
  }
  .button.primary {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }
  .button.primary:hover:not(:disabled) {
    background: var(--color-accent-hover);
    transform: translateY(-1px);
  }
  .text-button {
    padding: 4px 0;
    border: 0;
    background: none;
    color: var(--color-accent);
    font-size: var(--font-size-caption);
  }
  .text-button:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .eyebrow {
    color: var(--color-accent);
    font-family: var(--font-mono);
    font-size: var(--font-size-eyebrow);
    letter-spacing: var(--letter-spacing-eyebrow);
    font-weight: var(--font-weight-heading);
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;
