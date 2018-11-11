import { Container } from "inversify";
import { ChoiceRequestHandler } from "../choice/ChoiceRequestHandler";
import { ChoiceService } from "../choice/ChoiceService";
import { ColorRepo } from "../colors/ColorRepo";
import { ColorService } from "../colors/ColorService";
import { TYPES } from "./types";

const myContainer = new Container();
myContainer.bind<ChoiceRequestHandler>(TYPES.ChoiceRequestHandler).to(ChoiceRequestHandler);
myContainer.bind<ChoiceService>(TYPES.ChoiceService).to(ChoiceService);
myContainer.bind<ColorRepo>(TYPES.ColorRepo).to(ColorRepo);
myContainer.bind<ColorService>(TYPES.ColorService).to(ColorService);

export { myContainer };
