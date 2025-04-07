//COMPONENT PRODUCT DETAILS
import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"
import { FormEvent } from "react"

/*
Nueva API de enrutamiento de react-router-dom v6.4+

useNavigate(): Es un hook que te permite navegar programáticamente dentro de la aplicación, 
como si estuvieras usando window.location.href, pero sin recargar la página.
Se usa cuando se necesita navegar como resultado de una acción lógica: después de enviar 
un formulario, al completar un proceso, después de un login, etc.

Estructura: navigate(to: string, options?: NavigateOptions)
-NavigateOptions {
    replace?: boolean;
    state?: any;
}
    -replace: Reemplaza la entrada actual del historial en lugar de agregar una nueva.
    -state: Permite pasar datos a la siguiente ruta, sin necesidad de usar URL params ni query strings.
    Los datos solo viven en memoria mientras navegas por la SPA.
    Para acceder al state se utiliza el hook useLocation() de react-router-dom.
        -useLocation() es un hook de React Router que te permite acceder al objeto de ubicación actual, 
        es decir, te da información sobre la URL actual, y cualquier estado (state) que se haya pasado 
        con navigate().
            1)pathname: La ruta actual (/productos/1/editar)
            2)search: Los query params (?q=silla)
            3)hash: El fragmento de URL después de #
            4)state: Los datos que se pasaron con navigate(..., { state })
            5)key: Un identificador único de navegación (para React Router)


Diferencias:
Link: Menús, botones de navegación
useNavigate: Después de acciones
*/

/*
useFetcher(): Es un hook de React Router que te permite hacer envíos tipo formulario o cargar datos, 
pero sin afectar la navegación actual (es decir, sin redirecciones ni cambios de ruta).
    -Actualizar un estado como "activo/inactivo".
    -Marcar algo como "leído" o "favorito".
    -Enviar un formulario sin cambiar de ruta.
    -Hacer GET, POST, PUT, etc., sin usar navigate.
Componente:  <fetcher.Form />
*/

//Type
type ProductDetailsProps = {
    product: Product
}

//Action
export const action = async ( { params } : ActionFunctionArgs ) => {
    if(params.id !== undefined) {
        await deleteProduct(+params.id);
        
        return redirect('/');
    };
}

const ProductDetails = ( { product } : ProductDetailsProps ) => {
    //Hook
    const fetcher = useFetcher();
    const navigate = useNavigate();

    //Constantes
    const isAvailability = product.availability;

    //funciones
    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        if(!confirm('Eliminar')) {
            e.preventDefault();
        }
    }

    //--VIEW--//
    return (
        <tr className="border-b">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>

            <td className="p-3 text-lg text-gray-800">
                { formatCurrency(product.price) }
            </td>

            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button 
                        type="submit" 
                        name="id" 
                        value={product.id}
                        className={`${isAvailability ? 'text-black' : 'text-red-600'}
                        p-2 rounded-lg text-xs uppercase font-bold w-full border border-black-100
                        cursor-pointer hover:bg-slate-50`}    
                    >
                        {isAvailability ? 'Disponible' : 'Agotado'}
                    </button>
                </fetcher.Form >
            </td>

            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex items-center gap-2">
                    <button className="w-full p-2 uppercase font-bold text-xs text-center rounded-lg 
                    bg-indigo-600 text-white hover:bg-indigo-500" 
                    onClick={() => navigate(`productos/${product.id}/editar`)}>
                        Editar
                    </button>

                    {/*
                    “Cuando este formulario se envíe (submit), haz una petición HTTP POST a la ruta 
                    /product/:id/eliminar y ejecuta el action() asociado a esa ruta en React Router”
                    */}
                    <Form method="POST" action={`product/${product.id}/eliminar`} className="w-full"
                    onSubmit={ e => handleSubmit(e) }>
                        <input 
                            type="submit" 
                            value="Eliminar"
                            className="w-full p-2 uppercase font-bold text-xs text-center rounded-lg 
                            bg-red-600 text-white cursor-pointer hover:bg-red-500"
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}

export default ProductDetails