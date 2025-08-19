import type { Transaction } from "@/features/dashboard/types"
import { NextResponse } from "next/server"

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "24 Aug 2023",
    referenceId: "#834343434342",
    to: "Bloom Enterprise Sdn Bhd",
    transactionType: "DuitNow payment",
    amount: 1200.0,
  },
  {
    id: "2",
    date: "14 Jul 2023",
    referenceId: "#834343434342",
    to: "Muhammad Andy Asmawi",
    transactionType: "DuitNow payment",
    amount: 54810.16,
  },
  {
    id: "3",
    date: "12 Jul 2023",
    referenceId: "#834343434342",
    to: "Utilities Company Sdn Bhd",
    transactionType: "DuitNow payment",
    amount: 100.0,
  },
  {
    id: "4",
    date: "08 Jul 2023",
    referenceId: "#834343434342",
    to: "Online Shopping Mall",
    transactionType: "Card payment",
    amount: 245.5,
  },
  {
    id: "5",
    date: "05 Jul 2023",
    referenceId: "#834343434342",
    to: "Grocery Store Sdn Bhd",
    transactionType: "Card payment",
    amount: 89.9,
  },
  {
    id: "6",
    date: "02 Jul 2023",
    referenceId: "#834343434342",
    to: "Insurance Company Ltd",
    transactionType: "Auto debit",
    amount: 350.0,
  },
  {
    id: "7",
    date: "28 Jun 2023",
    referenceId: "#834343434342",
    to: "Mobile Service Provider",
    transactionType: "DuitNow payment",
    amount: 68.5,
  },
  {
    id: "8",
    date: "25 Jun 2023",
    referenceId: "#834343434342",
    to: "Restaurant Chain Sdn Bhd",
    transactionType: "Card payment",
    amount: 125.8,
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: mockTransactions,
      total: mockTransactions.length,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch transactions" },
      { status: 500 }
    )
  }
}
