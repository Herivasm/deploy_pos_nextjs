import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NewProductPage() {
    return (
        <>
            <Link
                href='/admin/products?page=1'
                className="rounded bg-green-400 font-bold py-2 px-10"
            >
                Volver
            </Link>

            <Heading>Nuevo Producto</Heading>

            <AddProductForm >
                <ProductForm />
            </AddProductForm>

        </>
    )
}
