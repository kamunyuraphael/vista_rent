// Renders a <script type="application/ld+json"> tag. `data` must be
// controlled/trusted content (never raw user input) since it's serialized
// directly into the page.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
