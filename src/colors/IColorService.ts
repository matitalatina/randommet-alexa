import { sampleSize } from "lodash";
import { ColorRepo } from "./ColorRepo";

export class ColorService {
  private colorRepo: ColorRepo;

  constructor(colorRepo: ColorRepo) {
    this.colorRepo = colorRepo;
  }

  public getRandomColor(count: number): string[] {
    return sampleSize(this.colorRepo.getColors(), count);
  }
}
