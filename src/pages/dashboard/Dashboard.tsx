import Cookies from "js-cookie"
import OwnerDashboard from "./OwnerDashboard"
import DeliveryDashboard from "./DeliveryDashboard"

const Dashboard = () => {
  const userRole = Cookies.get('role')

  return (
    <>
      {userRole === 'owner' ? <OwnerDashboard/> : userRole === 'delivery' ? <DeliveryDashboard/> : <>admin</>}
    </>
  )
}

export default Dashboard
