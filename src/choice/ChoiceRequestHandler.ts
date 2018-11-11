import { HandlerInput } from "ask-sdk-core";
import { CustomSkillRequestHandler } from "ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler";
import { Response } from "ask-sdk-model";
import { inject } from "inversify";
import { TYPES } from "../di/types";
import { ChoiceService } from "./ChoiceService";
import { IChoiceHandlerRequest } from "./IChoiceHandlerInput";

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
    const request: IChoiceHandlerRequest = (input.requestEnvelope.request as any) as IChoiceHandlerRequest;
    console.log(input.responseBuilder);
    const randomFact = this.choiceService.chooseElementFromQuery(
      1,
      request.intent.slots.choiceQuery.value,
    );
    console.log(randomFact);
    const speechOutput = "Ecco qui la scelta: " + randomFact.join(", ");

    return input.responseBuilder
      .speak(speechOutput)
      .withSimpleCard("RandomMet", randomFact.join(", "))
      .getResponse();
  }
}
