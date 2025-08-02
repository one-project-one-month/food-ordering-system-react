import { Separator } from "../../components/ui/separator"
import { motion } from "framer-motion"

const About = () => {
  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 mt-10 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">About Sar Mal</h2>
        <Separator />

        <p className="text-gray-600 text-base leading-relaxed">
          <strong>Sar Mal</strong> is a modern food ordering and delivery platform built to connect hungry customers
          with their favorite local restaurants in the fastest, most seamless way possible.
          We believe food brings people together — and we’re here to make that easier, tastier, and smarter.
        </p>

        <p className="text-gray-600 text-base leading-relaxed">
          Whether you're a restaurant owner looking to reach more customers, or a foodie craving something delicious,
          Sar Mal is your go-to solution. With powerful tools, real-time order tracking, and smart analytics,
          our platform empowers restaurant partners and delivers a frictionless experience for users.
        </p>

        <p className="text-gray-600 text-base leading-relaxed">
         For our delivery users, we offer more than just order fulfillment. You can apply directly to restaurant after login and manage deliveries.</p>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <Separator />
          <p className="text-gray-600 text-base leading-relaxed mt-2">
            To simplify food ordering, support local businesses, and create meaningful digital dining experiences
            for everyone — one meal at a time.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
