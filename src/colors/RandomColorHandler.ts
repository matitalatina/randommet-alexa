import { HandlerInput } from "ask-sdk-core";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { ColorRequest } from "./ColorRequest";
import { ColorService } from "./ColorService";

@injectable()
export class RandomColorHandler {
    private colorService: ColorService;

    constructor(
        @inject(TYPES.ColorService) colorService: ColorService,
    ) {
        this.colorService = colorService;
    }

    public canHandle(handlerInput: HandlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === "IntentRequest"
        && request.intent.name === "RandomColor";
    }

    public handle(handlerInput: HandlerInput) {
      const request: ColorRequest = handlerInput.requestEnvelope.request as ColorRequest;
      const randomFact = this.colorService
        .getRandomColor(parseInt(request.intent.slots.colorCount.value, 10)).join(", ");
      const speechOutput = "Ecco qui la scelta: " + randomFact;

      return handlerInput.responseBuilder
        .speak(speechOutput)
        .withSimpleCard("RandomMet", randomFact)
        .getResponse();
    }
}
