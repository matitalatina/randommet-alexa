import { uniq } from "lodash";
import { ChoiceService } from "./ChoiceService";
import { NotEnoughChoicesError } from "./NotEnoughChoicesError";

describe("ChoiceService", () => {
  const service = new ChoiceService();
  const sampleQuery = "bar bowling e cinema oppure festa o vita";

  it("should split query into multiple choices", () => {
    expect(
      service.extractChoices(sampleQuery),
    ).toEqual(
      ["bar", "bowling", "cinema", "festa", "vita"],
    );
  });

  it("should take n elements from query without repetition", () => {
    const chosenElements: string[] = service.chooseElementFromQuery(2, sampleQuery);
    expect(uniq(chosenElements).length).toBe(2);
  });

  it("should raise NotEnoughChoisesError if user asks too many choices", () => {
    expect(() => service.chooseElementFromQuery(99, sampleQuery))
      .toThrow(NotEnoughChoicesError);
  });
});
