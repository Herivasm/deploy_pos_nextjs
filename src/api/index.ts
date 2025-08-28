import { TransactionsResponseSchema } from "../schemas";

export async function getSalesByDate(date: string) {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`
    const req = await fetch(url)

    const json = await req.json()
    const transaction = TransactionsResponseSchema.parse(json)

    return transaction
}