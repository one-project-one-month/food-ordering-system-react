import type { ErrorPageProps } from '../../types/errorPage.types'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Error = ({ errorType }: ErrorPageProps) => {
  const navigate = useNavigate()
  const userRole = (Cookies.get('role') || 'user').toLowerCase();

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: "calc(100vh - 140px)" }}>
        <h1 className="text-[7rem] font-extrabold text-primary leading-[normal] select-none">Oops!</h1>
        <h2 className="text-2xl font-bold mb-4">{
          errorType==='404' ? '404 - Page Not Found' : '403 - Forbidden'
        }</h2>
        
        <p className="mb-8 max-w-md text-center text-gray-600">
          {errorType==='404' ? `Sorry, the page you are looking for doesn't exist or has been moved.` : `Sorry, You don't have access to this page.`}
        </p>
        <Button
          variant="default"
          size="sm"
          className="text-sm rounded-full h-[36px] py-3"
          onClick={() =>      
               navigate(userRole==='user'? '/' : '/dashboard' )
          }
        >
           Go Back Home
        </Button>
      </div>
    </div>
  )
}

export default Error
