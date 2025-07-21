import React from 'react'
import { MapPinHouse,Calendar,Star,Clock } from "lucide-react"
import { Link } from 'react-router-dom'

const RestaurantCard = ({restaurant:{id,img,name,rating,address,foundingYear}}) => {
  return (
    
      <Link to={`/restaurant/${name}`}>
      <div className=' rounded-t-sm shadow-xl col-span-1 w-[277px] h-[285px] '>

         {/* IMG */}
          <div className='flex justify-center w-[277px] h-[183px] '>
            <img className='w-[100%] rounded-t-sm  object-cover' src={img} alt="" />
          </div>

          <div className='flex items-center'>
            <div className=' text-sm w-full  p-2'>
              {/* name and rating */}
              <div className='flex  items-baseline  justify-between'>
                <h2 className=' text-black text-sm font-semibold mb-1'>{name}</h2>
                <div className=' flex items-center'>
                  <Star className='w-3 h-3 stroke-orange-600 fill-orange-600' /><span className='text-[10px] font-light'>({rating})</span>
                </div>
              </div>
              {/* stats */}
              <div className='flex gap-2 items-center '>
                <MapPinHouse className='w-3 h-3' />
                <span className='text-[10px] font-light'>{address}</span>
              </div>
              <div className='flex gap-2 items-center'>
                <Calendar className='w-3 h-3' />
                <span className='text-[10px] font-light'>{foundingYear}</span>
              </div>
              <div className='flex gap-2 items-center'>
                <Clock className='w-3 h-3' />
                <span className='text-[10px] font-light'>9 Am - 5 Pm</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
  
  )
}

export default RestaurantCard