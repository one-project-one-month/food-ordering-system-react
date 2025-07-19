import { useState } from "react";

import TabPanel from "../../../components/TabPanel"
import { Card, CardHeader } from "../../../components/ui/card";
import AdminLogin from "./child/AdminLogin";
import UserLogin from "./child/UserLogin";
import ShopOwnerLogin from "./child/ShopOwnerLogin";
import DeliveryStaffLogin from "./child/DeliveryStaffLogin";

const LOGIN_TABS = [
	{ label: "Admin", value: "admin" },
	{ label: "User", value: "user" },
	{ label: "Shop Owner", value: "shop_owner" },
	{ label: "Delivery Staff", value: "delivery_staff" },
]

const Login = () => {
	const [activeTab, setActiveTab] = useState(LOGIN_TABS[0].value);

	return (
		<div className="flex justify-center items-center">
			<Card className="mx-3 my-12 md:px-10 pb-14">
				<CardHeader className="mb-5">
					<TabPanel tabs={LOGIN_TABS} value={activeTab} onChange={setActiveTab} />
				</CardHeader>
				{activeTab === LOGIN_TABS[0].value && <AdminLogin />}
				{activeTab === LOGIN_TABS[1].value && <UserLogin />}
				{activeTab === LOGIN_TABS[2].value && <ShopOwnerLogin />}
				{activeTab === LOGIN_TABS[3].value && <DeliveryStaffLogin />}
			</Card>
		</div>
	)
}

export default Login
