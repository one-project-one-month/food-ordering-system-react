
import ShopList from "../../components/shopList/ShopList"
import Banner from "../../components/Banner"
import Cities from "../../layout/Cities"
import Feature from "../feature/Feature"
import Cookies from "js-cookie"

const Home = () => {
  const userRole = Cookies.get('role') ?? ''
  return (
    <div className="bg-white">
      <Banner/>
      {userRole !== '' &&  <ShopList />}
      <Feature/>
      <Cities/>  
    </div>
  )
}

export default Home
