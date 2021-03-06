import { HandlerInput } from "ask-sdk-core";
import { CustomSkillRequestHandler } from "ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler";
import { Response } from "ask-sdk-model";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { ChoiceRequest } from "./ChoiceRequest";
import { ChoiceService } from "./ChoiceService";

@injectable()
export class ChoiceRequestHandler implements CustomSkillRequestHandler {
  private choiceService: ChoiceService;

  constructor(@inject(TYPES.ChoiceService) choiceService: ChoiceService) {
    this.choiceService = choiceService;
  }

  public canHandle(input: HandlerInput): boolean | Promise<boolean> {
    const request = input.requestEnvelope.request;
    return request.type === "IntentRequest"
      && request.intent.name === "RandomChoice";
  }

  public handle(input: HandlerInput): Response {
    const request: ChoiceRequest = input.requestEnvelope.request as ChoiceRequest;
    const randomFact = this.choiceService.chooseElementFromQuery(
      1,
      request.intent.slots.choiceQuery.value,
    );
    const speechOutput = "Ecco qui la scelta: " + randomFact.join(", ");

    return input.responseBuilder
      .speak(speechOutput)
      .withSimpleCard("RandomMet", randomFact.join(", "))
      .getResponse();
  }
}
