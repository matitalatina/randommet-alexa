import { HandlerInput } from "ask-sdk-core";
import { CustomSkillRequestHandler } from "ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { OracleService } from "./OracleService";

@injectable()
export class OracleHandler implements CustomSkillRequestHandler {
    private oracleService: OracleService;

    constructor(
        @inject(TYPES.OracleService) oracleService: OracleService,
    ) {
        this.oracleService = oracleService;
    }

    public canHandle(handlerInput: HandlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === "IntentRequest"
            && request.intent.name === "Oracle";
    }

    public handle(handlerInput: HandlerInput) {
        const randomFact = this.oracleService.getRandomResponse();

        return handlerInput.responseBuilder
            .speak(randomFact)
            .withSimpleCard("RandomMet", randomFact)
            .getResponse();
    }
}
