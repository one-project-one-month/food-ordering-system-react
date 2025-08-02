import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import OwnerImage from '../../assets/owner.png'
import DeliveryImage from '../../assets/delivery.png'
import CustomerImage from '../../assets/customer.png'

const cardData = [
  {
    title: "Feed your employees",
    subtitle: "Create an account as customer",
    image: OwnerImage,
    link: "/signup",
  },
  {
    title: "Your restaurant, delivered",
    subtitle: "Sign up to add your restaurant",
    image: CustomerImage,
    link: "/signup",
  },
  {
    title: "Deliver with Sar Mal",
    subtitle: "Sign up to deliver",
    image: DeliveryImage,
    link: "/signup",
  },
];

export default function SignUpOptions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {cardData.map((card, idx) => (
        <Card
          key={idx}
          onClick={() => void navigate(card.link)}
          className="cursor-pointer hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={card.image}
            alt={card.title}
            className="h-48 w-full object-cover rounded-t-md"
          />
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg">{card.title}</h2>
            <p className="text-sm text-muted-foreground underline">{card.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
