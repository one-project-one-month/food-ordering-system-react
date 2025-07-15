import React from 'react'
import { Link } from 'react-router-dom'

const RestaurantCard = ({restaurant:{id,img,name,rating,address,foundingYear}}) => {
  return (
    
      <Link to={`/restaurant/${name}`}>
      <div className='group border border-green-600 rounded-xl col-span-1 h-[265px] hover:bg-green-600 hover:text-white duration-100 '>
        <div className='flex justify-center  '>
          <img className='w-[125px] h-[125px] shadow-2xl/ rounded-full object-cover' src={img} alt="" />
        </div>
        <div className=' text-sm p-2'>
          <h2 className='  text-center text-green-600 text-base mb-2 group-hover:text-white'>{name}</h2>
          <span className='text-base font-medium mr-4'>rating:</span><span>({rating})</span>
          <div className='flex items-baseline'>
            <div className='text-base font-medium'>location:</div><div>{address}</div>
          </div>
          <span className='text-base font-medium mr-6'>Since:</span><span>{foundingYear}</span>
        </div>
      </div>
      </Link>
  
  )
}

export default RestaurantCard