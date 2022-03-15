import LDMItem from '../models/LDMItem';
import ServerResponseInterface from './ServerResponseInterface';
import { Server } from 'http';

const url = "http://localhost:4963/ldm";

const headers = {
    'Content-Type': 'application/json',
}

export default class LDMService {

    //#region singleton

    private static _instance : LDMService;

    private constructor(){}

    public static get instance() {
        return this._instance ?? (this._instance = new LDMService())
    }

    //#endregion

    //#region methods

    //#region get

    public async getAll() : Promise<ServerResponseInterface<Array<LDMItem>>> {

        try {
            
            let response = await fetch(url, { headers });

            if (!response.ok) {
                return { didFail: true, failReason: response.statusText };
            }

            var data = await response.json();
            return { didFail: false, data };

        } catch(e) {
            return { didFail: false, failReason: String(e) };
        }
    }

    //#endregion

    //#region post

    public async addNewLDM(body : {content : string}) : Promise<ServerResponseInterface<number>> {

        try {
            let response = await fetch(url, { method: 'post', body: JSON.stringify({...body, isDone: false}), headers });

            if (!response.ok) {
                return { didFail: true, failReason: response.statusText };
            }

            var item : LDMItem = await response.json();
            return { didFail: false, data: item.id };

        } catch (e) {
            return { didFail: true, failReason: String(e) };
        }
    }

    //#endregion

    //#region put

    public async updateLDM(id: number, body : {sourcefield?: string,targetfield?: string, datatype?:string}) : Promise<ServerResponseInterface<undefined>> {
        try {
            let response = await fetch(`${url}/${id}`, { method: 'put', body: JSON.stringify(body), headers });

            if (!response.ok) {
                return { didFail: true, failReason: response.statusText };
            }

            return { didFail: false };

        } catch (e) {
            return { didFail: true, failReason: String(e) };
        }
    }    

    //#endregion


    //#endregion
}