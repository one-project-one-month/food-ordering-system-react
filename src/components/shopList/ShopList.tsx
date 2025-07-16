import { Link } from "react-router-dom"
import { restaurants } from "../../data/restaurant"
import { useRef} from "react"
import {ArrowLeft,ArrowRight} from "lucide-react"

const ShopList = () => {
  // const [currentPage,setCurrentPage] = useState(1)

  // const listPerPage = 6
  // const lastIndex = listPerPage * currentPage
  // const firstIndex = lastIndex - listPerPage
const scrollRef = useRef<HTMLDivElement | null>(null);
const itemRef = useRef<HTMLAnchorElement | null>(null);

  const scrollLeft = () => {
    if (scrollRef.current && itemRef.current) {
      const itemWidth = itemRef.current.offsetWidth + 20;
      scrollRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && itemRef.current) {
      const itemWidth = itemRef.current.offsetWidth + 20;
      scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  };

  const shops = restaurants;
  // const shops = restaurants?.slice(firstIndex,lastIndex)
  // const totalPages = Math.ceil(restaurants.length/listPerPage)

  return (
    <div className="w-full bg-green-600 ">
      <div className="h-[300px] container flex gap-[80px]">
        <div className="text-white flex">
          <div className="">
            <img className="w-[183.463px] h-[224.52px] -rotate-[2.787deg]" src="src/assets/shopListImg/95edf7769844c677545e30dea49f91ca20232a6a.png" alt="" />
          </div>

          <div className="w-[122px] -ms-7 z-0 flex flex-col justify-center gap-4">
            <h4 className="text-sm font-lobster text-white">Today Menu</h4>
            <h2 className="text-base font-semibold text-white font-sans">Shop List</h2>
            {/* <ShopListPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages} /> */}
              <div className="flex gap-[24px]">
                <button onClick={scrollLeft} className="flex justify-center items-center border border-white rounded-full w-8 h-8 hover:bg-white hover:text-green-700 "><ArrowLeft /></button>
                <button onClick={scrollRight} className="flex justify-center items-center border border-white rounded-full w-8 h-8 hover:bg-white hover:text-green-700 "><ArrowRight/></button>
              </div>
          </div>
        </div>
        {/* shopList */}  
        <div ref={scrollRef} 
        className="h-[260px] self-center flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar transition-all duration-500"
        style={{width: '100%', gap: '20px'}}
        >
          {shops.map((restaurant,index)=><Link to={`/restaurant/${restaurant.name}` } 
            key={restaurant.id}
            ref={index === 0 ? itemRef : null }
            className="font-sans w-[140px] min-w-[140px] bg-white flex-col items-center ms-[7px]  pb-[30px] rounded-full
                      flex gap-5 text-black"
            >
              <img className="w-[120px] h-[120px] rounded-full" src={restaurant.img} alt="" />
              <h3 className="leading-5 text-base text-center px-2 font-sans font-medium">{restaurant.name}</h3>
              <p className="leading-5 text-center font-light px-2 text-sm">More than 40 different of food</p>
          </Link>)}
        </div>
      </div>
    </div>
  )
}

export default ShopList