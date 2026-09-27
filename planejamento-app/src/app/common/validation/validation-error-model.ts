export interface ValidatorsErrorResponse {
    timestamp: Date;
    status: number;
    error: string;
    camposInvalidos: CamposInvalidos[]
}

export interface CamposInvalidos{
    campo: string;
    erro: string;
}