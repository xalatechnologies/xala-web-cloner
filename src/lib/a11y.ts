export function initA11y() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // @ts-ignore
    import('@axe-core/react').then(({ default: axe }) => axe((window as any).React ?? undefined, 1000));
  }
}


