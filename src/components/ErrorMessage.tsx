//COMPONENT ERROR
import { PropsWithChildren } from "react"

/*
-children: Prop especial que representa todo lo que envuelves dentro de un componente.
-PropsWithChildren<Props>: Tipo auxiliar de TypeScript, representa un componente que 
puede recibir props, y también puede tener children.
*/

type ErrorMessageProps = {
    color: string;
}

function ErrorMessage( { children, color } : PropsWithChildren<ErrorMessageProps> ) {

    //---VIEW---//
    return (
        <div className={`my-4 p-3 text-center font-bold uppercase text-white ${color}`}>
            {children}
        </div>
    )
}

export default ErrorMessage