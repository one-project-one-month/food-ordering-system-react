import React  from 'react'
import { resCategories, restaurants } from '../../data/restaurant'
import { Button } from '../ui/button'



const RestaurantsCategories = ({category:{id,name},setCurrent,current}) => {

  


  const onClickHandler = (name)=>{
        if(name != "popular"){
          setCurrent({type:name})         
        }else{
          const popular = [...restaurants].sort((a,b) =>b.rating -a.rating)
          setCurrent({newList:true,data:popular, type:name})                    
        }
        }

  return <button
            onClick={onClickHandler.bind(null,name)}
            className={`border border-green-600 rounded-full px-3 py-1 text-sm  font-medium ${current.type==name && "bg-green-600 text-white"}`} >
              {name}
          </button>
 
}

export default RestaurantsCategories