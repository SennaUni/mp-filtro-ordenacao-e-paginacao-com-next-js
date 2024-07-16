"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { ChevronsDown, ChevronsUp, ChevronsUpDown } from "lucide-react";

import { OrdersData } from "@/src/api/orders/types";

import { convertPrice } from "@/src/helpers/transform";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { Badge } from "./ui/badge";

export type OrdersTableProps = {
  orders: OrdersData[];
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handleSortClick = (key: string) => {
    const params = new URLSearchParams(searchParams);

    params.get("sort") === key
      ? params.set("sort", `-${key}`)
      : params.get("sort") === `-${key}`
      ? params.delete("sort")
      : params.set("sort", key);

    router.replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  const getSortIcon = (key: string) => {
    switch (true) {
      case searchParams.get("sort") === key:
        return <ChevronsDown className="w-4" />;
      case searchParams.get("sort") === `-${key}`:
        return <ChevronsUp className="w-4" />;
      default:
        return <ChevronsUpDown className="w-4" />;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead
            onClick={() => handleSortClick("customer_name")}
            className="table-cell cursor-pointer justify-end items-center gap-1"
          >
            <div className="flex items-center gap-1">
              Cliente
              {getSortIcon("customer_name")}
            </div>
          </TableHead>
          <TableHead
            onClick={() => handleSortClick("status")}
            className="table-cell cursor-pointer justify-end items-center gap-1"
          >
            <div className="flex items-center gap-1">
              Status
              {getSortIcon("status")}
            </div>
          </TableHead>
          <TableHead
            onClick={() => handleSortClick("order_date")}
            className="hidden md:table-cell cursor-pointer justify-end items-center gap-1"
          >
            <div className="flex items-center gap-1">
              Data
              {getSortIcon("order_date")}
            </div>
          </TableHead>
          <TableHead
            onClick={() => handleSortClick("amount_in_cents")}
            className="text-right cursor-pointer flex justify-end items-center gap-1"
          >
            Valor
            {getSortIcon("amount_in_cents")}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-semibold">{order.customer_name}</div>
              <div className="hidden md:inline text-sm text-muted-foreground">
                {order.customer_email}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs font-semibold`} variant="outline">
                {order.status === "pending" ? "Pendente" : "Completo"}
              </Badge>
            </TableCell>
            <TableCell className="font-semibold hidden md:table-cell">
              {order.order_date.toString()}
            </TableCell>
            <TableCell className="font-semibold text-right">
              {convertPrice(order.amount_in_cents / 100)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
