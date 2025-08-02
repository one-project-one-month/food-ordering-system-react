import { ShoppingCart, Truck, BadgeCheck } from 'lucide-react';

const Feature = () => {
  const features = [
    {
      title: "Easy to Order",
      icon: <ShoppingCart className="w-12 h-12 text-primary" />,
      description: "Order your favorite meals from your favorite restaurant.",
    },
    {
      title: "Fast Delivery",
      icon: <Truck className="w-12 h-12 text-primary" />,
      description: "We deliver hot and fresh food in record time straight to your door.",
    },
    {
      title: "Best Service",
      icon: <BadgeCheck className="w-12 h-12 text-primary" />,
      description: "Our friendly team is always here to ensure a smooth experience.",
    },
  ];

  return (
    <div className="pb-2 pt-12 text-center">
      <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 flex flex-col items-center text-center"
          >
            <div className="bg-lightGreen rounded-full p-4 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
