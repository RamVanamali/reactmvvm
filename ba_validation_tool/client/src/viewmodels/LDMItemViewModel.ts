import { observable } from 'mobx';
import PromiseAwareViewModelBase from './PromiseAwareViewModelBase';
import LDMService from '../services/LDMService';
import LDMItem from '../models/LDMItem';

export default class LDMItemViewModel extends PromiseAwareViewModelBase {

    constructor(
        private service: LDMService,
        model : LDMItem
    ) { 
        super();
        this.id = model.id;
        this.sourcefield = model.sourcefield;
        this.targetfield = model.targetfield;
        this.datatype = model.datatype;
    }

    //#region properties

    public id : number = 0;

    @observable
    public sourcefield : string = '';

    @observable
    public targetfield : string = '';

    @observable
    public datatype : string = '';

    //#endregion

    //#region methods

    public async updateFields(sourcefield : string,targetfield:string,datatype:string) {
        await this.runWithAwareness(async () => {
            if (!sourcefield && !targetfield) {
                this.didRequestFail = true;
                this.failReason = 'Please provide content for your todo item!';
                this.isAwaiting = false;
                return;
            }
            
            var response = await this.service.updateLDM(this.id, {sourcefield,targetfield,datatype});

            if (response.didFail) {
                this.didRequestFail = true;
                this.failReason = response.failReason;
            } else {
                this.sourcefield = sourcefield;
                this.targetfield = targetfield;
                this.datatype = datatype;
            }
        });
    }

    // public async setIsDone(isDone : boolean) {
    //     await this.runWithAwareness(async () => {
    //         var response = await this.service.updateTodo(this.id, {content: this.content, isDone});

    //         if (response.didFail) {
    //             this.didRequestFail = true;
    //             this.failReason = response.failReason;
    //         } else {
    //             this.isDone = isDone;
    //         }
    //     });
    // }

    //#endregion

}