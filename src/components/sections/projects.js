import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
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

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  &:hover,
  &:focus-within {
    .project-inner {
      transform: translateY(-7px);
    }
  }

  .project-inner {
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
    overflow: hidden;
  }

  .project-media {
    width: calc(100% + 3.5rem);
    height: 200px;
    margin: -2rem -1.75rem 1.5rem -1.75rem;
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius) var(--border-radius) 0 0;

    img,
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    &:hover {
      img,
      video {
        transform: scale(1.05);
      }
    }

    .media-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(2, 12, 27, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: var(--transition);

      .play-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--green);
        border: none;
        color: var(--navy);
        font-size: 20px;
        cursor: pointer;
        transition: var(--transition);

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    &:hover .media-overlay {
      opacity: 1;
    }
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

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

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const [showMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  // Open Source Projects data
  const projects = [
    {
      title: 'AI Voice Assistant MCP Server',
      description:
        'A powerful Model Context Protocol (MCP) server that integrates Twilio Voice, Deepgram AI, and OpenAI to create intelligent voice-based HR automation tools. This system enables AI assistants like Claude to conduct phone interviews, deliver notifications, and manage HR communications through natural voice conversations.',
      tech: ['Node.js', 'OpenAI API', 'Twilio', 'Deepgram', 'MCP', 'AI Agents'],
      github: 'https://github.com/prakharbhardwaj/voice-agent-mcp-server',
      external: 'https://github.com/prakharbhardwaj/voice-agent-mcp-server',
      video: 'https://github.com/user-attachments/assets/6c47a8b7-7428-4711-bf26-00d5951ec66f',
    },
    {
      title: 'Browser-based AI Voice Assistant',
      description:
        'A browser-based AI voice assistant using Twilio Voice SDK v2.x with real-time conversation capabilities. Talk to an AI assistant directly through your web browser without needing phone numbers.',
      tech: ['JavaScript', 'Twilio Voice SDK', 'WebRTC', 'OpenAI API', 'AI Agents'],
      github: 'https://github.com/prakharbhardwaj/twilio-conversation-relay-webclient',
      external: 'https://github.com/prakharbhardwaj/twilio-conversation-relay-webclient',
      image: 'https://github.com/user-attachments/assets/ae2a58f7-e4f0-4b41-bf51-82614b141ea4',
    },
    {
      title: 'OpenAI WhatsApp Chatbot',
      description:
        'This WhatsApp bot uses OpenAI\'s GPT and Twilio Messaging API to respond to user inputs. The tutorial walks you through the process of integrating OpenAI API and Twilio to build chatbot that can offer personalized and engaging experiences for users.',
      tech: ['Node.js', 'OpenAI GPT', 'Twilio', 'WhatsApp API', 'Conversational AI'],
      github: 'https://github.com/prakharbhardwaj/chatgpt-whatsapp',
      external:
        'https://blog.gogroup.co/building-a-whatsapp-chatbot-that-understands-integrating-chatgpt-and-twilio-f630bc8b9d84',
      image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wEhSSVW6b_t93JSA8U6kbA.png',
    },
    {
      title: 'Twilio-Deepgram Voice Assistant',
      description:
        'This project demonstrates integrating Twilio Media Streams with Deepgram\'s Voice Agent API to create an AI-powered voice assistant. The system captures real-time audio from a Twilio call, processes it through Deepgram\'s AI to generate a response, and streams the response back to the caller.',
      tech: ['Node.js', 'Twilio Media Streams', 'Deepgram API', 'OpenAI', 'Real-time Audio'],
      github: 'https://github.com/prakharbhardwaj/twilio-deepgram-voice-assistant',
      external:
        'https://medium.com/@prakhar.bhardwaj/building-an-ai-voice-assistant-with-deepgram-voice-agent-api-and-twilio-c8dcdc77dc23',
      video: 'https://github.com/user-attachments/assets/b5f6dbe6-1c77-425a-937a-ae952ed9e3b5',
    },
  ];

  const GRID_LIMIT = 6;
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  return (
    <StyledProjectsSection id="projects">
      <h2 ref={revealTitle}>Open Source Contributions</h2>

      {/* <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        view the archive
      </Link> */}

      <ul className="projects-grid">
        <TransitionGroup component={null}>
          {projectsToShow &&
            projectsToShow.map((project, i) => {
              const { github, title, tech, description, image, video, demo } = project;

              return (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    <div className="project-inner">
                      {(image || video) && (
                        <div className="project-media">
                          {video ? (
                            <>
                              <video src={video} poster={image} muted loop preload="metadata" />
                              <div className="media-overlay">
                                <button
                                  className="play-button"
                                  onClick={() => window.open(github, '_blank')}
                                  aria-label="View Project">
                                  ▶
                                </button>
                              </div>
                            </>
                          ) : (
                            <img src={image} alt={title} />
                          )}
                        </div>
                      )}

                      <header>
                        <div className="project-top">
                          <div className="folder">
                            <Icon name="Folder" />
                          </div>
                          <div className="project-links">
                            {github && (
                              <a
                                href={github}
                                aria-label="GitHub Link"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Icon name="GitHub" />
                              </a>
                            )}
                            {demo && (
                              <a
                                href={demo}
                                aria-label="Demo Link"
                                className="external"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Icon name="External" />
                              </a>
                            )}
                          </div>
                        </div>

                        <h3 className="project-title">
                          <a href={github} target="_blank" rel="noopener noreferrer">
                            {title}
                          </a>
                        </h3>

                        <div className="project-description">{description}</div>
                      </header>

                      <footer>
                        {tech && (
                          <ul className="project-tech-list">
                            {tech.map((technology, techIndex) => (
                              <li key={techIndex}>{technology}</li>
                            ))}
                          </ul>
                        )}
                      </footer>
                    </div>
                  </StyledProject>
                </CSSTransition>
              );
            })}
        </TransitionGroup>
      </ul>

      <button
        className="more-button"
        onClick={() => {
          window.open('https://github.com/prakharbhardwaj', '_blank');
        }}>
        View More on GitHub
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;
