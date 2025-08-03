import { Card } from "../../../components/ui/card";
import ShopOwnerLogin from "./child/ShopOwnerLogin";
import { motion } from "framer-motion"

const Login = () => {
	return (
		<motion.div className="flex justify-center items-center" initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}>
			<Card className="mx-3 my-12 md:px-10 pb-2">
				<ShopOwnerLogin />
			</Card>
		</motion.div>
	)
}

export default Login
