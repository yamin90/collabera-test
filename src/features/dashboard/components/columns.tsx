"use client"

import type { Transaction } from "@/features/dashboard/types"
import type { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="text-sm text-gray-900">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "referenceId",
    header: "Reference ID",
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">{row.getValue("referenceId")}</div>
    ),
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => (
      <div>
        <div className="text-sm font-medium text-gray-900">{row.getValue("to")}</div>
        <div className="text-sm text-gray-500">Recipient references will go here</div>
      </div>
    ),
  },
  {
    accessorKey: "transactionType",
    header: "Transaction Type",
    cell: ({ row }) => (
      <div className="text-sm text-gray-900">{row.getValue("transactionType")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-MY", {
        style: "currency",
        currency: "MYR",
      }).format(amount)

      return <div className="text-sm font-medium text-gray-900">{formatted}</div>
    },
  },
]
