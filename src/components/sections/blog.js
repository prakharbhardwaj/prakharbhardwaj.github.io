import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';

const StyledBlogSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .blog-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    a {
      position: relative;
      z-index: 1;
    }
  }

  .view-more-link {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledBlogPost = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  &:hover,
  &:focus-within {
    .blog-inner {
      transform: translateY(-7px);
    }
  }

  .blog-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
  }

  .blog-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    line-height: 1.25;

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .blog-description {
    color: var(--light-slate);
    font-size: 17px;
    line-height: 1.3;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .blog-footer {
    ${({ theme }) => theme.mixins.flexBetween};
    align-items: flex-end;
    flex-grow: 1;
    width: 100%;
    margin-top: 20px;
  }

  .blog-date {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }

  .blog-platform {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }
`;

const Blog = () => {
  const revealTitle = useRef(null);
  const revealPosts = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    revealPosts.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  // Blog posts data - you can update these URLs with actual Medium article links
  const blogPosts = [
    {
      title:
        'Level Up Your AI Voice Assistant: Building an MCP Server for HR Automation with Twilio, Deepgram',
      description:
        'From Code to Conversation: Develop an HR Voice Agent MCP Server for Claude, integrating Twilio & Deepgram for intelligent automation.',
      url: 'https://medium.com/@prakhar.bhardwaj',
      date: 'Jun 2024',
      platform: 'GoGroup Tech Blog',
    },
    {
      title:
        'Build an AI Voice Assistant with Deepgram Voice Agent API and Twilio: A Step-by-Step Guide',
      description:
        'In today\'s fast-paced world, businesses and individuals increasingly rely on voice technology to improve communication and productivity.',
      url: 'https://medium.com/@prakhar.bhardwaj',
      date: 'Dec 2024',
      platform: 'GoGroup Tech Blog',
    },
    {
      title: 'Building a WhatsApp Chatbot that Understands: Integrating ChatGPT and Twilio',
      description:
        'Integrating a natural language processing (NLP) model like ChatGPT with a messaging platform like WhatsApp can help users to open up new possibilities.',
      url: 'https://medium.com/@prakhar.bhardwaj',
      date: 'Feb 2023',
      platform: 'GoGroup Tech Blog',
    },
    {
      title: 'Revolutionize your Workflow in 2023 with these 11 AI-Powered Tools',
      description:
        'AI technology has become an indispensable part of our lives. Every year, we witness the introduction of more and more AI-powered tools.',
      url: 'https://medium.com/@prakhar.bhardwaj',
      date: 'Mar 2023',
      platform: 'GoGroup Tech Blog',
    },
    {
      title: 'Advanced CI/CD Pipeline in Node.js with GitHub Actions and Slack',
      description:
        'CI and CD are two acronyms frequently used in modern development practices and DevOps. Conceptually, it is a method to frequently deliver applications.',
      url: 'https://medium.com/@prakhar.bhardwaj',
      date: 'Jun 2022',
      platform: 'GoGroup Tech Blog',
    },
  ];

  return (
    <StyledBlogSection id="blog">
      <h2 ref={revealTitle}>Technical Writing & Insights</h2>

      <ul className="blog-grid">
        {blogPosts &&
          blogPosts.map((post, i) => (
            <StyledBlogPost key={i} ref={el => (revealPosts.current[i] = el)}>
              <div className="blog-inner">
                <header>
                  <h3 className="blog-title">
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  </h3>

                  <div className="blog-description">{post.description}</div>
                </header>

                <footer className="blog-footer">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-platform">{post.platform}</span>
                </footer>
              </div>
            </StyledBlogPost>
          ))}
      </ul>

      <a
        className="view-more-link"
        href="https://medium.com/@prakhar.bhardwaj"
        target="_blank"
        rel="noopener noreferrer">
        View All Articles on Medium
      </a>
    </StyledBlogSection>
  );
};

export default Blog;
