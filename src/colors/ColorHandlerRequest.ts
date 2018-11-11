import { Request } from "ask-sdk-model";

export type ColorRequest = Request & {
  intent: {
    name: string,
    confirmationStatus: string,
    slots: {
      colorCount: {
        name: string,
        value: string,
        confirmationStatus: string,
        source: string,
      },
    },
  };
};
