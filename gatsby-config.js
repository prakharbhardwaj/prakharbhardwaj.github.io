const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: 'Prakhar Prakash Bhardwaj - Principal Software Engineer at GoGroup (Zennify Europe)',
    description: `Principal Software Engineer at GoGroup (Zennify Europe) specializing in full-stack development, backend architecture, and team leadership. Expert in Node.js, MongoDB, React, and modern web technologies. Passionate about building scalable solutions and mentoring developers.`,
    siteUrl: 'https://www.prakharbhardwaj.com',
    image: '/og.png',
    twitterUsername: '@holaprakhar',
    author: {
      name: 'Prakhar Prakash Bhardwaj',
      bio: 'Principal Software Engineer at GoGroup with expertise in full-stack development, system architecture, and technical leadership.',
      location: 'Europe',
      company: 'GoGroup (Zennify Europe)',
      position: 'Principal Software Engineer',
      skills: [
        'Node.js',
        'MongoDB',
        'React',
        'JavaScript',
        'TypeScript',
        'AWS',
        'System Architecture',
      ],
      linkedin: 'https://www.linkedin.com/in/prakharbhardwajin/',
      github: 'https://github.com/prakharbhardwaj',
    },
    keywords: [
      'Prakhar Bhardwaj',
      'Principal Software Engineer',
      'Full Stack Developer',
      'Backend Engineer',
      'Node.js Developer',
      'React Developer',
      'MongoDB Expert',
      'Technical Lead',
      'Software Architecture',
      'GoGroup',
      'Zennify Europe',
      'JavaScript',
      'TypeScript',
      'AWS',
      'System Design',
      'Team Leadership',
      'Software Engineering',
      'Web Development',
    ],
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: ['/preview/*', '/private/*', '/dev-404-page/', '/404/', '/404.html'],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: 'https://www.prakharbhardwaj.com',
        sitemap: 'https://www.prakharbhardwaj.com/sitemap-index.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/preview/', '/private/'],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          'G-R8WVCLGYGM', // Your Google Analytics tracking ID
        ],
        pluginConfig: {
          head: false,
          respectDNT: true,
          exclude: ['/preview/**', '/do-not-track/me/too/'],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'PrakharPrakashBhardwaj',
        short_name: 'PrakharBhardwaj',
        start_url: '/',
        background_color: config.colors.darkNavy,
        theme_color: config.colors.navy,
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
        icons: [
          {
            src: 'images/favicons/android-icon-36x36.png',
            sizes: '36x36',
            type: 'image/png',
          },
          {
            src: 'images/favicons/android-icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'images/favicons/android-icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'images/favicons/android-icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'images/favicons/android-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'images/favicons/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
            },
          },
          {
            resolve: 'gatsby-remark-code-titles',
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
  ],
};
