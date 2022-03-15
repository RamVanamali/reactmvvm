import { observable, computed } from 'mobx';
import LDMItem from '../models/LDMItem';
import LDMService from '../services/LDMService';
import PromiseAwareViewModelBase from './PromiseAwareViewModelBase';
import LDMItemViewModel from './LDMItemViewModel';

export default class LDMListViewModel extends PromiseAwareViewModelBase {

    constructor(
        private service : LDMService
    ) { super() }

    //#region properties

    @observable 
    public LDMItems : Array<LDMItemViewModel> = [];

    @computed
    public get LDMsCount() { return this.LDMItems?.length ?? 0 }

    //#endregion

    //#region methods

    public async fetchLDMItems() {
        await this.runWithAwareness(async () => {
            var response = await this.service.getAll();

            if (response.didFail) {
                this.didRequestFail = true;
                this.failReason = response.failReason;
            } else {
                this.LDMItems = (response.data as Array<LDMItem>).map(item => new LDMItemViewModel(this.service, item));
            }
        });
    }

    // public async addLDMItem(content: string) {
    //     await this.runWithAwareness(async () => {
    //         if (!content) {
    //             this.didRequestFail = true;
    //             this.failReason = 'Please provide content for your LDM item!';
    //             this.isAwaiting = false;
    //             return;
    //         }
    
    //         var response = await this.service.addNewLDM({content});
    
    //         if (response.didFail) {
    //             this.didRequestFail = true;
    //             this.failReason = response.failReason;
    //         } else {
    //             this.LDMItems.push(
    //                 new LDMItemViewModel(
    //                     this.service,
    //                     new LDMItem(
    //                         response.data as number, 
    //                         content, 
    //                         false
    //                     )
    //                 )
    //             );
    //         }
    //     });
    // }


    //#endregion

}