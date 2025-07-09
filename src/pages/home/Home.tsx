
import type { HomePageProps } from "../../types/homePage.types"
import ShopList from "../../components/ShopList"
import Banner from "../../components/Banner"

const Home = ({homeType}:HomePageProps) => {
  return <div>
     <Banner/>
     <ShopList />
  </div>
}

export default Home
