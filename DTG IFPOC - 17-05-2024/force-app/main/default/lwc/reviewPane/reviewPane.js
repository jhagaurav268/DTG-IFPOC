import { LightningElement, api } from 'lwc';

export default class ReviewPane extends LightningElement {
    @api selectedData;

    hideModalBox() {  
        const closeModalEvent = new CustomEvent('closemodal', {detail : {
            eventName: 'reviewPane'
        }});
        this.dispatchEvent(closeModalEvent);
    }
}