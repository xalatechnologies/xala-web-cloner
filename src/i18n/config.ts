import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          nav: {
            home: 'Home',
            about: 'About',
            coreProducts: 'Core Products',
            technologies: 'Technologies',
            workProcess: 'Work Process',
            caseStudies: 'Case Studies',
            team: 'Team',
            contact: 'Contact'
          },
          hero: {
            welcome: 'Welcome to the Future of Technology',
            title: 'Building Digital',
            excellence: 'Excellence',
            description: 'We create innovative software solutions that drive business growth and transform ideas into reality. Leveraging cutting-edge technology to build tomorrow\'s digital landscape.',
            getInTouch: 'Get in touch',
            ourProcess: 'Our Process',
            aboutUs: 'About us',
            features: {
              aiSolutions: 'AI Solutions',
              aiDesc: 'Intelligent systems for smarter decisions',
              cloudIntegration: 'Cloud Integration',
              cloudDesc: 'Scalable cloud infrastructure solutions',
              customDev: 'Custom Development',
              customDevDesc: 'Tailored applications for your needs',
              dataAnalytics: 'Data Analytics',
              dataDesc: 'Transform data into insights'
            }
          },
          about: {
            title: "Shaping Tomorrow's Technology",
            description: "We're not just building software; we're crafting digital experiences that define the future. Our passion for innovation drives us to create solutions that empower businesses in the digital age.",
            features: {
              innovation: {
                title: "Innovation First",
                description: "Pioneering solutions that push the boundaries of what's possible in technology"
              },
              future: {
                title: "Future-Ready",
                description: "Building scalable systems that evolve with your business needs"
              },
              client: {
                title: "Client-Centric",
                description: "Your success is our priority - we transform ideas into impactful solutions"
              },
              technical: {
                title: "Technical Excellence",
                description: "Leveraging cutting-edge technologies to deliver robust solutions"
              }
            },
            vision: {
              title: "Our Vision",
              description: "To be at the forefront of technological innovation, creating solutions that not only meet today's challenges but anticipate tomorrow's needs. We believe in technology that empowers, connects, and transforms businesses for the digital future."
            }
          },
          caseStudies: {
            title: "Case Studies",
            description: "Explore how our innovative solutions have transformed businesses and redefined possibilities",
            readMore: "Read Case Study",
            cases: {
              ai: {
                title: "AI-Driven Analytics Platform",
                description: "Developed a cutting-edge analytics platform using machine learning algorithms that increased client efficiency by 300%",
                metrics: "300% Efficiency Increase"
              },
              neural: {
                title: "Neural Network Integration",
                description: "Implemented advanced neural networks for real-time data processing, reducing response time by 85%",
                metrics: "85% Faster Processing"
              },
              quantum: {
                title: "Quantum Computing Solution",
                description: "Pioneered quantum computing applications for complex calculations, achieving unprecedented accuracy rates",
                metrics: "99.9% Accuracy Rate"
              }
            }
          },
          contact: {
            title: "Let's Build Something Amazing",
            description: "Ready to transform your ideas into reality? Get in touch with our team of experts.",
            form: {
              name: "Your Name",
              email: "Your Email",
              subject: "Subject",
              message: "Share your thoughts, project ideas, or specific requirements... We're excited to hear from you!",
              send: "Send Message"
            }
          },
          footer: {
            rights: "All rights reserved.",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            cookies: "Cookie Policy"
          },
          coreProducts: {
            doctorAI: {
              title: "DoctorAI.no",
              description: "AI-powered medical consultation platform that helps healthcare professionals make more informed decisions and improve patient care.",
              metrics: "10,000+ Consultations"
            },
            fylleUt: {
              title: "FylleUt.no",
              description: "Advanced AI-driven form builder that simplifies document creation and automation, making form filling effortless and intelligent.",
              metrics: "50,000+ Forms Generated"
            },
            prinsipro: {
              title: "Prinsipro",
              description: "AI-powered architecture principles management system that streamlines design decisions and ensures consistency across projects.",
              metrics: "1,000+ Projects Managed"
            }
          },
          technologies: {
            title: "Technologies & Tools",
            description: "We leverage cutting-edge technologies and industry-standard tools to deliver exceptional solutions",
            frontend: {
              title: "Frontend Development",
              tools: ["React", "TypeScript", "Tailwind CSS"]
            },
            backend: {
              title: "Backend Solutions",
              tools: ["Node.js", "RESTful APIs", "GraphQL"]
            },
            ai: {
              title: "AI Solutions",
              tools: ["GPT-4", "LangChain", "Eleven Labs"]
            },
            uiux: {
              title: "UI/UX Design",
              tools: ["Figma", "Adobe XD", "Sketch"]
            },
            devops: {
              title: "DevOps",
              tools: ["Docker", "Kubernetes", "CI/CD"]
            },
            design: {
              title: "Design Systems",
              tools: ["Material UI", "Shadcn/UI", "Storybook"]
            }
          },
          workProcess: {
            title: "Our Work Process Model",
            description: "A streamlined approach to delivering exceptional results",
            discovery: {
              title: "Discovery Call",
              description: "Initial consultation to understand your vision and requirements"
            },
            design: {
              title: "Design Process",
              description: "Creating intuitive and engaging user experiences"
            },
            development: {
              title: "Development",
              description: "Building robust and scalable solutions"
            },
            testing: {
              title: "Testing Process",
              description: "Ensuring quality and performance"
            },
            deployment: {
              title: "Deployment",
              description: "Launching your solution to the world"
            },
            support: {
              title: "Support",
              description: "Ongoing maintenance and assistance"
            }
          },
          team: {
            title: "Meet Our Team",
            description: "Our exceptional team of innovators and problem solvers is dedicated to transforming ideas into powerful solutions.",
            members: {
              ibrahim: {
                name: "Ibrahim Rahmani",
                role: "Senior Developer",
                description: "Full-stack Developer | Microsoft Certified | MSc in Information Systems with extensive experience in system development, software architecture, and implementing scalable solutions for complex business needs."
              },
              wahid: {
                name: "Wahid Rahmani",
                role: "Developer",
                description: "Master's in Informatics | Experienced Software Engineer with expertise in Machine Learning, Cloud Computing, IT Management, and developing innovative, scalable software solutions for diverse industries."
              },
              hamid: {
                name: "Hamid Rahmani",
                role: "Project Manager",
                description: "Experienced Project Manager | Master's degree in Computer Science with expertise in project management, system development, and digital transformation."
              },
              muhammad: {
                name: "Muhammad Nadeem",
                role: "Fullstack Developer",
                description: "Master in Applied Computer Science | Full-stack Consultant with focus on C#, Web, React, and Data Analysis"
              },
              ibtissam: {
                name: "Ibtissam Ezzaheri",
                role: "UI/UX Designer",
                description: "Experienced UI/UX Designer | Specialist in user experience and interface design, focused on creating intuitive, functional, and aesthetically pleasing solutions that enhance user engagement and efficiency."
              },
              helena: {
                name: "Helena Grønvold",
                role: "Advisor",
                description: "Experienced Advisor | Specialist in strategic guidance and problem-solving, focused on providing tailored advice and solutions that help businesses achieve their goals and improve efficiency."
              }
            }
          }
        }
      },
      no: {
        translation: {
          nav: {
            home: 'Hjem',
            about: 'Om oss',
            coreProducts: 'Kjerneprodukter',
            technologies: 'Teknologier',
            workProcess: 'Arbeidsprosess',
            caseStudies: 'Casestudier',
            team: 'Team',
            contact: 'Kontakt'
          },
          hero: {
            welcome: 'Velkommen til fremtidens teknologi',
            title: 'Bygger Digital',
            excellence: 'Ekspertise',
            description: 'Vi skaper innovative programvareløsninger som driver forretningsvekst og transformerer ideer til virkelighet. Vi utnytter banebrytende teknologi for å bygge morgendagens digitale landskap.',
            getInTouch: 'Ta kontakt',
            ourProcess: 'Vår prosess',
            aboutUs: 'Om oss',
            features: {
              aiSolutions: 'AI-løsninger',
              aiDesc: 'Intelligente systemer for smartere beslutninger',
              cloudIntegration: 'Sky-integrasjon',
              cloudDesc: 'Skalerbare skyinfrastrukturløsninger',
              customDev: 'Tilpasset utvikling',
              customDevDesc: 'Skreddersydde applikasjoner for dine behov',
              dataAnalytics: 'Dataanalyse',
              dataDesc: 'Transformer data til innsikt'
            }
          },
          about: {
            title: "Former morgendagens teknologi",
            description: "Vi bygger ikke bare programvare; vi skaper digitale opplevelser som definerer fremtiden. Vår lidenskap for innovasjon driver oss til å skape løsninger som styrker bedrifter i den digitale tidsalderen.",
            features: {
              innovation: {
                title: "Innovasjon først",
                description: "Banebrytende løsninger som presser grensene for hva som er mulig innen teknologi"
              },
              future: {
                title: "Fremtidsklar",
                description: "Bygger skalerbare systemer som utvikler seg med dine forretningsbehov"
              },
              client: {
                title: "Klientfokusert",
                description: "Din suksess er vår prioritet - vi transformerer ideer til virkningsfulle løsninger"
              },
              technical: {
                title: "Teknisk ekspertise",
                description: "Utnytter banebrytende teknologier for å levere robuste løsninger"
              }
            },
            vision: {
              title: "Vår visjon",
              description: "Å være i forkant av teknologisk innovasjon, skape løsninger som ikke bare møter dagens utfordringer, men forutser morgendagens behov. Vi tror på teknologi som styrker, forbinder og transformerer virksomheter for den digitale fremtiden."
            }
          },
          caseStudies: {
            title: "Casestudier",
            description: "Utforsk hvordan våre innovative løsninger har transformert virksomheter og redefinert muligheter",
            readMore: "Les casestudie",
            cases: {
              ai: {
                title: "AI-drevet analyseplattform",
                description: "Utviklet en banebrytende analyseplattform ved hjelp av maskinlæringsalgoritmer som økte klienteffektiviteten med 300%",
                metrics: "300% effektivitetsøkning"
              },
              neural: {
                title: "Nevrale nettverk-integrasjon",
                description: "Implementerte avanserte nevrale nettverk for sanntids databehandling, reduserte responstiden med 85%",
                metrics: "85% raskere behandling"
              },
              quantum: {
                title: "Kvantedataløsning",
                description: "Pionerte kvantedataapplikasjoner for komplekse beregninger, oppnådde enestående nøyaktighetsgrad",
                metrics: "99.9% nøyaktighetsgrad"
              }
            }
          },
          contact: {
            title: "La oss bygge noe fantastisk",
            description: "Klar for å transformere ideene dine til virkelighet? Ta kontakt med vårt ekspertteam.",
            form: {
              name: "Ditt navn",
              email: "Din e-post",
              subject: "Emne",
              message: "Del dine tanker, prosjektideer eller spesifikke krav... Vi er spent på å høre fra deg!",
              send: "Send melding"
            }
          },
          footer: {
            rights: "Alle rettigheter reservert.",
            privacy: "Personvernpolicy",
            terms: "Brukervilkår",
            cookies: "Cookie-policy"
          },
          coreProducts: {
            doctorAI: {
              title: "DoctorAI.no",
              description: "AI-drevet medisinsk konsultasjonsplattform som hjelper helsepersonell med å ta mer informerte beslutninger og forbedre pasientbehandlingen.",
              metrics: "10,000+ Konsultasjoner"
            },
            fylleUt: {
              title: "FylleUt.no",
              description: "Avansert AI-drevet skjemabygger som forenkler dokumentoppretting og automatisering, og gjør skjemautfylling enkelt og intelligent.",
              metrics: "50,000+ Skjemaer Generert"
            },
            prinsipro: {
              title: "Prinsipro",
              description: "AI-drevet arkitekturprinsippstyringssystem som strømlinjeformer designbeslutninger og sikrer konsistens på tvers av prosjekter.",
              metrics: "1,000+ Prosjekter Håndtert"
            }
          },
          technologies: {
            title: "Teknologier og Verktøy",
            description: "Vi bruker banebrytende teknologier og bransjestandardverktøy for å levere eksepsjonelle løsninger",
            frontend: {
              title: "Frontend-utvikling",
              tools: ["React", "TypeScript", "Tailwind CSS"]
            },
            backend: {
              title: "Backend-løsninger",
              tools: ["Node.js", "RESTful APIs", "GraphQL"]
            },
            ai: {
              title: "AI-løsninger",
              tools: ["GPT-4", "LangChain", "Eleven Labs"]
            },
            uiux: {
              title: "UI/UX Design",
              tools: ["Figma", "Adobe XD", "Sketch"]
            },
            devops: {
              title: "DevOps",
              tools: ["Docker", "Kubernetes", "CI/CD"]
            },
            design: {
              title: "Designsystemer",
              tools: ["Material UI", "Shadcn/UI", "Storybook"]
            }
          },
          workProcess: {
            title: "Vår Arbeidsprosessmodell",
            description: "En strømlinjeformet tilnærming til å levere eksepsjonelle resultater",
            discovery: {
              title: "Oppdagelsessamtale",
              description: "Innledende konsultasjon for å forstå din visjon og krav"
            },
            design: {
              title: "Designprosess",
              description: "Skaper intuitive og engasjerende brukeropplevelser"
            },
            development: {
              title: "Utvikling",
              description: "Bygger robuste og skalerbare løsninger"
            },
            testing: {
              title: "Testingprosess",
              description: "Sikrer kvalitet og ytelse"
            },
            deployment: {
              title: "Implementering",
              description: "Lanserer din løsning til verden"
            },
            support: {
              title: "Support",
              description: "Løpende vedlikehold og assistanse"
            }
          },
          team: {
            title: "Møt Vårt Team",
            description: "Vårt eksepsjonelle team av innovatører og problemløsere er dedikert til å transformere ideer til kraftfulle løsninger.",
            members: {
              ibrahim: {
                name: "Ibrahim Rahmani",
                role: "Senior Utvikler",
                description: "Fullstack-utvikler | Microsoft-sertifisert | MSc i informasjonssystemer med omfattende erfaring innen systemutvikling, programvarearkitektur og implementering av skalerbare løsninger for komplekse forretningsbehov."
              },
              wahid: {
                name: "Wahid Rahmani",
                role: "Utvikler",
                description: "Master i informatikk | Erfaren programvareingeniør med ekspertise innen maskinlæring, cloud computing, IT-ledelse og utvikling av innovative, skalerbare programvareløsninger for ulike bransjer."
              },
              hamid: {
                name: "Hamid Rahmani",
                role: "Prosjektleder",
                description: "Erfaren prosjektleder | Mastergrad i informatikk med ekspertise innen prosjektledelse, systemutvikling og digital transformasjon."
              },
              muhammad: {
                name: "Muhammad Nadeem",
                role: "Fullstack Utvikler",
                description: "Master i anvendt informatikk | Fullstack-konsulent med fokus på C#, Web, React og dataanalyse"
              },
              ibtissam: {
                name: "Ibtissam Ezzaheri",
                role: "UI/UX Designer",
                description: "Erfaren UI/UX-designer | Spesialist på brukeropplevelse og grensesnittdesign, fokusert på å skape intuitive, funksjonelle og estetisk tiltalende løsninger som forbedrer brukerengasjement og effektivitet."
              },
              helena: {
                name: "Helena Grønvold",
                role: "Rådgiver",
                description: "Erfaren rådgiver | Spesialist på strategisk veiledning og problemløsning, fokusert på å gi skreddersydde råd og løsninger som hjelper virksomheter med å nå sine mål og forbedre effektiviteten."
              }
            }
          }
        }
      }
    },
    detection: {
      order: ['navigator']
    }
  });

export default i18n;
