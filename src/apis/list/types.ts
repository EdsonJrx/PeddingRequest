export interface IRequests {
    map(arg0: (obj: any) => string): Iterable<unknown> | null | undefined;
    "CODCCUSTO": string,
    "NUMEROMOV": string,
    "DATACRIACAO":string,
    "DATAENTREGA":string,
    "ATRASO":number,
    "CODTMV": string,
    "CODCFO"?: string,
    "NOME"?:string,
    "USUARIOCRIACAO": string,
    "VALORLIQUIDOORIG": number,
    "HISTORICOCURTO"?: string,
    "STATUS": string,
    "IDMOV": number,
    "CENTRO_DE_CUSTO":string
}