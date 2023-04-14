import { render, screen } from "@testing-library/react";
import Header from "./Header";

test('renders Header component', () => {
  
  render(<Header />)

  const headingElement = screen.getByText(/estou no header/i)

  expect(headingElement).toBeInTheDocument()

})