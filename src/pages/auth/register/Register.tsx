import { useState } from "react";

import TabPanel from "../../../components/TabPanel"
import UserRegister from "./child/UserRegister";
import ShopOwnerRegister from "./child/ShopOwnerRegister";
import DeliveryStaffRegister from "./child/DeliveryStaffRegister";
import { Card, CardHeader } from "../../../components/ui/card";

const REGISTER_TABS = [
  { label: "User", value: "user" },
  { label: "Shop Owner", value: "shop_owner" },
  { label: "Delivery Staff", value: "delivery_staff" },
]

const Register = () => {
  const [activeTab, setActiveTab] = useState(REGISTER_TABS[0].value);

  return (
    <div className="flex justify-center items-center">
      <Card className="mx-3 my-12 md:px-10 pb-14">
        <CardHeader className="mb-5">
          <TabPanel tabs={REGISTER_TABS} value={activeTab} onChange={setActiveTab} />
        </CardHeader>
        {activeTab === REGISTER_TABS[0].value && <UserRegister />}
        {activeTab === REGISTER_TABS[1].value && <ShopOwnerRegister />}
        {activeTab === REGISTER_TABS[2].value && <DeliveryStaffRegister />}
      </Card>
    </div>
  )
}

export default Register
