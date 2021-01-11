import { LoteSituacao } from "src/app/enums/lote-situacao";

export interface ReavaliarLote {
    id: string;
    situacao: LoteSituacao;
}