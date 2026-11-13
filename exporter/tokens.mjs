/**
 * Extract the token contract from a stylesheet: every `:root` rule, including
 * `:root[...]` theme variants and `:root` rules nested in at-rules such as
 * `@media (prefers-color-scheme: light)`. Other rules are left out.
 */
export function extractTokens(css) {
  const blocks = [];
  for (const rule of rules(css)) {
    if (isRoot(rule.prelude)) {
      blocks.push(rule.text);
    } else if (rule.prelude.startsWith('@') && rule.body !== null) {
      const nested = rules(rule.body).filter((inner) => isRoot(inner.prelude));
      if (nested.length) {
        const body = nested.map((inner) => indent(inner.text)).join('\n\n');
        blocks.push(`${rule.prelude} {\n${body}\n}`);
      }
    }
  }
  const tokens = new Map();
  for (const block of blocks) {
    const declarations = stripComments(block).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g);
    for (const [, name, value] of declarations) {
      if (!tokens.has(name)) {
        tokens.set(name, value.trim());
      }
    }
  }
  return { css: blocks.join('\n\n'), tokens };
}

const isRoot = (prelude) => prelude.split(',').some((part) => part.trim().startsWith(':root'));
const indent = (text) => text.replace(/^(?=.)/gm, '  ');
const stripComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '');

/** Split CSS into top-level rules, skipping comments and quoted strings. */
function rules(css) {
  const found = [];
  let start = 0;
  let depth = 0;
  let open = -1;
  for (let i = 0; i < css.length; i++) {
    const char = css[i];
    if (char === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end === -1 ? css.length : end + 1;
      if (depth === 0) {
        start = i + 1;
      }
    } else if (char === '"' || char === "'") {
      i = skipString(css, i);
    } else if (char === '{') {
      if (depth++ === 0) {
        open = i;
      }
    } else if (char === '}') {
      if (--depth === 0) {
        const prelude = css.slice(start, open).trim();
        found.push({
          prelude,
          body: css.slice(open + 1, i),
          text: `${prelude} ${css.slice(open, i + 1)}`,
        });
        start = i + 1;
      }
      depth = Math.max(depth, 0);
    } else if (char === ';' && depth === 0) {
      start = i + 1;
    }
  }
  return found;
}

function skipString(css, i) {
  const quote = css[i];
  for (let j = i + 1; j < css.length; j++) {
    if (css[j] === '\\') {
      j++;
    } else if (css[j] === quote || css[j] === '\n') {
      return j;
    }
  }
  return css.length;
}
