import { useDispatch } from "react-redux"
import { showAlert, unShowAlert } from "@/app/rootReducer"

function useAlert() {
  const dispatch = useDispatch()
  const alert = (message, type) => {
    dispatch(showAlert({message, type}))
    setTimeout(() => dispatch(unShowAlert()), 3000)
  }
  return alert
}

export default useAlert;