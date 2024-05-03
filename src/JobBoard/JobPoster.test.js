import { JobPoster } from "./JobPoster";

describe("test suite ", () => {
  test("mock-data", () => {
    window.fetch = fetch.fn();
    window.fetch.mockResolvedOnce({
      json: async () => [{ id: "p1", title: "First post" }],
    });
    render(<JobPoster />);

    const divs = screen.queryAllByTestId("data-div");

    expect(divs).toHaveLength(2);

    expect(divs[0]).toHaveTextContent;

    expect(div1).toBeInTheDocument();
  });
});
