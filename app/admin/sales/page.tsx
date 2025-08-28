import TransactionFilters from "@/components/transactions/TransactionFilter";
import Heading from "@/components/ui/Heading";
import { getSalesByDate } from "@/src/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

export default async function SalesPage() {
    const queryClienit = new QueryClient()

    const today = new Date()
    const formattedDate = format(today, 'yyyy-MM-dd')

    await queryClienit.prefetchQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    return (
        <>
            <Heading>Ventas</Heading>

            <p className="text-lg">En esta sección aparecerán las ventas, utiliza el calendaria para filtrar por fechas</p>

            <HydrationBoundary state={dehydrate(queryClienit)}>
                <TransactionFilters />
            </HydrationBoundary>
        </>
    )
}
