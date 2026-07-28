import type { LucideIcon } from 'lucide-react';
import { resolveIcon } from '@/lib/icons';

interface AboutFeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

/**
 * One of the commitments this company holds to.
 *
 * The icon is looked up in lucide by name, the way every other data-driven
 * component here does it. It used to consult a four-entry map keyed on
 * lowercase names — brain, rocket, users, code — while the data supplied
 * Lightbulb, Award, Handshake and Shield. Nothing ever matched, so all four
 * cards fell through to the same fallback and the page showed one brain icon
 * four times.
 *
 * h3, not h2: these sit under the section's own heading.
 */
const AboutFeatureCard = ({ title, description, icon }: AboutFeatureCardProps) => {
  const Icon = resolveIcon(icon, 'CircleDot');

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 md:p-7">
      <div className="flex items-center gap-3">
        <span className="card-icon group-hover:bg-primary/20">
          <Icon aria-hidden="true" />
        </span>
        <h3 className="card-heading">{title}</h3>
      </div>

      <p className="mt-4 card-body">
        {description}
      </p>
    </article>
  );
};

export default AboutFeatureCard;
