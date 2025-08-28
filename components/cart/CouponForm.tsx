import { useStore } from "@/src/store"
import { FormEvent } from "react"

export default function CouponForm() {
    const applyCoupon = useStore(state => state.applyCoupon)
    const coupon = useStore(state => state.coupon)


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const couponName = formData.get('coupon_name')?.toString()!

        if (!couponName.length) return

        await applyCoupon(couponName)
    }

    return (
        <>
            <p className="py-5 font-bold border-t border-gray-300">Canjear Cupón</p>
            <form
                className="flex"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className="p-2 bg-gray-200 border-gray-300 w-full"
                    placeholder="Ingresa un cupón"
                    name="coupon_name"
                />

                <input
                    type="submit"
                    className="p-3 bg-green-400 font-bold hover:cursor-pointer"
                    value='Canjear'
                />
            </form>

            {coupon.message ? (
                <p className="py-4 text-center text-sm font-bold">{coupon.message}</p>
            ) : null}
        </>
    )
}
