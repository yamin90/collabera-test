import HomePage from "@/app/page"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("HomePage", () => {
  it("renders the main heading", () => {
    render(<HomePage />)

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByText("Aeon Credit")).toBeInTheDocument()
    expect(screen.getByText("Management System")).toBeInTheDocument()
  })

  it("renders the hero section with description", () => {
    render(<HomePage />)

    expect(
      screen.getByText(/Secure, modern credit management with advanced authentication/)
    ).toBeInTheDocument()
  })

  it("renders call-to-action buttons", () => {
    render(<HomePage />)

    const getStartedButton = screen.getByRole("link", { name: /get started/i })
    const learnMoreButton = screen.getByRole("button", { name: /learn more/i })

    expect(getStartedButton).toBeInTheDocument()
    expect(getStartedButton).toHaveAttribute("href", "/login")
    expect(learnMoreButton).toBeInTheDocument()
  })

  it("renders all three feature cards", () => {
    render(<HomePage />)

    expect(screen.getByText("Advanced Security")).toBeInTheDocument()
    expect(screen.getByText("Transaction Management")).toBeInTheDocument()
    expect(screen.getByText("User Experience")).toBeInTheDocument()
  })

  it("has proper accessibility structure", () => {
    render(<HomePage />)

    const mainHeading = screen.getByRole("heading", { level: 1 })
    const subHeadings = screen.getAllByRole("heading", { level: 3 })

    expect(mainHeading).toBeInTheDocument()
    expect(subHeadings).toHaveLength(3)
  })
})
