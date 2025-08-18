import { cn } from "@/lib/utils"
import { describe, expect, it } from "vitest"

describe("cn utility function", () => {
  it("merges class names correctly", () => {
    const result = cn("px-4", "py-2", "bg-blue-500")
    expect(result).toBe("px-4 py-2 bg-blue-500")
  })

  it("handles conditional classes", () => {
    const isActive = true
    const result = cn("base-class", isActive && "active-class", "another-class")
    expect(result).toBe("base-class active-class another-class")
  })

  it("filters out falsy values", () => {
    const result = cn("valid-class", false, null, undefined, "", "another-valid-class")
    expect(result).toBe("valid-class another-valid-class")
  })

  it("handles Tailwind CSS conflicts", () => {
    const result = cn("px-4 px-6", "py-2 py-4")
    expect(result).toContain("px-6")
    expect(result).toContain("py-4")
    expect(result).not.toContain("px-4")
    expect(result).not.toContain("py-2")
  })

  it("works with empty input", () => {
    const result = cn()
    expect(result).toBe("")
  })
})
