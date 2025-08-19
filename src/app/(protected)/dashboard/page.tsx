"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { columns } from "@/features/dashboard/components/columns"
import { DataTable } from "@/features/dashboard/components/data-table"
import type { Transaction } from "@/features/dashboard/types"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transaction-history", {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch transactions")
        }

        const result = await response.json()
        setTransactions(result.data || [])
      } catch (error) {
        console.error("Error fetching transactions:", error)
        setTransactions([])
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <div className="grid grid-cols-5 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            {Array.from({ length: 8 }, () => (
              <div key={crypto.randomUUID()} className="grid grid-cols-5 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transaction History</h1>
          <p className="text-muted-foreground">Manage and view your transaction history</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <DataTable columns={columns} data={transactions} />
        </div>
      </div>
    </div>
  )
}
