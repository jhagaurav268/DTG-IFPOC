import { LightningElement, track } from 'lwc';

export default class ProjectLeadAboutGrant extends LightningElement {

    @track isShowModal = false;

    showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }

}