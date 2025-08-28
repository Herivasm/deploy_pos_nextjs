import { Product } from "@/src/schemas"
import { revalidatePath } from "next/cache"


export default function DeleteProductForm({ productId }: { productId: Product['id'] }) {
    const handleDeleteProduct = async () => {
        "use server"

        const url = `${process.env.API_URL}/products/${productId}`
        const req = await fetch(url, {
            method: 'DELETE'
        })

        await req.json()

        revalidatePath('/admin/products')
    }

    return (
        <form
            action={handleDeleteProduct}
        >
            <input
                type="submit"
                className="text-red-600 hover:text-red-800 cursor-pointer"
                value='Eliminar'
            />
        </form>
    )
}
