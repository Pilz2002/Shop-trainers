import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCurrUrl } from "@/Pages/pagesSlice"

function WrapperPage({ children }) {
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch(getCurrUrl(location.pathname))
  }, [location.pathname, dispatch])

  return ( 
    <div>{children}</div>
  );
}

export default WrapperPage;