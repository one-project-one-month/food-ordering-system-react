import React from 'react'
import {ArrowLeft,ArrowRight} from "lucide-react"


const ShopList = () => {
  return (
    <div className="h-[300px] bg-green-600 w-[1280px] flex gap-[30px]">
      <div className="text-white flex">
        <div className="">
          <img className="w-[183.463px] h-[224.52px] -rotate-[2.787deg]" src="src/assets/shopListImg/95edf7769844c677545e30dea49f91ca20232a6a.png" alt="" />
        </div>

        <div className="w-[122px] h-[124px]  mt-[68px] -ms-7 z-0 flex flex-col justify-between ">
          <h4 className="text-sm">Today Menu</h4>
          <h2 className="text-base font-semibold font-sans">Shop List</h2>
          <div className="flex gap-[24px]">           
              <button className=" flex justify-center items-center border border-white rounded-full w-8 h-8 hover:bg-white hover:text-green-700 ">
                <ArrowLeft />
              </button>
              <button className=" flex justify-center items-center border border-white rounded-full w-8 h-8 hover:bg-white hover:text-green-700  ">
                <ArrowRight/>
              </button>
            
          </div>
        </div>
      </div>

      {/* shopList */}
      
      <div className="w-[962px] h-[260px] self-center flex gap-5 ">
        <div className=" font-sans w-[120px] bg-white flex-col items-center ms-[7px]  pb-[30px] rounded-full flex gap-5 text-black">
          <img className="w-[120px] h-[120px] rounded-full" src="src/assets/shopListImg/d9583d2dadb1f25f3ee57e9ea7d4182bc6eeadfa.jpg" alt="" />
          <h3 className="leading-5 text-base font-sans font-medium">Beef</h3>
          <p className="leading-5 text-center font-light text-sm">More than 40 different of food</p>
        </div>
        <div className=" font-sans w-[120px] bg-white flex-col items-center  pb-[30px] rounded-full flex gap-5 text-black">
          <img className="w-[120px] h-[120px] rounded-full" src="src/assets/shopListImg/d9583d2dadb1f25f3ee57e9ea7d4182bc6eeadfa.jpg" alt="" />
          <h3 className="leading-5 text-base font-sans font-medium">Beef</h3>
          <p className="leading-5 text-center font-light text-sm">More than 40 different of food</p>
        </div>
        <div className=" font-sans w-[120px] bg-white flex-col items-center  pb-[30px] rounded-full flex gap-5 text-black">
          <img className="w-[120px] h-[120px] rounded-full" src="src/assets/shopListImg/d9583d2dadb1f25f3ee57e9ea7d4182bc6eeadfa.jpg" alt="" />
          <h3 className="leading-5 text-base font-sans font-medium">Beef</h3>
          <p className="leading-5 text-center font-light text-sm">More than 40 different of food</p>
        </div>
        <div className=" font-sans w-[120px] bg-white flex-col items-center  pb-[30px] rounded-full flex gap-5 text-black">
          <img className="w-[120px] h-[120px] rounded-full" src="src/assets/shopListImg/d9583d2dadb1f25f3ee57e9ea7d4182bc6eeadfa.jpg" alt="" />
          <h3 className="leading-5 text-base font-sans font-medium">Beef</h3>
          <p className="leading-5 text-center font-light text-sm">More than 40 different of food</p>
        </div>
        <div className=" font-sans w-[120px] bg-white flex-col items-center  pb-[30px] rounded-full flex gap-5 text-black">
          <img className="w-[120px] h-[120px] rounded-full" src="src/assets/shopListImg/d9583d2dadb1f25f3ee57e9ea7d4182bc6eeadfa.jpg" alt="" />
          <h3 className="leading-5 text-base font-sans font-medium">Beef</h3>
          <p className="leading-5 text-center font-light text-sm">More than 40 different of food</p>
        </div>
        <div className=" font-sans w-[120px] bg-white flex-col items-center  pb-[30px] rounded-full flex gap-5 text-black">
          <img className="w-[120px] h-[120px] rounded-full" src="src/assets/shopListImg/d9583d2dadb1f25f3ee57e9ea7d4182bc6eeadfa.jpg" alt="" />
          <h3 className="leading-5 text-base font-sans font-medium">Beef</h3>
          <p className="leading-5 text-center font-light text-sm">More than 40 different of food</p>
        </div>
        <div className=" font-sans w-[120px] bg-white flex-col items-center  pb-[30px] rounded-full flex gap-5 text-black">
          <img className="w-[120px] h-[120px] rounded-full" src="src/assets/shopListImg/d9583d2dadb1f25f3ee57e9ea7d4182bc6eeadfa.jpg" alt="" />
          <h3 className="leading-5 text-base font-sans font-medium">Beef</h3>
          <p className="leading-5 text-center font-light text-sm">More than 40 different of food</p>
        </div>
      </div>
    </div>
  )
}

export default ShopList