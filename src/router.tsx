//ROUTER
import { createBrowserRouter } from "react-router-dom" //react-router-dom
import Layout from "./layouts/Layout"
import Products, { loader as productsLoader, action as updateAvailabilityAction } from "./views/Products"
import NewProduct, { action as newProductAction } from "./views/NewProduct"
import EditProduct, { loader as editProductLoader, action as editProductAction } from "./views/EditProduct"
import { action as deleteProductAction } from "./components/ProductDetails"

/*
Nueva API de enrutamiento de react-router-dom v6.4+

createBrowserRouter: Es una función que crea el router para aplicaciones de navegador (usa el history API). 
Forma parte de la nueva estructura declarativa de rutas en react-router-dom.

-path: '/': Esta es la ruta base de la aplicación.

-element: <Layout />: Este componente se renderiza siempre que estés dentro de este path. 
Suele usarse para el layout general (navbar, footer, etc.).

-children: Aquí defines las rutas anidadas que se muestran dentro del layout.

    -index: true: Indica que esta es la ruta por defecto cuando se accede a '/'.
    -Renderiza el componente <Products /> dentro de <Layout />.

    -path: 'productos/nuevo': Esta es una ruta anidada.
    -Renderiza el componente <NewProduct /> dentro de <Layout />.

    -action: Indica la función asociada a la ruta que se ejecuta automáticamente 
    cuando un formulario con method="post, put, patch o delete" es enviado desde esa ruta.

-Action
"Cuando alguien navegue a /productos/nuevo, quiero que se renderice el componente <NewProduct />, y si 
se envía un formulario desde esta ruta con method="post" (usando el componente <Form> de react-router-dom), 
entonces ejecuta la función newProductAction."

-Loader
"Cuando alguien navegue a la ruta / (ruta index), quiero que se renderice el componente <Products />, 
y antes de que se muestre ese componente, se debe ejecutar la función productsLoader para obtener 
los datos necesarios."
*/

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                /*
                ROA Pattern (Resource-Oriented Architecture Pattern)
                Es un enfoque comúnmente usado en diseño de APIs RESTful.
                Es un patrón de arquitectura basado en recursos, y se alinea mucho con los principios REST.
                Básicamente, en lugar de centrarte en acciones (como getUser, createOrder, etc.), se enfoca 
                en recursos (users, orders, products, etc.) y utilizas los métodos HTTP (GET, POST, PUT, DELETE) 
                para operar sobre ellos.

                1) Cada cosa que se quiere manejar es un recurso
                    -usuarios, productos, facturas → /users, /products, /invoices.
                2) Usa URIs claras y predecibles
                    -/products → colección de productos
                    -/products/123 → recurso específico
                3) Usa los métodos HTTP correctamente
                    -GET /products → obtener todos
                    -POST /products → crear uno nuevo
                    -GET /products/123 → obtener uno
                4)Representaciones estándar
                Generalmente JSON o XML para representar los datos del recurso.
                5) Stateless
                Cada petición debe contener la información necesaria. 
                No se guarda estado en el servidor entre llamadas.

                -:id: Parámetro dinámico
                */
                path: 'productos/:id/editar',
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'product/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
]);