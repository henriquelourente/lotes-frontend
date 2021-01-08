import { LoteSituacao } from "../enums/lote-situacao";
import { Area } from "./area";
import { Linha } from "./linha";
import { Processo } from "./processo";
import { Resultante } from "./resultante";
import { Unidade } from "./unidade";

export class Lote {
    ano: number;
    codigo: number;
    conformidade: boolean;
    conformidadeOrigem: boolean;
    dataFim: Date;
    dataInicio: Date;
    dataLiberacao: Date;
    // equipamento: Equipamento;
    // fluxo: Fluxo;
    id: string;
    linha: Linha;
    numero: number;
    resultante: Resultante;
    situacao: LoteSituacao;
    podeReabrir = true;
    podeLiberar = true;
    podeFechar = true;
    podeReabrirEdicao = true;
    menu = true;
    textoMenu = '...';
    menuOpacity = false;
    menuZindex: number;
    inicioGrupo: boolean;
    grupo: number;
    //tipoLote: TipoLote;
    numeroExterno: number;
    codCervejariaRemetente: string;
    dataTimezoneOffset: number;
    dataTimezoneOffsetDataFim: number;
    //eventos: Array<Evento>;
    area: Area;
    processo: Processo;
    // tipoInsumo: TipoInsumo;
    // insumo: Insumo;
    volumeProgramado: number;
    numeroOrdemSap: string;
    recalculando: boolean;
    unidade: Unidade;
}