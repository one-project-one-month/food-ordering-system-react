
import ShopList from "../../components/shopList/ShopList"
import Banner from "../../components/Banner"
import Cities from "../../layout/Cities"
import Feature from "../feature/Feature"
import Cookies from "js-cookie"
import SignUpOptions from "../signupOptions/SignupOptions"
import { motion } from "framer-motion"

const Home = () => {
  const userRole = Cookies.get('role') ?? ''
  return (
    <motion.div className="bg-white" initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <Banner/>
      {userRole !== '' ?  <ShopList /> : <SignUpOptions/>}
      <Feature/>
      <Cities/>  
    </motion.div>
  )
}

export default Home
