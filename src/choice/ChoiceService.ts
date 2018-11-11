import { injectable } from "inversify";
import { sampleSize } from "lodash";
import "reflect-metadata";
import { NotEnoughChoicesError } from "./NotEnoughChoicesError";

const uselessWords: string[] = [
  "o",
  "oppure",
  "e",
  "ovvero",
  "il",
  "lo",
  "la",
  "i",
  "gli",
  "le",
  "un",
  "qualche",
];

@injectable()
export class ChoiceService {
  public extractChoices(choiceQuery: string): string[] {
    return choiceQuery
      .split(" ")
      .filter((c) => !uselessWords.includes(c));
  }
  public chooseElementFromQuery(count: number, query: string): string[] {
    const availableChoices = this.extractChoices(query);
    if (availableChoices.length < count) {
      throw new NotEnoughChoicesError(count, availableChoices.length);
    }
    return sampleSize(availableChoices, count);
  }
}
