import { Card } from "../../../components/ui/card";
import ShopOwnerLogin from "./child/ShopOwnerLogin";

const Login = () => {
	return (
		<div className="flex justify-center items-center">
			<Card className="mx-3 my-12 md:px-10 pb-2">
				<ShopOwnerLogin />
			</Card>
		</div>
	)
}

export default Login
