import z from "zod";

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    categoryId: z.number()
})
export type Product = z.infer<typeof ProductSchema>

export const ProductsResponseSchema = z.object({
    products: z.array(ProductSchema),
    total: z.number()
})

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})
export const CategoriesReponseSchema = z.array(CategorySchema)

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});

/** Shopping Cart */
const ShoppingCartContentsSchema = ProductSchema.pick({
    name: true,
    image: true,
    price: true,
    inventory: true,
}).extend({
    productId: z.number(),
    quantity: z.number()
})

export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema)
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>
export type CartItem = z.infer<typeof ShoppingCartContentsSchema>

export const CouponResponseSchema = z.object({
    message: z.string(),
    name: z.string().default(''),
    percentage: z.coerce.number().min(0).max(100).default(0)
})
export type Coupon = z.infer<typeof CouponResponseSchema>

const OrderContentSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
    price: z.number()
})
export const OrderSchema = z.object({
    total: z.number(),
    coupon: z.string(),
    contents: z.array(OrderContentSchema).min(1, { message: 'El carrito no puede ir vacio' })
})

/** Success / Error Response */
export const SuccessResponseSchema = z.object({
    message: z.string()
})
export const ErrorResponseSchema = z.object({
    message: z.array(z.string()),
    error: z.string(),
    statusCode: z.number()
})

export const ContentsSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    price: z.string(),
    product: ProductSchema
})

export const TransactionResponseSchema = z.object({
    id: z.number(),
    total: z.string(),
    transactionDate: z.string(),
    discount: z.string(),
    coupon: z.string().nullable(),
    contents: z.array(ContentsSchema)
})
export const TransactionsResponseSchema = z.array(TransactionResponseSchema)
export type Transaction = z.infer<typeof TransactionResponseSchema>

export const ProductFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'El nombre del producto no puede ir vacío' }),
    price: z.coerce.number({ message: 'Precio no válido' })
        .min(1, { message: 'El precio debe ser mayor a 0' }),
    image: z.string({ message: 'La imagen es obligatoria' }),
    inventory: z.coerce.number({ message: 'Inventario no válido' })
        .min(1, { message: 'El inventario debe ser mayor a 0' }),
    categoryId: z.coerce.number({ message: 'La categoría no es válida' })
})
