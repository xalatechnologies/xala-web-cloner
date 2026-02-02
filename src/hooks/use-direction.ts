import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook to manage document direction (LTR/RTL) based on current language.
 * Arabic uses RTL, all other languages use LTR.
 */
export function useDirection() {
    const { i18n } = useTranslation();

    useEffect(() => {
        const isRTL = i18n.language === 'ar';
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return i18n.language === 'ar' ? 'rtl' : 'ltr';
}
