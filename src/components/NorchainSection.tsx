import { ExternalLink, Boxes, CreditCard, BookOpen, MessageCircle, ArrowRightLeft, Shield, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NorchainSection() {
    const { t } = useTranslation();

    const features = [
        {
            title: t('norchain.features.l1.title'),
            description: t('norchain.features.l1.description'),
            icon: Boxes
        },
        {
            title: t('norchain.features.norpay.title'),
            description: t('norchain.features.norpay.description'),
            icon: CreditCard
        },
        {
            title: t('norchain.features.norledger.title'),
            description: t('norchain.features.norledger.description'),
            icon: BookOpen
        },
        {
            title: t('norchain.features.norchat.title'),
            description: t('norchain.features.norchat.description'),
            icon: MessageCircle
        },
        {
            title: t('norchain.features.swap.title'),
            description: t('norchain.features.swap.description'),
            icon: ArrowRightLeft
        },
        {
            title: t('norchain.features.compliance.title'),
            description: t('norchain.features.compliance.description'),
            icon: Shield
        }
    ];

    const stats = [
        { value: '15+', label: t('norchain.stats.nodes') },
        { value: '3s', label: t('norchain.stats.finality') },
        { value: '10K+', label: t('norchain.stats.tps') },
        { value: '99.9%', label: t('norchain.stats.uptime') }
    ];

    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-stone-900 to-stone-800 relative overflow-hidden section-styled">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-[hsl(32_58%_56%/0.15)] text-[hsl(32_58%_56%)] rounded-full text-sm font-medium mb-4">
                        {t('norchain.badge')}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {t('norchain.title')}
                    </h2>
                    <p className="text-lg md:text-xl text-stone-300 max-w-3xl mx-auto mb-4 leading-relaxed">
                        {t('norchain.subtitle')}
                    </p>
                    <p className="text-base text-stone-400">
                        {t('norchain.subtext')}
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                            <div className="text-base text-stone-300">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 group backdrop-blur-sm"
                            >
                                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                                    <IconComponent className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-base md:text-lg text-stone-300 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://norchain.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
                    >
                        {t('norchain.exploreCta')}
                        <ExternalLink className="ml-2 w-5 h-5" />
                    </a>
                    <a
                        href="https://docs.norchain.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
                    >
                        <Code className="mr-2 w-5 h-5" />
                        {t('norchain.docsCta')}
                    </a>
                </div>
            </div>
        </section>
    );
}
