import { instance, mock, when } from "ts-mockito";
import { OracleRepo } from "./OracleRepo";
import { OracleService } from "./OracleService";

describe("OracleService", () => {
    it("should pick random response", () => {
        const repoMock = mock(OracleRepo);
        const service = new OracleService(instance(repoMock));

        const availableChoices = ["a", "b"];
        when(repoMock.getResponses()).thenReturn(availableChoices);

        expect(availableChoices).toContain(service.getRandomResponse());
    });
});
