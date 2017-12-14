import {Field} from "./field";
import {FormModel} from "./form-model";

export interface Form {
    action: string,
    method: string,
    submitText?: string,
    success?: (result: any) => void,
    error?: (result: any) => void,
    model?: FormModel
    fields: Field[]
}