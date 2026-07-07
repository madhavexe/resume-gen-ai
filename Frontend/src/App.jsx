import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"


const App = () => {
  return (
    <AuthProvider>
      <AuthProvider router={router} />
    </AuthProvider>
  )
}

export default App