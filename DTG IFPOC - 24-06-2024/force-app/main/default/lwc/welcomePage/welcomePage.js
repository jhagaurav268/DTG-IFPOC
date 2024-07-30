import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';

export default class WelcomePage extends LightningElement {
    userId = Id;
    userName;

    @wire(getRecord, { recordId: '$userId', fields: [NAME_FIELD] })
    user({ error, data }) {
        if (data) {
            this.userName = data.fields.Name.value;
        } else if (error) {
            this.userName = 'User';
        }
    }
}