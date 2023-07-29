import {Request} from "express"

export interface RequestEntity extends Request {
    userId?:string
}