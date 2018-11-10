import { ColorRepo } from "./ColorRepo";

describe("ColorRepo", () => {
  it("should get colors", () => {
    expect(new ColorRepo().getColors().length).toBeGreaterThan(0);
  });
});
