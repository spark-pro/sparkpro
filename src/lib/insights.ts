import sanitizeHtml from 'sanitize-html';

/** Allow only basic article formatting. Everything else (scripts, iframes, styles, handlers) is stripped. */
export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u',
      'ul', 'ol', 'li', 'a', 'blockquote', 'hr', 'code', 'pre',
    ],
    allowedAttributes: { a: ['href', 'title', 'target', 'rel'] },
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
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
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
