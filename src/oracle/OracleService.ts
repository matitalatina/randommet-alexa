import { inject, injectable } from "inversify";
import { sample } from "lodash";
import "reflect-metadata";
import { TYPES } from "../di/types";
import { OracleRepo } from "./OracleRepo";

@injectable()
export class OracleService {
    private oracleRepo: OracleRepo;

    constructor(@inject(TYPES.OracleRepo) oracleRepo: OracleRepo) {
        this.oracleRepo = oracleRepo;
    }

    public getRandomResponse(): string {
        return sample(this.oracleRepo.getResponses()) || "Non so risponderti al momento.";
    }
}
