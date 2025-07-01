import type { ErrorPageProps } from '../../types/errorPage.types'

const Error = ({ errorType }: ErrorPageProps) => {
  return (
    <div>
      <h1>Error: {errorType}</h1>
    </div>
  )
}

export default Error
