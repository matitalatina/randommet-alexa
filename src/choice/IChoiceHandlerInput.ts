export interface IChoiceHandlerRequest {
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
}
