//COMPONENT PRODUCT FORM
import { Product } from '../types/index';

//Type
type ProductFormProps = {
    productData?: Product;
}

function ProductForm( { productData } : ProductFormProps ) {

    //--VIEW--//
    return (
        <>
            <div className="mb-4">
                <label htmlFor="name" className="text-gray-800">
                    Nombre Producto:
                </label>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={productData?.name}
                    placeholder="Nombre del Producto"
                    className="mt-2 block w-full p-3 bg-gray-50"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="text-gray-800">
                    Precio:
                </label>
                <input 
                    type="number"
                    name="price"
                    id="price"
                    defaultValue={productData?.price}
                    placeholder="Precio Producto. ej. 200, 300"
                    className="mt-2 block w-full p-3 bg-gray-50"
                />
            </div>
        </>
    )
}

export default ProductForm