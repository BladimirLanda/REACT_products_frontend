import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'

/*
Nueva API de enrutamiento de react-router-dom v6.4+

-<RouterProvider/>: Es el componente principal del sistema de rutas en la nueva API de react-router-dom (v6.4+). 
Se encarga de inyectar el router que creaste con createBrowserRouter para que toda la app pueda acceder a las 
rutas, navegar entre ellas, usar hooks (useNavigate, useParams, etc.), y renderizar los componentes adecuados 
según la URL.

-router: Objecto declarado a partir de la función createBrowserRouter()
*/

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
