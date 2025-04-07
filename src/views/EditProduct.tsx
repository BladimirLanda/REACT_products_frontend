//COMPONENT EDIT PRODUCT
import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { Product } from "../types";
import { getProductById, updateProduct } from "../services/ProductService"
import ErrorMessage from "../components/ErrorMessage"
import ProductForm from "../components/ProductForm";

//Loader
export const loader = async ( { params } : LoaderFunctionArgs ) => {
    let product;

    if(params.id !== undefined) {
        product = await getProductById(+params.id);

        if(!product) {
            return redirect('/');
        }

        return product;
    }
}

//Action
export const action = async ( { request, params } : ActionFunctionArgs ) => {
    let error = '';
    const { id } = params;
    const data = Object.fromEntries( await request.formData() );

    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }

    if(error.length) {
        return error;
    }

    if(id !== undefined) {
        await updateProduct(data, +id);
        
        return redirect('/');
    }
}

//Disponibilidad
const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
 ]

function EditProduct() {
    //LOADER
    const productData = useLoaderData() as Product;

    //ACTION
    const error = useActionData() as string;

    //---VIEW---//
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Editar Producto
                </h2>

                <Link to="/" className="p-3 h-10 md:h-auto whitespace-nowrap flex items-center justify-center 
                text-sm text-center font-bold text-white shadow-sm rounded-md bg-indigo-600 hover:bg-indigo-500">
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage color="bg-red-600">{error}</ErrorMessage>}

            <Form method="POST" className="mt-10">
                <ProductForm  productData={productData} />

                <div className="mb-4">
                    <label htmlFor="availability" className="text-gray-800">
                        Disponibilidad:
                    </label>
                    <select 
                        name="availability"
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        defaultValue={productData.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                type="submit"
                value="Guardar Cambios"
                className="mt-5 w-full p-2 font-bold text-lg rounded bg-indigo-600 text-white cursor-pointer"
                />
            </Form>
        </>
    )
}

export default EditProduct