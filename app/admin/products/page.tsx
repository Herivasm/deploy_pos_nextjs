import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { ProductsResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getProducts(take: number, skip: number) {
    const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`
    const req = await fetch(url)

    const json = await req.json()
    const data = ProductsResponseSchema.parse(json)

    return {
        products: data.products,
        total: data.total
    }
}

type SearchParams = Promise<{ page: string }>

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
    const { page } = await searchParams

    if (!isValidPage(+page)) redirect('/admin/products?page=1')

    const productsPerPage = 10
    const skip = (+page - 1) * productsPerPage


    const { products, total } = await getProducts(productsPerPage, skip)

    const totalPages = Math.ceil(total / productsPerPage)

    if (+page > totalPages) redirect('/admin/products?page=1')

    return (
        <>
            <Link
                href='/admin/products/new'
                className="rounded bg-green-400 font-bold py-2 px-10"
            >
                Nuevo Producto
            </Link>

            <Heading>Administrar Productos</Heading>

            <ProductsTable
                products={products}
            />

            <Pagination
                page={+page}
                totalPages={totalPages}
                baseUrl='/admin/products'
            />
        </>
    )
}
