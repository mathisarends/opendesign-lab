import { css } from "lit";

export const scrollbarStyles = css`
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--color-scrollbar) transparent;
  }
  @supports selector(::-webkit-scrollbar) {
    * {
      scrollbar-width: auto;
      scrollbar-color: auto;
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-corner {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border: 2px solid transparent;
      border-radius: var(--radius-pill);
      background: var(--color-scrollbar);
      background-clip: padding-box;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-scrollbar-hover);
    }
    ::-webkit-scrollbar-button {
      display: none;
      width: 0;
      height: 0;
    }
  }
`;
