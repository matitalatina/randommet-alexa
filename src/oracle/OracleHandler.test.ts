import { instance, mock, when } from "ts-mockito";
import { OracleHandler } from "./OracleHandler";
import { OracleService } from "./OracleService";

describe("OracleHandler", () => {
    const mockOracleService: OracleService = mock(OracleService);
    const handler: OracleHandler = new OracleHandler(instance(mockOracleService));

    it("should handle RandomColor intent", () => {
        const handlerInput: any = {
            requestEnvelope: { request: { type: "IntentRequest", intent: { name: "Oracle" } } },
        };
        expect(handler.canHandle(handlerInput))
            .toBe(true);
    });

    it("should choose colors", () => {
        when(mockOracleService.getRandomResponse()).thenReturn("response");
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
        expect(message).toEqual("response");
        return this;
    }
    public withSimpleCard(name: string, fact: string) {
        return this;
    }

    public getResponse(): any {
        return null;
    }
}
