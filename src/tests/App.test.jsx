import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe('App', () => {
  it('renders count', () => {
    render(<App />);
    expect(screen.getByRole('button')).toHaveTextContent('count is 0');
  });
  it('increases the count by 1', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('count is 1');
  })
});
