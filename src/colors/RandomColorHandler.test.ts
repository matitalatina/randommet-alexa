import { instance, mock, when } from "ts-mockito";
import { ColorService } from "./ColorService";
import { RandomColorHandler } from "./RandomColorHandler";

describe("RandomColorHandler", () => {
  const mockColorService: ColorService = mock(ColorService);
  const handler: RandomColorHandler = new RandomColorHandler(instance(mockColorService));

  it("should handle RandomColor intent", () => {
    const handlerInput: any = {
      requestEnvelope: { request: { type: "IntentRequest", intent: { name: "RandomColor" } } },
    };
    expect(handler.canHandle(handlerInput))
      .toBe(true);
  });

  it("should choose colors", () => {
    when(mockColorService.getRandomColor(2)).thenReturn(["rosso", "blu"]);
    const handlerInput: any = {
      requestEnvelope: {
        request: {
          intent: {
            slots:
            {
                colorCount: {
                value: "2",
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
    expect(message).toEqual("Ecco qui la scelta: rosso, blu");
    return this;
  }
  public withSimpleCard(name: string, fact: string) {
    return this;
  }

  public getResponse(): any {
    return null;
  }
}
