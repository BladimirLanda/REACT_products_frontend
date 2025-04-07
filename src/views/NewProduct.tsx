//COMPONENT NEW PRODUCT
import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import { addProduct } from "../services/ProductService"
import ErrorMessage from "../components/ErrorMessage"
import ProductForm from "../components/ProductForm";

/*
Nueva API de enrutamiento de react-router-dom v6.4+

Actions: Son funciones que puedes asociar a una ruta para manejar lógica cuando se envía un formulario 
o se dispara una acción tipo POST, PUT, DELETE, etc.
Es una función que se define en la configuración del router y se ejecuta cuando un formulario 
asociado a esa ruta es enviado (usando method="post" por ejemplo). Se usa típicamente para crear, 
editar o eliminar datos.

Loaders: Son funciones que se ejecutan antes de que se renderice un componente de ruta, y se usa 
para cargar datos necesarios para esa vista.
    -Es como hacer un fetch() antes de que el componente se muestre
    -Su resultado está disponible dentro del componente usando el hook useLoaderData()
¿Cuál es el flujo?
    -El usuario navega a una ruta
    -React Router detecta que esa ruta tiene un loader
    -Ejecuta la función loader antes de renderizar el componente
    -Cuando el loader termina, renderiza el componente con los datos listos
    -Puedes acceder a esos datos usando useLoaderData()


1) loader: Cargar datos antes de renderizar
2) action: Procesar formularios o acciones (POST, PUT, etc.)

<Form />: Componente especial que reemplaza al <form> tradicional de HTML cuando estás trabajando 
con loaders y actions. Tiene:
    -Integra automáticamente con el router
    -Dispara el action de la ruta actual (o una ruta específica que tú definas)
    -Puedes usar métodos HTTP como post, put, delete, etc
    -No necesitas onSubmit ni useNavigate manualmente
    -Se comporta igual que un formulario HTML, pero con mejoras propias de React Router
¿Qué pasa en el submit?
    -Se envía el formulario con method="post".
    -React Router detecta esto
    -Busca el action correspondiente a la ruta actual
    -Ejecuta ese action y le pasa el {request} con los datos del formulario
*/

/*
Función Action/Loader
-actionArgs: Objeto con información sobre la petición que disparó el formulario.
-actionArgs.request / {request}: Contiene el cuerpo del formulario, headers, método, etc.

-ActionFunctionArgs: Es un tipo exportado por React Router, que describe qué props 
recibe una función action. Incluye:
type ActionFunctionArgs = {
  request: Request; ← los datos del formulario, método, headers...
  params: Params<string>; ← parámetros dinámicos de la URL (si hay)
};
    *LoaderFunctionArgs

-.formData(): Lee los datos del formulario enviado, devuelve un objeto tipo FormData.
ej. FormData {'nombre' => 'Mesa', 'precio' => '200'}

-Object.fromEntries(): Convierte un objeto tipo FormData (objeto especial lista clave/valor) 
en un objeto JavaScript normal con un tipado especial de FormData.

-useActionData(): hook de react-router-dom que te da acceso a los datos que retornó la 
función de action después de que se envió un formulario. Se usa dentro del componente 
donde se ha enviado el formulario. Se reinicia al volver a la ruta porque se limpia 
entre montaje. 
    *-useLoaderData()
*/

//Action
export const action = async ( { request } : ActionFunctionArgs ) => {
    let error = '';
    const data = Object.fromEntries( await request.formData() );

    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }

    if(error.length) {
        return error;
    }

    await addProduct(data);

    //redirect('ruta'): Función de redireccionamiento de react-router-dom
    //--devuelve un objeto parecido a una Response de navegador, con un status 302 (redirección)
    return redirect('/'); // ← Mejor práctica para navegación post-envío
}

function NewProduct() {
    //ACTION
    const error = useActionData() as string;

    //---VIEW---//
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Registrar Producto
                </h2>

                <Link to="/" className="p-3 h-10 md:h-auto whitespace-nowrap flex items-center justify-center 
                text-sm text-center font-bold text-white shadow-sm rounded-md bg-indigo-600 hover:bg-indigo-500">
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage color="bg-red-600">{error}</ErrorMessage>}

            <Form method="POST" className="mt-10">
                <ProductForm />

                <input
                type="submit"
                value="Registrar Producto"
                className="mt-5 w-full p-2 font-bold text-lg rounded bg-indigo-600 text-white cursor-pointer"
                />
            </Form>
        </>
    )
}

export default NewProduct