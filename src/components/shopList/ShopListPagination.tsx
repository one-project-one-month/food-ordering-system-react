import {ArrowLeft,ArrowRight} from "lucide-react"


const ShopListPagination = ({currentPage,setCurrentPage,totalPages}:any) => {
    const  onNextHandler = () => {
    setCurrentPage(+currentPage + 1)
    }
    const  onPrevHandler = () => {
    setCurrentPage(currentPage - 1)
    }
  return (
    <div className="flex gap-[24px]">           
                  <button
                     onClick={onPrevHandler}
                     disabled={currentPage===1}
                     className=" flex justify-center items-center border border-white rounded-full w-8 h-8 hover:bg-white hover:text-green-700 ">
                        <ArrowLeft />
                    </button>
                  <button 
                    onClick={onNextHandler} 
                    disabled={currentPage===totalPages}
                    className=" flex justify-center items-center border border-white rounded-full w-8 h-8 hover:bg-white hover:text-green-700  ">
                        <ArrowRight/>
                  </button>
                
    </div>
  )
}

export default ShopListPagination