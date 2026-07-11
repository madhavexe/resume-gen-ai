import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { useEffect } from "react"
import {InterviewProvider} from './features/interview/interview.context.jsx'


const App = () => {

   useEffect(() => {
        console.log('first')
    },[])
  return (
    <AuthProvider>
      <InterviewProvider>
      <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App