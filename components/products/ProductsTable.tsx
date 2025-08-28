import { Product } from "@/src/schemas"
import { formatCurrency, getImagePath, isAvaliable } from "@/src/utils"
import Image from "next/image"
import Link from "next/link"
import DeleteProductForm from "./DeleteProductForm"

export default function ProductsTable({ products }: { products: Product[] }) {

    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-10">
            <div className="mt-8 flow-root ">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Imagen
                                    </th>

                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Producto
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Precio
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Inventario
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Acciones</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <Image
                                                src={getImagePath(product.image)}
                                                alt={`Imagen del Producto ${product.name}`}
                                                width={120}
                                                height={120}
                                                priority
                                            />
                                        </td>
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {product.name}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500">
                                            {formatCurrency(product.price)}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500">
                                            {isAvaliable(product.inventory) ? (
                                                product.inventory
                                            ) : <p className="text-red-600 px-3 py-1 text-center text-sm uppercase font-bold">Agotado</p>}
                                        </td>
                                        <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 ">
                                            <div className='flex gap-5 justify-end items-center'>
                                                <Link
                                                    className="text-indigo-600 hover:text-indigo-800"
                                                    href={`/admin/products/${product.id}/edit`}>
                                                    Editar <span className="sr-only">, {product.name}</span>
                                                </Link>

                                                <DeleteProductForm
                                                    productId={product.id}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
