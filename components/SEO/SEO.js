import Head from "next/head";
import { useRouter } from "next/router";
import siteConfigData from "../../data/preBuild/siteConfig.json";

/**
 * Provide SEO related meta tags to a page.
 *
 * @param {Props} props The props object.
 * @param {string} props.title Used for the page title, og:title, twitter:title, etc.
 * @param {string} props.description Used for the meta description, og:description, twitter:description, etc.
 * @param {string} props.imageUrl Used for the og:image and twitter:image. NOTE: Must be an absolute url.
 * @param {string} props.url Used for the og:url and twitter:url.
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({ title, description, imageUrl, url, noIndex }) {
  const router = useRouter();
  const siteConfiguration = siteConfigData.data.siteSettings.siteConfiguration;
  const favicon = siteConfiguration?.favicon?.node?.sourceUrl;

  const canonicalUrl = url
    ? `${url}${router?.asPath}`
    : siteConfiguration
    ? `${siteConfiguration?.siteUrl}${router?.asPath}`
    : null;

  const seo = {
    title: `${title || siteConfiguration?.title}`,
    description: description || siteConfiguration?.description,
    image: imageUrl || siteConfiguration.openGraphImage.node.sourceUrl,
    seoCanonical: canonicalUrl,
    url: url,
  };

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={favicon || "/images/apple-touch-icon.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={favicon || "/images/apple-touch-icon.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={favicon || "/images/apple-touch-icon.png"}
        />

        {seo.title && (
          <>
            <title>{seo.title}</title>
            <meta name="title" content={seo.title} />
            <meta property="og:title" content={seo.title} />
            <meta property="twitter:title" content={seo.title} />
          </>
        )}

        {seo.description && (
          <>
            <meta name="description" content={seo.description} />
            <meta property="og:description" content={seo.description} />
            <meta property="twitter:description" content={seo.description} />
          </>
        )}

        {seo.image && (
          <>
            <meta property="og:image" content={seo.image} />
            <meta property="twitter:image" content={seo.image} />
          </>
        )}

        {seo.url && (
          <>
            <meta property="og:url" content={seo.url} />
            <meta property="twitter:url" content={seo.url} />
          </>
        )}
        {noIndex && <meta name="robots" content="noindex, nofollow"/>}
        {seo.seoCanonical && <link rel="canonical" href={seo.seoCanonical} />}
        
      </Head>
    </>
  );
}
