//VIEW PRODUCTS
import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, patchProduct } from "../services/ProductService"
import { Product } from "../types";
import ProductDetails from "../components/ProductDetails";

/*
Nueva API de enrutamiento de react-router-dom v6.4+

<Link />: Es un componente de React Router que reemplaza al <a href=""> tradicional del HTML. 
Se usa para navegar dentro de tu aplicación sin hacer una recarga completa del navegador.

    -to="ruta/": Indica la ruta a la que debe navegar cuando se da clic.
*/

//Loader
export async function loader() {
    const products = await getProducts();

    return products;
}

//Action
export async function action( { request } : ActionFunctionArgs ) {
    const data = Object.fromEntries( await request.formData() );

    await patchProduct(+data.id);

    return null; // ← No necesitas redirecciona
}

function Products() {
    //LOADER
    const productsData = useLoaderData() as Product[];

    //---VIEW---//
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Productos
                </h2>

                <Link to="productos/nuevo" className="p-3 text-sm font-bold text-white shadow-sm rounded-md 
                bg-indigo-600 hover:bg-indigo-500">
                    Agregar Producto
                </Link>
            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto"> {/*table-auto: Calculo ancho de columnas*/}
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsData.map(product => (
                            <ProductDetails key={product.id} product={product} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Products