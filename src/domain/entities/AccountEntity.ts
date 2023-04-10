import { Types } from "mongoose";
import { IAccount } from "../interfaces/AccountInterface";

export class AccountEntity implements IAccount {
    id?: string
    type: string;
    amount: number;
    userID: string


    constructor( amount?: number, id?:string, type?:string, userID?: string){
        
        this.amount = amount;
        this.id = id;
        this.type =type;
        this.userID = userID;
    }
}