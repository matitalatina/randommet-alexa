import { Request } from "ask-sdk-model";

export type ChoiceRequest = Request & {
  intent: {
    name: string,
    confirmationStatus: string,
    slots: {
      choiceQuery: {
        name: string,
        value: string,
        confirmationStatus: string,
        source: string,
      },
    },
  };
};
