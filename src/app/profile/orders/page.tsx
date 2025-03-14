import { getOrders } from "@/actions/getOrders";
import { Heading } from "@/components/Heading";
import { OrderTableRow } from "@/ui/profile/OrderTableRow";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export default async function Page() {
  const plainOrders = await getOrders();
  const orders = plainOrders.map(order => ({...order, products: order.products.map(p => ({...p, product: { ...p.product, price: p.product.price.toString()}}))}))
  
  return <div className="mx-auto w-full overflow-auto">
      <Heading className="mb-4" level={1}>Моите поръчки</Heading>
      <TableContainer className="w-full">
        <Table className="overflow-auto w-11/12">
          <TableHead>
            <TableRow>
              <TableCell align="right">
                #
              </TableCell>
              <TableCell>
                Начин на плащане
              </TableCell>
              <TableCell>
                Дата на извършване
              </TableCell>
              <TableCell>
                Детайли
              </TableCell>
              <TableCell>
                Връщане
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => <OrderTableRow key={order.id} order={order} />)}
          </TableBody>
      </Table>
    </TableContainer>
  </div>
}