import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'no',
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
            info: {
              phone: {
                title: "Phone",
                description: "Give us a call"
              },
              email: {
                title: "Email",
                description: "Write to us"
              }
            },
            form: {
              name: "Your Name",
              email: "Email Address",
              subject: "Subject",
              message: "Your Message",
              status: {
                send: "Send Message",
                sending: "Sending..."
              },
              validation: {
                name_min: "Name must be at least {{minimum}} characters",
                email_invalid: "Please enter a valid email address",
                subject_min: "Subject must be at least {{minimum}} characters",
                message_min: "Message must be at least {{minimum}} characters",
                captcha_required: "Please complete the captcha verification"
              },
              success: {
                title: "Message Sent",
                description: "Thank you for your message. We will get back to you soon!"
              },
              error: {
                title: "Error",
                description: "There was a problem sending your message. Please try again."
              }
            }
          },
          footer: {
            rights: "All rights reserved.",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            cookies: "Cookie Policy"
          },
          coreProducts: {
            title: "Our Products",
            description: "Innovative AI-powered solutions transforming healthcare, documentation, and architecture",
            learnMore: "Learn More",
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
          clients: {
            title: "Our Clients",
            description: "Partnering with industry leaders to drive innovation and create impactful solutions."
          },
          common: {
            goBack: "Go Back",
            tryAgain: "Try Again",
            goHome: "Go Home"
          },
          error: {
            oops: "Oops!",
            somethingWentWrong: "Something went wrong",
            pageNotFound: "Page Not Found",
            pageNotFoundDescription: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
          },
          cookies: {
            title: "Cookie-policy",
          },
          privacy: {
            title: "Privacy-policy",
          },
          terms: {
            title: "Terms-of-Service",
          },
          lastUpdated: "last-updated",
          business: {
            hero: {
              title: "We Use Technology to Create Digital Transformation",
              subtitle: "Your Strategic Technology Partner",
              description: "We don't just build software - we create measurable business transformation. Our expertise turns complex challenges into competitive advantages.",
              cta: {
                primary: "Explore Business Solutions",
                secondary: "Schedule Consultation"
              },
              value: {
                partnership: "Strategic Partnership",
                transformation: "Digital Transformation",
                results: "Measurable Results",
                innovation: "Innovation Leadership"
              }
            },
            navigation: {
              challenge: "What Business Challenge Can We Solve for You?",
              solutions: "Business Solutions",
              outcomes: "Success Stories",
              partnership: "Partnership Approach",
              consultation: "Free Consultation"
            },
            services: {
              digitalTransformation: {
                title: "Digital Transformation",
                challenge: "Legacy systems limiting business growth and efficiency",
                outcome: "Modernized infrastructure enabling rapid scaling and improved customer experience",
                approach: "Strategic technology roadmap with measurable business impact",
                timeline: "3-8 months for complete transformation",
                investment: "Starting from 500,000 NOK"
              },
              aiAutomation: {
                title: "AI & Intelligent Automation",
                challenge: "Manual processes consuming resources and creating bottlenecks",
                outcome: "Automated workflows reducing operational costs and improving accuracy",
                approach: "Custom AI solutions integrated with existing business processes",
                timeline: "2-6 months for full automation implementation",
                investment: "Starting from 200,000 NOK"
              },
              enterpriseIntegration: {
                title: "Enterprise Integration & APIs",
                challenge: "Disconnected systems creating data silos and inefficiencies",
                outcome: "Unified data ecosystem enabling seamless information flow",
                approach: "Modern API architecture connecting all business systems",
                timeline: "2-5 months for complete integration",
                investment: "Starting from 300,000 NOK"
              },
              modernWebApps: {
                title: "Modern Web Applications",
                challenge: "Outdated web presence limiting customer engagement",
                outcome: "Enhanced digital presence driving customer acquisition and retention",
                approach: "User-centered design with cutting-edge technology",
                timeline: "1-4 months for full deployment",
                investment: "Starting from 150,000 NOK"
              }
            },
            stories: {
              title: "Client Success Stories",
              subtitle: "Measurable Business Impact Through Technology",
              cta: "Explore All Success Stories",
              metrics: {
                efficiency: "Efficiency Improvement",
                cost_savings: "Cost Savings",
                revenue_growth: "Revenue Growth",
                time_reduction: "Time Reduction"
              }
            },
            partnership: {
              title: "Your Technology Transformation Partner",
              subtitle: "Collaborative Approach to Business Success",
              approach: {
                consultation: {
                  title: "Strategic Consultation",
                  description: "Understanding your business challenges and transformation goals"
                },
                planning: {
                  title: "Solution Architecture",
                  description: "Designing technology solutions that align with business objectives"
                },
                implementation: {
                  title: "Agile Delivery",
                  description: "Iterative development with continuous business value delivery"
                },
                optimization: {
                  title: "Continuous Optimization",
                  description: "Ongoing support and enhancement for sustained business growth"
                }
              }
            },
            cta: {
              consultation: {
                title: "Ready to Transform Your Business?",
                description: "Schedule a free consultation to discuss your digital transformation needs",
                button: "Schedule Free Consultation",
                guarantee: "No obligation - just insights and recommendations"
              },
              contact: {
                business: "Business Transformation Inquiry",
                partnership: "Strategic Partnership Discussion",
                solution: "Custom Solution Request"
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
            description: "Klar til å gjøre ideer til virkelighet? Ta kontakt med vårt ekspertteam.",
            info: {
              phone: {
                title: "Telefon",
                description: "Ring oss"
              },
              email: {
                title: "E-post",
                description: "Skriv til oss"
              }
            },
            form: {
              name: "Ditt navn",
              email: "E-postadresse",
              subject: "Emne",
              message: "Din melding",
              status: {
                send: "Send melding",
                sending: "Sender..."
              },
              validation: {
                name_min: "Navnet må være minst {{minimum}} tegn",
                email_invalid: "Vennligst skriv inn en gyldig e-postadresse",
                subject_min: "Emnet må være minst {{minimum}} tegn",
                message_min: "Meldingen må være minst {{minimum}} tegn",
                captcha_required: "Vennligst fullfør captcha-verifiseringen"
              },
              success: {
                title: "Melding sendt",
                description: "Takk for din melding. Vi kommer tilbake til deg snart!"
              },
              error: {
                title: "Feil",
                description: "Det oppstod et problem med å sende meldingen din. Vennligst prøv igjen."
              }
            }
          },
          footer: {
            rights: "Alle rettigheter reservert.",
            privacy: "Personvernpolicy",
            terms: "Brukervilkår",
            cookies: "Cookie-policy"
          },
          coreProducts: {
            title: "Våre Produkter",
            description: "Innovative AI-drevne løsninger som transformerer helsevesen, dokumentasjon og arkitektur",
            learnMore: "Lær Mer",
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
          clients: {
            title: "Våre Kunder",
            description: "Samarbeider med bransjens ledere for å drive innovasjon og skape virkningsfulle løsninger."
          },
          common: {
            goBack: "Tilbake",
            tryAgain: "Prøv igjen",
            goHome: "Hjem"
          },
          error: {
            oops: "Oops!",
            somethingWentWrong: "Noe gikk galt",
            pageNotFound: "Siden ikke funnet",
            pageNotFoundDescription: "Siden du leter etter kan være fjernet, navnet er endret eller er midlertidig utilgjengelig."
          },
          cookies: {
            title: "Cookie-policy",
          },
          privacy: {
            title: "Personvernpolicy",
          },
          terms: {
            title: "Brukervilkår",
          },
          lastUpdated: "Sist oppdatert",
          business: {
            hero: {
              title: "Vi bruker teknologi for å skape digital transformasjon",
              subtitle: "Din strategiske teknologipartner",
              description: "Vi bygger ikke bare programvare - vi skaper målbar forretningsendring. Vår ekspertise gjør komplekse utfordringer til konkurransefortrinn.",
              cta: {
                primary: "Utforsk våre løsninger",
                secondary: "Book konsultasjon"
              },
              value: {
                partnership: "Strategisk partnerskap",
                transformation: "Digital transformasjon",
                results: "Målbare resultater",
                innovation: "Innovasjonsledelse"
              }
            },
            navigation: {
              challenge: "Hva kan vi løse for din bedrift?",
              solutions: "Forretningsløsninger",
              outcomes: "Suksesshistorier",
              partnership: "Partnerskap",
              consultation: "Gratis konsultasjon"
            },
            services: {
              digitalTransformation: {
                title: "Digital transformasjon",
                challenge: "Eldre systemer som begrenser forretningsvekst og effektivitet",
                outcome: "Modernisert infrastruktur som muliggjør rask skalering og forbedret kundeopplevelse",
                approach: "Strategisk teknologikart med målbar forretningseffekt",
                timeline: "3-8 måneder for fullstendig transformasjon",
                investment: "Fra 500 000 NOK"
              },
              aiAutomation: {
                title: "AI og intelligent automatisering",
                challenge: "Manuelle prosesser som forbruker ressurser og skaper flaskehalser",
                outcome: "Automatiserte arbeidsflyter som reduserer driftskostnader og forbedrer nøyaktighet",
                approach: "Tilpassede AI-løsninger integrert med eksisterende forretningsprosesser",
                timeline: "2-6 måneder for full automatiseringsimplementering",
                investment: "Fra 200 000 NOK"
              },
              enterpriseIntegration: {
                title: "Virksomhetsintegrasjon og API-er",
                challenge: "Adskilte systemer som skaper datasiloer og ineffektivitet",
                outcome: "Samlet dataøkosystem som muliggjør sømløs informasjonsflyt",
                approach: "Moderne API-arkitektur som forbinder alle forretningssystemer",
                timeline: "2-5 måneder for fullstendig integrasjon",
                investment: "Fra 300 000 NOK"
              },
              modernWebApps: {
                title: "Moderne webapplikasjoner",
                challenge: "Utdatert nettilstedeværelse som begrenser kundeengasjement",
                outcome: "Forbedret digital tilstedeværelse som driver kundeakkvisisjon og kundelojalitet",
                approach: "Brukersentrert design med banebrytende teknologi",
                timeline: "1-4 måneder for full distribusjon",
                investment: "Fra 150 000 NOK"
              }
            },
            stories: {
              title: "Kundesuksesshistorier",
              subtitle: "Målbar forretningseffekt gjennom teknologi",
              cta: "Utforsk alle suksesshistorier",
              metrics: {
                efficiency: "Effektivitetsforbedring",
                cost_savings: "Kostnadsbesparelser",
                revenue_growth: "Inntektsvekst",
                time_reduction: "Tidsreduksjon"
              }
            },
            partnership: {
              title: "Din teknologitransformasjonspartner",
              subtitle: "Samarbeidstilnærming til forretningssuksess",
              approach: {
                consultation: {
                  title: "Strategisk rådgivning",
                  description: "Forstå dine forretningsutfordringer og transformasjonsmål"
                },
                planning: {
                  title: "Løsningsarkitektur",
                  description: "Design teknologiløsninger som er i tråd med forretningsmål"
                },
                implementation: {
                  title: "Smidig levering",
                  description: "Iterativ utvikling med kontinuerlig levering av forretningsverdi"
                },
                optimization: {
                  title: "Kontinuerlig optimalisering",
                  description: "Pågående støtte og forbedring for vedvarende forretningsvekst"
                }
              }
            },
            cta: {
              consultation: {
                title: "Klar til å transformere din bedrift?",
                description: "Book en gratis konsultasjon for å diskutere dine digitale transformasjonsbehov",
                button: "Book gratis konsultasjon",
                guarantee: "Ingen forpliktelser - bare innsikt og anbefalinger"
              },
              contact: {
                business: "Forespørsel om forretningsendring",
                partnership: "Strategisk partnerskapsdiskusjon",
                solution: "Forespørsel om tilpasset løsning"
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
