import { LightningElement, track } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LockRecords extends LightningElement {
    @track currentId = [];

    connectedCallback() {
        const url = window.location.href;
        const idMatch = url.match(/\/s\/detail\/([^\/]+)$/);
        if (idMatch) {
            let id = idMatch[1];

            this.currentId = [{
                name: 'currentId',
                type: 'String',
                value: id
            }];

            console.log('currentId ', JSON.stringify(this.currentId));
        } else {
            console.error('ID not found in URL');
        }
    }

    handleFlowStatusChange(event) {
        if (event.detail.status === 'FINISHED_SCREEN') {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully Locked this Record',
                    variant: 'success'
                })
            );

            this.showSpinner = false;
            this.dispatchEvent(new CloseActionScreenEvent());
        }
    }
}
