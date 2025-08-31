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
            contact: 'Contact',
            services: 'Services',
            servicesDescription: 'Complete spectrum of technology services for modern businesses',
            products: 'Products',
            productsDescription: 'Innovative AI-powered solutions transforming industries',
            cases: 'Cases',
            casesDescription: 'Explore our successful project implementations',
            workProcessDescription: 'Our structured approach from idea to implementation',
            technology: 'Technology',
            technologyDescription: 'Cutting-edge technologies powering your digital transformation',
            aboutDescription: 'Learn about our mission and expertise',
            contactDescription: 'Get in touch for a non-committal conversation'
          },
          Loading: 'Loading',
          hero: {
            welcome: 'Welcome to the Future of Technology',
            title: 'Building Digital',
            excellence: 'Excellence',
            description: 'We create innovative software solutions that drive business growth and transform ideas into reality. Leveraging cutting-edge technology to build tomorrow\'s digital landscape.',
            getInTouch: 'Get in touch',
            ourProcess: 'Our Process',
            aboutUs: 'About us',
            heroText: {
              weUse: 'We use',
              data: 'data',
              to: 'to',
              create: 'create a',
              positiveChange: 'positive change'
            },
            bookMeeting: 'Book meeting',
            scrollToNext: 'Scroll to next section',
            certifications: {
              iso: 'ISO Certified',
              gdpr: 'GDPR Ready',
              microsoft: 'Microsoft Certified',
              aws: 'AWS Certified'
            },
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
          valueProps: {
            title: 'Why Choose Xala?',
            description: 'We combine technical expertise with business acumen to deliver solutions that create real value for your business.',
            fastDelivery: {
              title: 'Fast Delivery',
              description: 'We deliver working solutions quickly with modern technology and efficient working methods.'
            },
            scalableSolutions: {
              title: 'Scalable Solutions',
              description: 'All our solutions are built to grow with your business and handle future growth.'
            },
            expertise: {
              title: 'Expertise',
              description: 'Our team has deep competence in AI, cloud technology and modern development.'
            },
            fullService: {
              title: 'Full Service',
              description: 'From idea to finished solution - we cover the entire process with design, development and deployment.'
            }
          },
          finalCTA: {
            title: 'Ready to Transform Your Business?',
            description: 'Let us discuss how we can help you achieve your goals through innovative technological solutions.',
            startConversation: 'Start the conversation',
            viewCases: 'View our cases',
            callUs: 'Call us at',
            emailUs: 'or send an email to'
          },
          teasers: {
            services: {
              title: 'Our Services',
              description: 'We deliver complete technology solutions that drive business growth',
              viewAll: 'View all services',
              aiMachineLearning: {
                title: 'AI & Machine Learning',
                description: 'Automate processes and gain insights from data with modern AI solutions.'
              },
              cloudSolutions: {
                title: 'Cloud Solutions',
                description: 'Secure and scalable cloud infrastructure with Azure and AWS.'
              },
              webDevelopment: {
                title: 'Web Development',
                description: 'Modern websites and applications with React, Next.js and TypeScript.'
              },
              mobileDevelopment: {
                title: 'Mobile Development',
                description: 'Native and cross-platform mobile apps for iOS and Android.'
              }
            },
            products: {
              title: 'Our Core Products',
              description: 'Ready-made solutions that can be customized to your needs',
              viewAll: 'View all products',
              available: 'Available',
              beta: 'Beta',
              coming: 'Coming',
              fylleut: {
                title: 'Fylleut',
                description: 'Automated form and document filling with AI.'
              },
              nextbid: {
                title: 'NextBid',
                description: 'Intelligent tender management and document analysis.'
              },
              supplymantix: {
                title: 'SupplyMantix',
                description: 'Supply chain optimization with machine learning.'
              }
            },
            process: {
              title: 'How We Work',
              description: 'From first meeting to finished solution, we follow a structured process that ensures we deliver on time, cost and quality. We believe in transparency and involvement throughout the process.',
              readProcess: 'Read the process',
              steps: {
                mapping: 'Mapping',
                design: 'Design',
                development: 'Development',
                delivery: 'Delivery'
              }
            },
            team: {
              title: 'Meet Our Team',
              description: 'The people behind Xala Technologies',
              viewFullTeam: 'See the whole team',
              members: {
                ibrahim: {
                  name: 'Ibrahim Rahmani',
                  role: 'Founder & CEO',
                  description: 'Ibrahim is an experienced technology leader with over ten years of experience in software development and team leadership. His expertise spans cloud architecture and AI integration.',
                  email: 'ibrahim@xala.no',
                  linkedin: 'https://www.linkedin.com/in/ibrahim-rahmani/'
                },
                hamid: {
                  name: 'Hamid Rahmani',
                  role: 'Technical Project Manager',
                  description: 'Hamid is a technical expert specializing in cloud architecture and DevOps practices. He leads our technical initiatives and ensures the highest quality standards in our deliveries.',
                  email: 'hamid@xala.no',
                  linkedin: 'https://www.linkedin.com/in/hamid-rahmani/'
                },
                wahid: {
                  name: 'Wahid Rahmani',
                  role: 'Full-Stack Developer',
                  description: 'Master in Computer Science | Experienced software developer with expertise in machine learning, cloud services, IT leadership and development of innovative, scalable software solutions for various industries.',
                  email: 'wahid@xala.no',
                  linkedin: 'https://www.linkedin.com/in/wahid-rahmani/'
                },
                elias: {
                  name: 'Elias Yassin',
                  role: 'Customer Success Manager',
                  description: 'Specialist in sales, focused on delivering intuitive, effective and engaging solutions that build strong customer experiences and increase sales.',
                  email: 'elias@xala.no',
                  linkedin: 'https://www.linkedin.com/in/elias-yassin/'
                }
              }
            },
            tech: {
              title: 'Technology Platform',
              description: 'We build on modern technologies like React, TypeScript, Next.js, Azure and AWS. Our technology choices ensure scalable, secure and maintainable solutions that grow with your business.',
              viewTechnology: 'View technology'
            },
            contact: {
              title: 'Ready for a Chat?',
              description: 'We respond to all inquiries within 24 hours. Get in touch for a non-committal conversation.',
              getInTouch: 'Get in touch',
              contactInfo: {
                email: {
                  title: 'Email',
                  value: 'Info@xala.no'
                },
                phone: {
                  title: 'Phone',
                  value: '+47 966 65 001'
                },
                responseTime: {
                  title: 'Response time',
                  value: 'Within 24 hours'
                }
              }
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
            },
            showMore: 'Show More Case Studies',
            showLess: 'Show Less',
            noResults: 'No case studies available'
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
          pages: {
            services: {
              eyebrow: 'Services',
              title: 'Our Services',
              description: 'Complete spectrum of technology services for modern businesses.'
            },
            products: {
              eyebrow: 'Products',
              title: 'Our Core Products',
              description: 'Ready-made solutions that can be customized to your needs and deployed quickly.'
            },
            contact: {
              eyebrow: 'Contact',
              title: 'Get in Touch',
              description: 'We respond to all inquiries within 24 hours. Send us a message or call directly.'
            },
            about: {
              eyebrow: 'About Us',
              title: 'Xala Technologies',
              description: 'We are passionate about technology that creates real value for our customers.'
            },
            team: {
              eyebrow: 'About Us',
              title: 'Meet Our Team',
              description: 'The people behind Xala Technologies. Experienced developers, designers and consultants.'
            }
          },
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
            contact: 'Kontakt',
            services: 'Tjenester',
            servicesDescription: 'Komplett spekter av teknologitjenester for moderne virksomheter',
            products: 'Produkter',
            productsDescription: 'Innovative AI-drevne løsninger som transformerer bransjer',
            cases: 'Caser',
            casesDescription: 'Utforsk våre vellykkede prosjektimplementeringer',
            workProcessDescription: 'Vår strukturerte tilnærming fra idé til implementering',
            technology: 'Teknologi',
            technologyDescription: 'Banebrytende teknologier som driver din digitale transformasjon',
            aboutDescription: 'Lær om vårt oppdrag og ekspertise',
            contactDescription: 'Ta kontakt for en uforpliktende samtale'
          },
          Loading: 'Laster',
          hero: {
            welcome: 'Velkommen til fremtidens teknologi',
            title: 'Bygger Digital',
            excellence: 'Ekspertise',
            description: 'Vi skaper innovative programvareløsninger som driver forretningsvekst og transformerer ideer til virkelighet. Vi utnytter banebrytende teknologi for å bygge morgendagens digitale landskap.',
            getInTouch: 'Ta kontakt',
            ourProcess: 'Vår prosess',
            aboutUs: 'Om oss',
            heroText: {
              weUse: 'Vi bruker',
              data: 'data',
              to: 'for å',
              create: 'skape en',
              positiveChange: 'positiv forandring'
            },
            bookMeeting: 'Bestill møte',
            scrollToNext: 'Rull til neste seksjon',
            certifications: {
              iso: 'ISO-sertifisert',
              gdpr: 'GDPR-klar',
              microsoft: 'Microsoft-sertifisert',
              aws: 'AWS-sertifisert'
            },
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
          valueProps: {
            title: 'Hvorfor velge Xala?',
            description: 'Vi kombinerer teknisk ekspertise med forretningsteft for å levere løsninger som skaper real verdi for din bedrift.',
            fastDelivery: {
              title: 'Rask levering',
              description: 'Vi leverer fungerende løsninger raskt med moderne teknologi og effektive arbeidsmetoder.'
            },
            scalableSolutions: {
              title: 'Skalerbare løsninger',
              description: 'Alle våre løsninger er bygget for å vokse med din bedrift og håndtere fremtidig vekst.'
            },
            expertise: {
              title: 'Ekspertise',
              description: 'Vårt team har dyp kompetanse innen AI, sky-teknologi og moderne utvikling.'
            },
            fullService: {
              title: 'Fullservice',
              description: 'Fra idé til ferdig løsning - vi dekker hele prosessen med design, utvikling og deploy.'
            }
          },
          finalCTA: {
            title: 'Klar for å transformere din bedrift?',
            description: 'La oss diskutere hvordan vi kan hjelpe deg med å oppnå dine mål gjennom innovative teknologiske løsninger.',
            startConversation: 'Start samtalen',
            viewCases: 'Se våre caser',
            callUs: 'Ring oss på',
            emailUs: 'eller send en epost til'
          },
          teasers: {
            services: {
              title: 'Våre tjenester',
              description: 'Vi leverer komplette teknologiløsninger som driver forretningsvekst',
              viewAll: 'Se alle tjenester',
              aiMachineLearning: {
                title: 'AI & Maskinlæring',
                description: 'Automatiser prosesser og få innsikt fra data med moderne AI-løsninger.'
              },
              cloudSolutions: {
                title: 'Skyløsninger',
                description: 'Sikker og skalerbar infrastruktur i skyen med Azure og AWS.'
              },
              webDevelopment: {
                title: 'Webutvikling',
                description: 'Moderne nettsider og applikasjoner med React, Next.js og TypeScript.'
              },
              mobileDevelopment: {
                title: 'Mobilutvikling',
                description: 'Native og cross-platform mobilapper for iOS og Android.'
              }
            },
            products: {
              title: 'Våre kjerneprodukter',
              description: 'Ferdige løsninger som kan tilpasses dine behov',
              viewAll: 'Se alle produkter',
              available: 'Tilgjengelig',
              beta: 'Beta',
              coming: 'Kommende',
              fylleut: {
                title: 'Fylleut',
                description: 'Automatisert utfylling av skjemaer og dokumenter med AI.'
              },
              nextbid: {
                title: 'NextBid',
                description: 'Intelligent anbudshåndtering og dokumentanalyse.'
              },
              supplymantix: {
                title: 'SupplyMantix',
                description: 'Forsyningskjede-optimalisering med maskinlæring.'
              }
            },
            process: {
              title: 'Slik jobber vi',
              description: 'Fra første møte til ferdig løsning følger vi en strukturert prosess som sikrer at vi leverer på tid, kost og kvalitet. Vi tror på transparens og involvering gjennom hele prosessen.',
              readProcess: 'Les prosessen',
              steps: {
                mapping: 'Kartlegging',
                design: 'Design',
                development: 'Utvikling',
                delivery: 'Levering'
              }
            },
            team: {
              title: 'Møt teamet vårt',
              description: 'Menneskene bak Xala Technologies',
              viewFullTeam: 'Se hele teamet',
              members: {
                ibrahim: {
                  name: 'Ibrahim Rahmani',
                  role: 'Grunnlegger og daglig leder',
                  description: 'Ibrahim er en erfaren teknologileder med over ti års erfaring innen programvareutvikling og teamledelse. Hans ekspertise spenner over skyarkitektur og AI-integrasjon.',
                  email: 'ibrahim@xala.no',
                  linkedin: 'https://www.linkedin.com/in/ibrahim-rahmani/'
                },
                hamid: {
                  name: 'Hamid Rahmani',
                  role: 'Teknisk Prosjektleder',
                  description: 'Hamid er en teknisk ekspert som spesialiserer seg på skyarkitektur og DevOps-praksis. Han leder våre tekniske initiativer og sikrer høyeste kvalitetsstandarder i våre leveranser.',
                  email: 'hamid@xala.no',
                  linkedin: 'https://www.linkedin.com/in/hamid-rahmani/'
                },
                wahid: {
                  name: 'Wahid Rahmani',
                  role: 'Fullstackutvikler',
                  description: 'Master i informatikk | Erfaren programvareutvikler med ekspertise innen maskinlæring, skytjenester, IT-ledelse og utvikling av innovative, skalerbare programvareløsninger for ulike bransjer.',
                  email: 'wahid@xala.no',
                  linkedin: 'https://www.linkedin.com/in/wahid-rahmani/'
                },
                elias: {
                  name: 'Elias Yassin',
                  role: 'Customer Success Manager',
                  description: 'Spesialist innen salg, med fokus på å levere intuitive, effektive og engasjerende løsninger som bygger sterke kundeopplevelser og øker salg.',
                  email: 'elias@xala.no',
                  linkedin: 'https://www.linkedin.com/in/elias-yassin/'
                }
              }
            },
            tech: {
              title: 'Teknologiplattform',
              description: 'Vi bygger på moderne teknologier som React, TypeScript, Next.js, Azure og AWS. Vårt teknologivalg sikrer skalerbare, sikre og vedlikeholdbare løsninger som vokser med din bedrift.',
              viewTechnology: 'Se teknologi'
            },
            contact: {
              title: 'Klar for en prat?',
              description: 'Vi svarer på alle henvendelser innen 24 timer. Ta kontakt for en uforpliktende samtale.',
              getInTouch: 'Ta kontakt',
              contactInfo: {
                email: {
                  title: 'E-post',
                  value: 'Info@xala.no'
                },
                phone: {
                  title: 'Telefon',
                  value: '+47 966 65 001'
                },
                responseTime: {
                  title: 'Responstid',
                  value: 'Innen 24 timer'
                }
              }
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
            },
            showMore: 'Se flere casestudier',
            showLess: 'Vis mindre',
            noResults: 'Ingen casestudier tilgjengelig'
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
          pages: {
            services: {
              eyebrow: 'Tjenester',
              title: 'Våre tjenester',
              description: 'Komplett spekter av teknologitjenester for moderne virksomheter.'
            },
            products: {
              eyebrow: 'Produkter',
              title: 'Våre kjerneprodukter',
              description: 'Ferdige løsninger som kan tilpasses dine behov og komme raskt i produksjon.'
            },
            contact: {
              eyebrow: 'Kontakt',
              title: 'Ta kontakt med oss',
              description: 'Vi svarer på alle henvendelser innen 24 timer. Send oss en melding eller ring direkte.'
            },
            about: {
              eyebrow: 'Om oss',
              title: 'Xala Technologies',
              description: 'Vi brenner for teknologi som skaper reell verdi for våre kunder.'
            },
            team: {
              eyebrow: 'Om oss',
              title: 'Møt teamet vårt',
              description: 'Menneskene bak Xala Technologies. Erfarne utviklere, designere og rådgivere.'
            }
          },
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
                partnership: "Strategisk Partnerskap",
                transformation: "Digital Transformasjon",
                results: "Målbare Resultater",
                innovation: "Kontinuerlig Innovasjon"
              }
            },
            navigation: {
              challenge: "Hvilke Forretningsutfordringer Kan Vi Løse for Deg?",
              solutions: "Forretningsløsninger",
              outcomes: "Resultater",
              partnership: "Partnerskapsmodell",
              consultation: "Gratis Konsultasjon"
            },
            services: {
              digitalTransformation: {
                title: "Digital Transformasjon",
                challenge: "Eldre systemer som hindrer din bedrifts vekst og effektivitet",
                outcome: "Modernisert infrastruktur som muliggjør rask skalering og forbedret kundeopplevelse",
                approach: "Strategisk teknologiveikart med målbar forretningspåvirkning",
                timeline: "3-8 måneder for full transformasjon",
                investment: "Fra 500 000 NOK"
              },
              aiAutomation: {
                title: "AI & Intelligent Automatisering",
                challenge: "Manuelle prosesser som konsumerer ressurser og skaper flaskehalser",
                outcome: "Automatiserte arbeidsflyter som reduserer driftskostnader og forbedrer nøyaktighet",
                approach: "Tilpassede AI-løsninger integrert med eksisterende forretningsprosesser",
                timeline: "2-6 måneder for full automatiseringsimplementering",
                investment: "Fra 200 000 NOK"
              },
              enterpriseIntegration: {
                title: "Bedriftsintegrasjon & APIer",
                challenge: "Frakoblede systemer som skaper datasiloer og ineffektiviteter",
                outcome: "Samlet dataøkosystem som muliggjør sømløs informasjonsflyt",
                approach: "Moderne API-arkitektur som kobler sammen alle forretningssystemer",
                timeline: "2-5 måneder for full integrasjon",
                investment: "Fra 300 000 NOK"
              },
              modernWebApps: {
                title: "Moderne Webapplikasjoner",
                challenge: "Utdatert webtilstedeværelse som begrenser kundeengasjement",
                outcome: "Forbedret digital tilstedeværelse som driver kundeanskaffelse og tilbakekall",
                approach: "Brukerfokusert design med banebrytende teknologi",
                timeline: "1-4 måneder for full utrullering",
                investment: "Fra 150 000 NOK"
              }
            },
            stories: {
              title: "Kundesuksesshistorier",
              subtitle: "Målbar Forretningspåvirkning Gjennom Teknologi",
              cta: "Utforsk Alle Suksesshistorier",
              metrics: {
                efficiency: "Effektivitetsøkning",
                cost_savings: "Kostnadsbesparelser",
                revenue_growth: "Inntektsvekst",
                time_reduction: "Tidsreduksjon"
              }
            },
            partnership: {
              title: "Din Teknologitransformasjonspartner",
              subtitle: "Kollaborativ Tilnærming til Forretningshell",
              approach: {
                consultation: {
                  title: "Strategisk Konsultasjon",
                  description: "Forståelse av dine forretningsutfordringer og transformasjonsmål"
                },
                planning: {
                  title: "Løsningsarkitektur",
                  description: "Design av teknologiløsninger som er i tråd med forretningsmål"
                },
                implementation: {
                  title: "Agil Levering",
                  description: "Iterativ utvikling med kontinuerlig forretningsverdi-levering"
                },
                optimization: {
                  title: "Kontinuerlig Optimalisering",
                  description: "Løpende støtte og forbedring for bærekraftig forretningsvekst"
                }
              }
            },
            cta: {
              consultation: {
                title: "Klar til å Transformere Din Bedrift?",
                description: "Book en gratis konsultasjon for å diskutere dine digitale transformasjonsbehov",
                button: "Book Gratis Konsultasjon",
                guarantee: "Ingen forpliktelser - bare innsikt og anbefalinger"
              },
              contact: {
                business: "Forretningsomdannelse Henvendelse",
                partnership: "Strategisk Partnerskapsdiskusjon",
                solution: "Tilpasset Løsningsforespørsel"
              }
            }
          }
        }
      }
    }
  });

export default i18n;