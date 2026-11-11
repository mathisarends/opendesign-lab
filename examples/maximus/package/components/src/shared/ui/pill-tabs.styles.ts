import { css } from "lit";
import { workspaceStyles } from "@shared/styles/workspace";

export const pillTabsStyles = css`
  ${workspaceStyles}
  :host {
    display: block;
    min-width: 0;
  }
  :host([scrollable]) {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
  .navigation {
    flex: 0 0 auto;
    padding: 16px 0;
    margin-bottom: var(--tabs-content-gap, 24px);
  }
  :host([scrollable]) .navigation {
    margin-bottom: 0;
  }
  :host([scrollable]) .panels {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }
  .tabs {
    display: flex;
    gap: 4px;
    width: min(var(--tabs-content-width, 100%), calc(100% - 2 * var(--tabs-inline-gutter, 0px)));
    margin-inline: auto;
    padding-inline-start: var(--tabs-leading-space, 0px);
    overflow-x: auto;
  }
  .section-picker {
    display: none;
  }
  button {
    flex: 0 0 auto;
    min-height: 40px;
    padding: 8px 18px;
    border: 0;
    border-radius: var(--radius-pill);
    background: transparent;
    color: var(--color-muted);
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-button);
    transition:
      background var(--motion-duration-control),
      color var(--motion-duration-control);
  }
  button:hover {
    background: var(--color-panel);
    color: var(--color-text);
  }
  button[aria-selected="true"] {
    background: var(--color-selected);
    color: var(--color-text);
  }
  button:focus-visible {
    outline-offset: -3px;
  }
  :host([variant="underline"]) .navigation {
    padding-bottom: 0;
    border-bottom: 1px solid var(--color-border);
  }
  :host([variant="underline"]) .tabs {
    gap: 16px;
  }
  :host([variant="underline"]) button {
    padding-inline: 4px;
    border-bottom: 2px solid transparent;
    border-radius: 0;
    background: transparent;
  }
  :host([variant="underline"]) button[aria-selected="true"] {
    border-bottom-color: var(--color-text);
  }
  @media (max-width: 650px) {
    button {
      padding-inline: 12px;
      font-size: var(--font-size-label);
    }
  }
  @media (max-width: 800px) {
    :host([compact]) .navigation {
      padding: 8px var(--mobile-page-gutter);
      padding-inline-start: calc(var(--mobile-page-gutter) + var(--tabs-leading-space, 0px));
    }
    :host([compact]) .tabs {
      display: none;
    }
    :host([compact]) .section-picker {
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: var(--touch-target);
      font-size: var(--font-size-label);
      color: var(--color-muted);
    }
    select {
      flex: 1;
      min-width: 0;
      min-height: var(--touch-target);
      border: 1px solid var(--color-border-strong);
      border-radius: var(--radius-control);
      padding-inline: 12px;
      background: var(--color-panel);
      color: var(--color-text);
      font-size: var(--font-size-input);
    }
  }
  [role="tabpanel"][hidden] {
    display: none;
  }
  [role="tabpanel"]:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: -2px;
    border-radius: var(--radius-subtle);
  }
`;
