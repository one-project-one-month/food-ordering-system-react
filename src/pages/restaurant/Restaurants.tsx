import React,{ useState } from 'react'
import RestaurantCard from '../../components/restaurantsCard/RestaurantCard';
import { resCategories, restaurants } from '../../data/restaurant';
import RestaurantsCategories from '../../components/restaurantsCard/RestaurantsCategories';



const Restaurants = () => {

  const[current,setCurrent] = useState({newList:false,data:null,type:"all"})

  console.log(current);
  
    
    return(
       <div className='w-[90%] mx-auto'> 
          <div className="flex gap-4">
            {resCategories.map((category) => (
                  <RestaurantsCategories
                    key={category.id}
                    setCurrent={setCurrent}
                    current={current}
                    category={category}
                  />
            ))}
        </div>

          <div className='grid grid-cols-4  gap-5 py-2'>
              {current.newList ? current.data.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                )) 
                : 
                restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
          </div>
    </div>)
} 

export default Restaurants