import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"
import LoadingSpinner from "../../../components/LoadingSpinner"

const Protected = ({children}) => {

    const {loading, user} = useAuth()

    if(loading) {
        return <LoadingSpinner message="Loading your interview plan..." />
    }

    if(!user){
        return <Navigate to={'/login'} />
    }

  return children
}

export default Protected