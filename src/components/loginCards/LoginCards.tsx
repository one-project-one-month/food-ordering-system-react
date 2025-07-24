import React from 'react'
import { Link } from "react-router-dom"

const LoginCards = () => {
  return (
    <div className='container w-full '>
        <div className='h-[300px] w-[1136px] mx-auto flex gap-6 justify-between'>
             <Link to={"/signup"}>
                    <div className='h-[300px] bg-slate-50 '>
                        <div>
                            <img className='w-[380px]' src="src/assets/logincardsimg/88d55f7112efe55f.webp" alt="" />
                        </div>
                        <div className='font-sans tracking-widest'>
                            <p className=' text-2xl font-bold'>Feed your employees</p>
                            <p className='underline text-sm font-medium  '>Create a business account</p>
                        </div>
                    </div>
             </Link>
              <Link to={"/signup"}>
                    <div className='h-[300px]'>
                        <div>
                            <img className='w-[380px]' src="src/assets/logincardsimg/711d51ca1b458931.webp" alt="" />
                        </div>
                        <div className='font-sans tracking-widest'>
                            <p className=' text-2xl font-bold'>Your restaurant,delivered</p>
                            <p className='underline text-sm font-medium  '>Add your restaurant</p>
                        </div>
                    </div>
              </Link>    
              <Link to={"/signup"}> 
                <div className='h-[300px]'>
                    <div>
                        <img className='w-[380px]' src="src/assets/logincardsimg/16522a701585873b.webp" alt="" />
                    </div>
                    <div className='font-sans tracking-widest'>
                        <p className=' text-2xl font-bold'>Deliver with us</p>
                        <p className='underline text-sm font-medium  '>Sign up to delivery</p>
                    </div>
                </div>   
              </Link> 
        </div>
    </div>
  )
}

export default LoginCards