import { DocumentVectorizer, DocumentMetadata } from './vectorize';
import { config } from '../config';

// Company references and case studies
const references = [
  {
    content: `Sykehuspartner AS (2023)
    Led migration of 900+ SharePoint sites for Norwegian hospitals.
    Implemented Microsoft Azure environment and Azure DevOps pipelines.
    Developed custom SPFx components using ReactJS, TypeScript, ASP.NET.
    Created Power Platform solutions with Power Apps and Power Automate.
    Contact: Ingeborg Walde, Section Leader (+47 97970121)`,
    metadata: {
      source: 'reference',
      type: 'case_study',
      title: 'Sykehuspartner AS Migration Project',
      date: '2023'
    }
  },
  {
    content: `Statistical Central Bureau - SSB (2019-2021)
    Developed microservices for data transfer between .NET and Java systems.
    Created custom BackOffice system for survey management.
    Implemented Azure architecture and resources.
    Full-stack development with .NET, Java, and modern frontend technologies.
    Contact: Trond Båshus, Senior Advisor (+47 91354335)`,
    metadata: {
      source: 'reference',
      type: 'case_study',
      title: 'SSB Data Transfer System',
      date: '2019-2021'
    }
  },
  {
    content: `Norwegian Airlines (2019-2020)
    Implemented comprehensive Microsoft 365 and SharePoint Online solutions.
    Migrated on-premise systems to cloud-based solutions.
    Integrated with ServiceNow and SAP SuccessFactors.
    Developed custom SPFx components and automated workflows.
    Contact: Helene Løken, Head of Internal Communications`,
    metadata: {
      source: 'reference',
      type: 'case_study',
      title: 'Norwegian Airlines Digital Transformation',
      date: '2019-2020'
    }
  }
];

// Company information
const companyInfo = {
  content: `Xala Technologies AS is a cutting-edge software development company founded by Ibrahim Rahmani (MSc Information Systems, Microsoft Certified). Since 2006, we've been delivering exceptional digital solutions across web applications, mobile development, AI solutions, and enterprise systems.

  Our expertise includes:
  - SharePoint & Microsoft 365 Development
  - Custom CRM/ERP Systems
  - Business Intelligence & Analytics
  - Process Automation
  - Legacy System Modernization
  - Cloud Solutions & Azure Development
  - Full-stack Development
  - Mobile Applications
  
  Contact:
  - Phone: +47 940 77 006
  - Email: ibrahim@xala.no
  - Location: Norway`,
  metadata: {
    source: 'company',
    type: 'company_info',
    title: 'About Xala Technologies',
    date: '2024'
  }
};

export async function vectorizeDocuments() {
  try {
    const vectorizer = new DocumentVectorizer(
      config.supabaseUrl,
      config.supabaseKey,
      config.openAiKey
    );

    // Process references and case studies
    for (const ref of references) {
      await vectorizer.vectorizeAndStore(ref.content, ref.metadata);
      console.log(`Vectorized: ${ref.metadata.title}`);
    }

    // Process company information
    await vectorizer.vectorizeAndStore(companyInfo.content, companyInfo.metadata);
    console.log('Vectorized company information');

    return { success: true, message: 'All documents vectorized successfully' };
  } catch (error) {
    console.error('Error vectorizing documents:', error);
    return { success: false, error };
  }
}
