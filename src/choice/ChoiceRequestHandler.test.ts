import { instance, mock, when } from "ts-mockito";
import { ChoiceRequestHandler } from "./ChoiceRequestHandler";
import { ChoiceService } from "./ChoiceService";

describe("ChoiceRequestHandler", () => {
  const mockChoiceService: ChoiceService = mock(ChoiceService);
  const handler: ChoiceRequestHandler = new ChoiceRequestHandler(instance(mockChoiceService));

  it("should handle RandomChoice intent", () => {
    const handlerInput: any = {
      requestEnvelope: { request: { type: "IntentRequest", intent: { name: "RandomChoice" } } },
    };
    expect(handler.canHandle(handlerInput))
      .toBe(true);
  });

  it("should choose elements", () => {
    when(mockChoiceService.chooseElementFromQuery(1, "bar ristorante")).thenReturn(["bar"]);
    const handlerInput: any = {
      requestEnvelope: {
        request: {
          intent: {
            slots:
            {
              choiceQuery: {
                value: "bar ristorante",
              },
            },
          },
        },
      },
      responseBuilder: new FakeResponseBuilder(),
    };
    handler.handle(handlerInput);
  });
});

class FakeResponseBuilder {
  public speak(message: string) {
    expect(message).toEqual("Ecco qui la scelta: bar");
    return this;
  }
  public withSimpleCard(name: string, fact: string) {
    return this;
  }

  public getResponse(): any {
    return null;
  }
}
