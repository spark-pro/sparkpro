import sanitizeHtml from 'sanitize-html';

/** Allow only basic article formatting. Everything else (scripts, iframes, styles, handlers) is stripped. */
export function sanitizeContent(html: string): string {
  return sanitizeHtml(html.replace(/​/g, ''), {
    allowedTags: [
      'p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u',
      'ul', 'ol', 'li', 'a', 'blockquote', 'hr', 'code', 'pre',
      's', 'strike', 'del', 'sub', 'sup',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      p: ['style'], h2: ['style'], h3: ['style'], h4: ['style'], li: ['style'], blockquote: ['style'],
    },
    // The only inline style allowed is text alignment.
    allowedStyles: { '*': { 'text-align': [/^(left|right|center|justify)$/] } },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
    transformTags: {
      h1: 'h2',
      div: 'p',
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: '_blank', rel: 'noopener noreferrer nofollow' },
      }),
    },
    // Drop empty paragraphs that contenteditable tends to leave behind
    exclusiveFilter: (frame) => frame.tag === 'p' && !frame.text.trim() && !frame.mediaChildren.length,
  });
}

/** Plain text of the (sanitized) content, used for excerpts, emptiness checks and meta descriptions. */
export function toPlainText(html: string): string {
  return sanitizeHtml(html.replace(/​/g, ''), { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function makeExcerpt(html: string, max = 180): string {
  const text = toPlainText(html);
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

export function slugify(title: string): string {
  const slug = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
    .replace(/-+$/g, '');
  return slug || 'insight';
}

/**
 * Job descriptions created before the rich-text editor are plain text. Convert those to simple
 * paragraphs; anything that already contains HTML is sanitized with the same allow-list.
 */
export function normalizeDescription(value: string): string {
  if (/<\/?[a-z][\s\S]*>/i.test(value)) return sanitizeContent(value);
  const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return value
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
}
