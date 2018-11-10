/* eslint-disable  func-names */
/* eslint-disable  no-console */

import "source-map-support/register";
import { ErrorHandler, HandlerInput, SkillBuilders } from "ask-sdk-core";
import { CustomSkillErrorHandler } from "ask-sdk-core/dist/dispatcher/error/handler/CustomSkillErrorHandler";
import { CustomSkillRequestHandler } from "ask-sdk-core/dist/dispatcher/request/handler/CustomSkillRequestHandler";
import { sample } from "lodash";
import { ColorRepo } from "./ColorRepo";

// =========================================================================================================================================
// TODO: The items below this comment need your attention.
// =========================================================================================================================================

const SKILL_NAME = "RandomMet";
const GET_FACT_MESSAGE = "Ecco qui la scelta: ";
const HELP_MESSAGE = "Scegli un colore";
const HELP_REPROMPT = "Come posso aiutarti?";
const FALLBACK_MESSAGE = "Non posso aiutarti in questo. Posso scegliere dei colori.";
const FALLBACK_REPROMPT = "Come posso aiutarti?";
const STOP_MESSAGE = "Arrivederci!";

// =========================================================================================================================================
// TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-nodejs-fact/tree/en-US/lambda/data
// =========================================================================================================================================

const data = new ColorRepo().getColors();

// =========================================================================================================================================
// Editing anything below this line might break your skill.
// =========================================================================================================================================

const GetRandomColorHandler = {
  canHandle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest"
      && request.intent.name === "RandomColor";
  },
  handle(handlerInput: HandlerInput) {
    const randomFact = sample(data) || "Rosso";
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest"
      && request.intent.name === "AMAZON.HelpIntent";
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackHandler = {
  // 2018-May-01: AMAZON.FallbackIntent is only currently available in en-US locale.
  //              This handler will not be triggered except in that locale, so it can be
  //              safely deployed for any locale.
  canHandle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest"
      && request.intent.name === "AMAZON.FallbackIntent";
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest"
      && (request.intent.name === "AMAZON.CancelIntent"
        || request.intent.name === "AMAZON.StopIntent");
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler: CustomSkillRequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "SessionEndedRequest";
  },
  handle(handlerInput: HandlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler: CustomSkillErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, an error occurred.")
      .reprompt("Sorry, an error occurred.")
      .getResponse();
  },
};

const skillBuilder = SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetRandomColorHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
