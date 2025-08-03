import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title, description, image, article = false, pathname, pageType = 'website' }) => {
  // Use the provided pathname or default to root
  const currentPath = pathname || '/';

  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          siteUrl
          defaultImage: image
          twitterUsername
          author {
            name
            bio
            location
            company
            position
            skills
            linkedin
            github
          }
          keywords
        }
      }
    }
  `);

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
    author,
    keywords,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${currentPath}`,
  };

  // JSON-LD structured data for better SEO
  const generateStructuredData = () => {
    const basePersonData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: author.name,
      jobTitle: author.position,
      worksFor: {
        '@type': 'Organization',
        name: author.company,
      },
      description: author.bio,
      address: {
        '@type': 'PostalAddress',
        addressRegion: author.location,
      },
      url: siteUrl,
      sameAs: [
        author.linkedin,
        author.github,
        `https://twitter.com/${twitterUsername.replace('@', '')}`,
      ],
      knowsAbout: author.skills,
      alumniOf: 'Software Engineering',
      image: seo.image,
    };

    const baseWebsiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: defaultTitle,
      description: defaultDescription,
      url: siteUrl,
      author: {
        '@type': 'Person',
        name: author.name,
      },
      inLanguage: 'en-US',
      copyrightHolder: {
        '@type': 'Person',
        name: author.name,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/?s={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    // Add breadcrumb data for non-home pages
    const breadcrumbData =
      currentPath !== '/'
        ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: title || 'Page',
              item: seo.url,
            },
          ],
        }
        : null;

    // Professional profile data for about/home pages
    const professionalProfileData =
      pageType === 'profile' || currentPath === '/'
        ? {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: basePersonData,
          about: basePersonData,
          url: seo.url,
          name: seo.title,
          description: seo.description,
        }
        : null;

    return {
      person: basePersonData,
      website: baseWebsiteData,
      breadcrumb: breadcrumbData,
      profile: professionalProfileData,
    };
  };

  const structuredData = generateStructuredData();

  return (
    <Helmet
      title={title}
      defaultTitle={seo.title}
      titleTemplate={title ? `%s | ${author.name}` : undefined}>
      <html lang="en" />

      {/* Basic Meta Tags */}
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="author" content={author.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0a192f" />

      {/* Enhanced Keywords */}
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Page-specific meta tags */}
      {currentPath === '/' && [
        <meta key="subject" name="subject" content="Software Engineering Portfolio" />,
        <meta key="category" name="category" content="Portfolio" />,
        <meta key="coverage" name="coverage" content="Worldwide" />,
        <meta key="distribution" name="distribution" content="Global" />,
        <meta key="rating" name="rating" content="General" />,
      ]}

      {/* Performance and Technical SEO */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Mobile and PWA optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />

      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

      {/* Robots and Indexing */}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content={author.name} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />

      {/* Additional Open Graph tags for professional profile */}
      <meta property="profile:first_name" content="Prakhar" />
      <meta property="profile:last_name" content="Bhardwaj" />
      <meta property="profile:username" content="prakharbhardwaj" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={`${author.name} - ${author.position}`} />
      <meta name="twitter:domain" content="prakharbhardwaj.com" />

      {/* LinkedIn specific tags */}
      <meta property="article:author" content={author.linkedin} />
      <meta property="article:publisher" content={author.linkedin} />

      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content={author.name} />
      <meta name="apple-mobile-web-app-title" content={author.name} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Professional Profile Meta Tags */}
      <meta name="profile:first_name" content="Prakhar" />
      <meta name="profile:last_name" content="Bhardwaj" />
      <meta name="profile:job_title" content={author.position} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.website) }}
      />
      {structuredData.breadcrumb && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.breadcrumb) }}
        />
      )}
      {structuredData.profile && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.profile) }}
        />
      )}
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
  pathname: PropTypes.string,
  pageType: PropTypes.string,
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
  pathname: null,
  pageType: 'website',
};
