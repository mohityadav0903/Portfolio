import { personJsonLd, webSiteJsonLd } from "@/lib/site";

export function JsonLd() {
  const schemas = [personJsonLd(), webSiteJsonLd()];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
