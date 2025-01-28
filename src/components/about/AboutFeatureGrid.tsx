import React from 'react';
import { AboutFeatureCard } from './AboutFeatureCard';
import { useAboutFeatures } from '@/hooks/use-about-features';

export function AboutFeatureGrid() {
  const { features, isLoading } = useAboutFeatures();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature) => (
        <AboutFeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  );
}