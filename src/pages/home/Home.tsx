import type { HomePageProps } from "../../types/homePage.types"
import ShopList from "../../components/ShopList"


const Home = ({homeType}:HomePageProps) => {
  return <div>
    <ShopList />
  </div>
}

export default Home
