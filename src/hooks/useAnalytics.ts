interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

interface PageView {
  path: string;
  title: string;
  language?: string;
}

interface UserTiming {
  category: string;
  variable: string;
  value: number;
  label?: string;
}

const useAnalytics = () => {
  const trackEvent = (event: AnalyticsEvent) => {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        non_interaction: event.nonInteraction
      });
    }

    // Microsoft Clarity
    if (typeof clarity !== 'undefined') {
      clarity('event', event.action, {
        category: event.category,
        label: event.label,
        value: event.value?.toString()
      });
    }

    // Plausible
    if (typeof plausible !== 'undefined') {
      plausible(event.action, {
        props: {
          category: event.category,
          label: event.label,
          value: event.value
        }
      });
    }
  };

  const trackPageView = ({ path, title, language }: PageView) => {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
        page_location: window.location.href,
        language
      });
    }

    // Microsoft Clarity
    if (typeof clarity !== 'undefined') {
      clarity('set', 'page_view', {
        path,
        title,
        language
      });
    }

    // Plausible
    if (typeof plausible !== 'undefined') {
      plausible('pageview', {
        props: {
          path,
          title,
          language
        }
      });
    }
  };

  const trackTiming = ({ category, variable, value, label }: UserTiming) => {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        name: variable,
        value,
        event_category: category,
        event_label: label
      });
    }
  };

  // Common event trackers
  const trackClick = (elementName: string, category = 'Interaction') => {
    trackEvent({
      category,
      action: 'click',
      label: elementName
    });
  };

  const trackFormSubmission = (formName: string, success = true) => {
    trackEvent({
      category: 'Form',
      action: success ? 'submit_success' : 'submit_error',
      label: formName
    });
  };

  const trackSearch = (query: string, resultsCount: number) => {
    trackEvent({
      category: 'Search',
      action: 'search',
      label: query,
      value: resultsCount
    });
  };

  const trackDownload = (fileName: string, fileType: string) => {
    trackEvent({
      category: 'Download',
      action: 'download',
      label: `${fileName}.${fileType}`
    });
  };

  const trackVideoEngagement = (
    videoName: string,
    action: 'play' | 'pause' | 'complete',
    timeInSeconds?: number
  ) => {
    trackEvent({
      category: 'Video',
      action,
      label: videoName,
      value: timeInSeconds
    });
  };

  const trackSocialShare = (platform: string, contentName: string) => {
    trackEvent({
      category: 'Social',
      action: 'share',
      label: `${platform}:${contentName}`
    });
  };

  const trackError = (errorMessage: string, errorCode?: string) => {
    trackEvent({
      category: 'Error',
      action: 'error',
      label: errorCode ? `${errorCode}: ${errorMessage}` : errorMessage,
      nonInteraction: true
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackTiming,
    trackClick,
    trackFormSubmission,
    trackSearch,
    trackDownload,
    trackVideoEngagement,
    trackSocialShare,
    trackError
  };
};

export type { AnalyticsEvent, PageView, UserTiming };
export default useAnalytics;
