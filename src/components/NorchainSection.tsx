import { ExternalLink, Boxes, CreditCard, BookOpen, MessageCircle, ArrowRightLeft, Shield, Code } from 'lucide-react';

export default function NorchainSection() {
    const features = [
        {
            title: 'NorChain L1',
            description: 'Høyytelse blockchain med 3-sekunders finalisering og 10,000+ TPS kapasitet.',
            icon: Boxes
        },
        {
            title: 'NorPay',
            description: 'Komplett betalingsinfrastruktur for Web3 - som Stripe for blockchain.',
            icon: CreditCard
        },
        {
            title: 'NorLedger',
            description: 'Første blockchain-forankrede regnskapssystem med daglige revisjonslogger.',
            icon: BookOpen
        },
        {
            title: 'NorChat',
            description: 'Web3 super-messenger som kombinerer chat, samtaler og sømløse betalinger.',
            icon: MessageCircle
        },
        {
            title: 'Swap & DEX',
            description: 'Komplett handelsøkosystem fra enkle byttinger til profesjonell trading.',
            icon: ArrowRightLeft
        },
        {
            title: 'Compliance',
            description: 'Enterprise-grade compliance for KYC/AML og regulatoriske krav.',
            icon: Shield
        }
    ];

    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-slate-900 to-blue-950" />

            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                        <Boxes className="w-5 h-5 text-violet-400" />
                        <span className="text-sm font-medium text-white/90">Blockchain for Good</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        NorChain OS
                    </h2>
                    <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-4">
                        Det komplette blockchain-operativsystemet for digital handel
                    </p>
                    <p className="text-lg text-white/50 max-w-3xl mx-auto">
                        12+ integrerte applikasjoner • Betalinger • Regnskap • Meldinger • Trading • Governance
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { value: '15+', label: 'Globale noder' },
                        { value: '3s', label: 'Finalisering' },
                        { value: '10K+', label: 'TPS kapasitet' },
                        { value: '99.9%', label: 'Oppetid' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-sm text-white/60">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-violet-400/50 hover:bg-white/10 transition-all duration-500 group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-xl bg-violet-500/20 group-hover:bg-violet-500/30 transition-colors">
                                        <IconComponent className="w-6 h-6 text-violet-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://norchain.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 transform hover:-translate-y-1"
                        >
                            Utforsk NorChain
                            <ExternalLink className="ml-3 h-5 w-5" />
                        </a>
                        <a
                            href="https://docs.norchain.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white border border-white/30 hover:bg-white/10 transition-all duration-300"
                        >
                            <Code className="mr-3 h-5 w-5" />
                            Dokumentasjon
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
