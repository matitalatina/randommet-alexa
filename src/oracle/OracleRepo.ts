import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class OracleRepo {
    public getResponses(): string[] {
        return [
            "I segnali indicano sì.",
            "Sì.",
            "Senza dubbio.",
            "Le mie fonti dicono no.",
            "Per come la vedo io, sì.",
            "Puoi contarci.",
            "Concentrati e richiedilo.",
            "Le prospettive non sono così buone.",
            "È decisamente così.",
            "Ora è meglio non dirtelo...",
            "Sono molto dubbioso.",
            "Sì, decisamente.",
            "È certo.",
            "Non posso predirlo ora.",
            "Molto probabilmente.",
            "Richiedilo più tardi.",
            "La mia risposta è no.",
            "Le prospettive sono buone.",
            "Non contarci",
            "Sì, a tempo debito.",
            "Le mie fonti dicono no.",
            "Decisamente no.",
            "Sì.",
            "Devi aspettare.",
            "Ho i miei dubbi.",
            "Le prospettive sono così così.",
            "Mi sembra buono!",
            "Chi lo sa?",
            "Mi piace!",
            "Probabilmente.",
            "Stai scherzando?",
            "Fallo!",
            "Non scommetterci.",
            "Dimenticalo.",
        ];
    }
}
