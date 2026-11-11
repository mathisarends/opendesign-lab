import { css } from "lit";

export const appCheckboxStyles = css`
  app-checkbox {
    display: block;
  }
  .checkbox {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: var(--color-muted);
    font-size: var(--font-size-fine-print);
    line-height: var(--line-height-relaxed);
    cursor: pointer;
  }
  .checkbox input {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    margin: 2px 0 0;
    accent-color: var(--color-accent);
  }
`;
