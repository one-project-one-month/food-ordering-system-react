
import ShopList from "../../components/shopList/ShopList"
import Banner from "../../components/Banner"
import Cities from "../../layout/Cities"
import Feature from "../feature/Feature"

const Home = () => {
  return (
    <div className="bg-white">
      <Banner/>
      <ShopList />
      <Feature/>
      <Cities/>  
    </div>
  )
}

export default Home
