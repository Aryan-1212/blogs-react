import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { Login } from './components/index.js'
import Signup from './components/Signup.jsx'

const Layout = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Route>
    )
  )

  return (
    <StrictMode>
      <Provider store={store}>
        {/* <App /> */}
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Layout />)
