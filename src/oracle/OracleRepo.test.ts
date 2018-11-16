import { OracleRepo } from "./OracleRepo";

describe("OracleRepo", () => {
    it("should pick a response", () => {
        const repo = new OracleRepo();
        expect(repo.getResponses().length).toBeGreaterThan(0);
    });
});
