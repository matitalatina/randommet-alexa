import { inject, injectable } from "inversify";
import { sampleSize } from "lodash";
import "reflect-metadata";
import { TYPES } from "../di/types";
import { ColorRepo } from "./ColorRepo";

@injectable()
export class ColorService {
  private colorRepo: ColorRepo;

  constructor(@inject(TYPES.ColorRepo) colorRepo: ColorRepo) {
    this.colorRepo = colorRepo;
  }

  public getRandomColor(count: number): string[] {
    return sampleSize(this.colorRepo.getColors(), count);
  }
}
