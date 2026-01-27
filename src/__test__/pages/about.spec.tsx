import ProfilePage from "@/pages/profile";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Profile Page", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<ProfilePage />);
    expect(getByText("Profile Page")).toBeInTheDocument();
    // const page = render(<ProfilePage />);
    // expect(page).toMatchSnapshot();
  });
});
