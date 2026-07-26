import type { CaseStudy } from '@/types/caseStudy';
import { altinnCaseStudy } from './altinn';
import { norwegianAirCaseStudy } from './norwegian-air';
import { spareBank1CaseStudy } from './sparebank1';
import { sykehuspartnerCaseStudy } from './sykehuspartner';
import { furstForumCaseStudy } from './furst-forum';
import { nordreFolloCaseStudy } from './nordre-follo';
import { unicefAfghanistanCaseStudy } from './unicef-afghanistan';
import { unicefLiberiaCaseStudy } from './unicef-liberia';
import { unochaCaseStudy } from './unocha';
import { ssbCaseStudy } from './ssb';
import { novCaseStudy } from './nov';
import { konsentraCaseStudy } from './konsentra';
import { tdsCaseStudy } from './tds';
import { globalConnectCaseStudy } from './globalconnect';
import { teliaCaseStudy } from './telia';
import { norskHelsenettCaseStudy } from './norsk-helsenett';
import { usaidCaseStudy } from './usaid';

export const caseStudies: CaseStudy[] = [
  altinnCaseStudy,
  norwegianAirCaseStudy,
  spareBank1CaseStudy,
  sykehuspartnerCaseStudy,
  furstForumCaseStudy,
  nordreFolloCaseStudy,
  unicefAfghanistanCaseStudy,
  unicefLiberiaCaseStudy,
  unochaCaseStudy,
  ssbCaseStudy,
  novCaseStudy,
  konsentraCaseStudy,
  tdsCaseStudy,
  globalConnectCaseStudy,
  teliaCaseStudy,
  norskHelsenettCaseStudy,
  usaidCaseStudy,
];

export const caseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);

// Map from the existing static card IDs to case study slugs
export const slugByStaticId: Record<string, string> = {
  'altinn-static': 'altinn',
  'altinn-static-no': 'altinn',
  'norwegian-static': 'norwegian-airlines-enterprise-platform',
  'norwegian-static-no': 'norwegian-airlines-enterprise-platform',
  'sparebank1-static': 'sparebank-1-banking-systems',
  'sparebank1-static-no': 'sparebank-1-banking-systems',
  'sykehuspartner-static': 'sykehuspartner-forskningsportal',
  'sykehuspartner-static-no': 'sykehuspartner-forskningsportal',
  'furst-static': 'furst-forum',
  'furst-static-no': 'furst-forum',
  'nordre-follo-static': 'nordre-follo-tilskuddsportal-bevillingsportal',
  'nordre-follo-static-no': 'nordre-follo-tilskuddsportal-bevillingsportal',
  'unicef-static': 'unicef-afghanistan-child-protection-birth-registration',
  'unicef-static-no': 'unicef-afghanistan-child-protection-birth-registration',
  'unicef-liberia-static': 'unicef-liberia-child-protection-registration-reintegration',
  'unicef-liberia-static-no': 'unicef-liberia-child-protection-registration-reintegration',
  'ocha-static': 'unocha-global-mapping-emergency-stockpiles',
  'ocha-static-no': 'unocha-global-mapping-emergency-stockpiles',
  'ssb-static': 'ssb-legacy-system-modernization',
  'ssb-static-no': 'ssb-legacy-system-modernization',
  'nov-static': 'nov-industrial-iot-drilling-platform',
  'nov-static-no': 'nov-industrial-iot-drilling-platform',
  'konsentra-static': 'ruter-autonomous-bus-platform',
  'konsentra-static-no': 'ruter-autonomous-bus-platform',
  'ruter-static': 'ruter-autonomous-bus-platform',
  'ruter-static-no': 'ruter-autonomous-bus-platform',
  'tds-static': 'tds-taxi-portal',
  'tds-static-no': 'tds-taxi-portal',
  'globalconnect-static': 'globalconnect-telecommunications-platform',
  'globalconnect-static-no': 'globalconnect-telecommunications-platform',
  'telia-static': 'telia-telecommunications-platform',
  'telia-static-no': 'telia-telecommunications-platform',
  'norsk-helsenett-static': 'norsk-helsenett-healthcare-infrastructure',
  'norsk-helsenett-static-no': 'norsk-helsenett-healthcare-infrastructure',
  'usaid-static': 'usaid-digital-development-platform',
  'usaid-static-no': 'usaid-digital-development-platform',
};

export {
  altinnCaseStudy,
  norwegianAirCaseStudy,
  spareBank1CaseStudy,
  sykehuspartnerCaseStudy,
  furstForumCaseStudy,
  nordreFolloCaseStudy,
  unicefAfghanistanCaseStudy,
  unicefLiberiaCaseStudy,
  unochaCaseStudy,
  ssbCaseStudy,
  novCaseStudy,
  konsentraCaseStudy,
  tdsCaseStudy,
  globalConnectCaseStudy,
  teliaCaseStudy,
  norskHelsenettCaseStudy,
  usaidCaseStudy,
};
