
import ShopList from "../../components/shopList/ShopList"
import Banner from "../../components/Banner"
import LoginCards from "../../components/loginCards/LoginCards"

const Home = () => {
  return (
    <div className="bg-mainBg">
      <Banner/>
      <LoginCards />
      <ShopList />
    </div>
  )
}

export default Home
