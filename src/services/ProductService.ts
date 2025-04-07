//SERVICE PRODUCT
import * as v from 'valibot'
import axios from 'axios'
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import { toBoolean } from '../utils';

//Type
//--Tipo inferido FormData
type ProductData = {
    [k: string]: FormDataEntryValue;
}

//POST
export const addProduct = async (data : ProductData) => {
    try {
        const setData = {
            name: data.name,
            price: +data.price
        }
        //Validación de Esquema
        //valibot.safeParse(Esquema, Consulta): Valida los tipos y devuelve la estructura del Esquema
        //En caso de error NO arroja una Excepción - Devuelve la propiedad success, output (datos), issues
        const result = v.safeParse(DraftProductSchema, setData);
        
        if(result.success) {
            //Variable de Entorno VITE
            const url = `${import.meta.env.VITE_API_URL}/api/products`;

            await axios.post(url, result.output);
        } else {
            throw new Error(`ERROR: ${result.issues}`);
        }
    } catch (error) {
        console.log(error);
    }
}

//GET ALL
export const getProducts = async () => {
    try {
        //Variable de Entorno VITE
        const url = `${import.meta.env.VITE_API_URL}/api/products`;

        const { data } = await axios(url);
        const result = v.safeParse(ProductsSchema, data.data);

        if(result.success) {
            return result.output;
        } else {
            throw new Error(`ERROR: ${result.issues}`);
        }
    } catch (error) {
        console.log(error);
    }
}

//GET BY ID
export const getProductById = async (id : Product['id']) => {
    try {
        //Variable de Entorno VITE
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;

        const { data } = await axios(url);
        const result = v.safeParse(ProductSchema, data.data);

        if(result.success) {
            return result.output;
        } else {
            throw new Error(`ERROR: ${result.issues}`);
        }
    } catch (error) {
        console.log(error);
    }
}

//PUT
export const updateProduct = async (data : ProductData, id: Product['id']) => {
    try {
        const result = v.safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString())
        });

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;

            await axios.put(url, result.output);
        } else {
            throw new Error(`ERROR: ${result.issues}`);
        }
    } catch (error) {
        console.log(error);
    }

}

//PATCH
export const patchProduct = async ( id: Product['id'] ) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;

        await axios.patch(url);        
    } catch (error) {
        console.log(error);
    }
}

//DELETE
export const deleteProduct = async ( id: Product['id'] ) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;

        await axios.delete(url);
    } catch (error) {
        console.log(error);
    }
}