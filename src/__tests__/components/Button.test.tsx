import { Button } from "@/components/ui/button"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

describe("Button Component", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
  })

  it("applies variant styles correctly", () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>)
    let button = screen.getByRole("button")
    expect(button).toHaveClass("bg-destructive")

    rerender(<Button variant="outline">Outline</Button>)
    button = screen.getByRole("button")
    expect(button).toHaveClass("border", "border-input", "bg-background")
  })

  it("applies size styles correctly", () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    let button = screen.getByRole("button")
    expect(button).toHaveClass("h-9", "px-3")

    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole("button")
    expect(button).toHaveClass("h-11", "px-8")
  })

  it("handles click events", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole("button")

    expect(button).toBeDisabled()
    expect(button).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50")
  })

  it("renders as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )

    const link = screen.getByRole("link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
  })
})
