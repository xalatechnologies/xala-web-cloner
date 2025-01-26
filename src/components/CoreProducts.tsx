import { ArrowRight, Stethoscope, FormInput, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

const CoreProducts = () => {
  const { t } = useTranslation();

  const products = [
    {
      title: t('coreProducts.doctorAI.title'),
      description: t('coreProducts.doctorAI.description'),
      icon: <Stethoscope className="w-12 h-12 text-xala-accent" />,
      metrics: t('coreProducts.doctorAI.metrics'),
      image: "/lovable-uploads/ea66315b-13e9-4a09-a8cb-c851dc16edff.png"
    },
    {
      title: t('coreProducts.fylleUt.title'),
      description: t('coreProducts.fylleUt.description'),
      icon: <FormInput className="w-12 h-12 text-xala-accent" />,
      metrics: t('coreProducts.fylleUt.metrics'),
      image: "/lovable-uploads/9b91e49d-aca0-47e2-afa3-2544f823e714.png"
    },
    {
      title: t('coreProducts.prinsipro.title'),
      description: t('coreProducts.prinsipro.description'),
      icon: <Building2 className="w-12 h-12 text-xala-accent" />,
      metrics: t('coreProducts.prinsipro.metrics'),
      image: "/lovable-uploads/ae7b22ee-8cf9-494a-9e98-8b5e537bd6c9.png"
    }
  ];

  return (
    <section className="py-20 bg-xala-primary relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-xala-accent mb-4">
            Our Products
          </h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            Innovative AI-powered solutions transforming healthcare, documentation, and architecture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-xala-secondary rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Product image as background with overlay */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  {product.icon}
                  <span className="text-sm text-xala-accent font-semibold">
                    {product.metrics}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-xala-accent">
                  {product.title}
                </h3>
                
                <p className="text-xala-text mb-6">
                  {product.description}
                </p>
                
                <Button
                  variant="outline"
                  className="group w-full bg-transparent border border-xala-accent text-xala-accent hover:bg-xala-accent hover:text-white transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreProducts;