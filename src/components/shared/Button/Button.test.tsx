import { fireEvent, render, screen } from "@testing-library/react"
import Button from "."

describe("Button Component", () => {

  it("should have the background color and color of the text being passed as a prop", () => {

    const bgColor = "red"
    const txtColor = "white"

    render(<Button size="small" label="text button" backgroundColor={bgColor} textColor={txtColor} />)

    const button = screen.getByText(/text button/i)

    expect(button).toHaveStyle({ backgroundColor: "red", color: "white" })

  })
  
  it("should call onClick prop on click", () => {

    const onClick = jest.fn()

    render(
      <Button onClick={onClick} label="Click me" size="small" backgroundColor="blue" textColor="white" />
    )

    const button = screen.getByText(/click me/i)

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()

  })

})