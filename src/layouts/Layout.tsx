//LAYOUT
import { Outlet } from "react-router-dom"

/*
Nueva API de enrutamiento de react-router-dom v6.4+

<Outlet />: componente especial de React Router que actúa como "punto de inserción" para 
renderizar las rutas hijas (las definidas en children dentro del router).
*/

function Layout() {

    //---VIEW---//
    return (
        <>
            <header className="bg-slate-800">
                <div className="mx-auto max-w-6xl py-10">
                    <h1 className="text-4xl font-extrabold text-white">
                        Administrador de Productos
                    </h1>
                </div>
            </header>

            <main className="mx-auto max-w-6xl mt-10 p-10 bg-white shadow">
                <Outlet />
            </main>
        </>
    )
}

export default Layout