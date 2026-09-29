import { Fragment } from "react";
import { HubRichInline } from "@/components/tjenester/HubRichInline";
import {
  TJENESTER_HUB_LEAD,
  TJENESTER_HUB_SECTIONS,
  type HubDefinitionItem,
} from "@/data/tjenester-hub-content";

function HubParagraph({ text }: { text: string }) {
  return (
    <p>
      <HubRichInline text={text} />
    </p>
  );
}

function HubDefinitionList({ items }: { items: HubDefinitionItem[] }) {
  return (
    <dl>
      {items.map((item) => (
        <Fragment key={item.question}>
          <dt>
            <strong>{item.question}</strong>
          </dt>
          <dd>
            <HubRichInline text={item.answer} />
          </dd>
        </Fragment>
      ))}
    </dl>
  );
}

/** Shared /tjenester hub prose — same copy the static prerender writes. */
export default function TjenesterHubBody() {
  return (
    <>
      <p className="lead">{TJENESTER_HUB_LEAD}</p>

      {TJENESTER_HUB_SECTIONS.map((section) => (
        <Fragment key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <HubParagraph key={paragraph.slice(0, 48)} text={paragraph} />
          ))}
          {section.definitionList ? <HubDefinitionList items={section.definitionList} /> : null}
        </Fragment>
      ))}
    </>
  );
}
