import { ResultMessage } from "./result-message";

export class Result<T> {
    content: T;
    messages: ResultMessage[];
    statusCode: number;
    success: boolean;
}
