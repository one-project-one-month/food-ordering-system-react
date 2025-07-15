import { Link } from "react-router-dom"
import { restaurants } from "../../data/restaurant"
import ShopListPagination from "./ShopListPagination"
import { useState } from "react"

const ShopList = () => {

  const [currentPage,setCurrentPage] = useState(1)

  const listPerPage = 6
  const lastIndex = listPerPage * currentPage
  const firstIndex = lastIndex - listPerPage


  const shops = restaurants?.slice(firstIndex,lastIndex)
  const totalPages = Math.ceil(restaurants.length/listPerPage)



  return (
    <div className="h-[300px] bg-green-600 w-full flex gap-[60px]">
      <div className="text-white flex">
        <div className="">
          <img className="w-[183.463px] h-[224.52px] -rotate-[2.787deg]" src="src/assets/shopListImg/95edf7769844c677545e30dea49f91ca20232a6a.png" alt="" />
        </div>

        <div className="w-[122px] h-[124px]  mt-[68px] -ms-7 z-0 flex flex-col justify-between ">
          <h4 className="text-sm">Today Menu</h4>
          <h2 className="text-base font-semibold font-sans">Shop List</h2>
          <ShopListPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages} />
        </div>
      </div>

      {/* shopList */}
      
      <div className=" h-[260px] self-center flex gap-5 ">
        {shops.map(restaurant=><Link to={`/restaurant/${restaurant.name}`} 
          key={restaurant.id}
          className=" font-sans w-[120px] bg-white flex-col items-center ms-[7px]  pb-[30px] rounded-full
                    flex gap-5 text-black"
          >
            <img className="w-[120px] h-[120px] rounded-full" src={restaurant.img} alt="" />
            <h3 className="leading-5 text-base text-center font-sans font-medium">{restaurant.name}</h3>
            <p className="leading-5 text-center font-light text-sm">More than 40 different of food</p>
        </Link>)}

      </div>
    </div>
  )
}

export default ShopList