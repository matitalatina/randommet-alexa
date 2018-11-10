import { Request } from "ask-sdk-model";
import { type } from "os";

export interface IColorRequest {
  intent: {
    name: string,
    confirmationStatus: string,
    slots: {
      color_count: {
        name: string,
        value: string,
        confirmationStatus: string,
        source: string,
      },
    },
  };
}
