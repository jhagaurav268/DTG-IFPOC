import { LightningElement, track } from 'lwc';
import FundingOpportunityService from '@salesforce/apex/FundingOpportunityService.createRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
export default class CreateGoCompetitionForGoAdmin extends LightningElement {
    initialRecord;
    @track record = {};
    showSpinner = false;

    statusOptions = [
        { label: 'Planned', value: 'Planned' },
        { label: 'Active', value: 'Active' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Cancelled', value: 'Cancelled' },
    ];

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this.record[field] = event.target.value;
    }

    handleSave() {
        this.showSpinner = true;
        FundingOpportunityService({ recordData: this.record })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record created',
                        variant: 'success'
                    })
                );
                this.clearInputs();
                this.showSpinner = false;
                this.dispatchEvent(new CloseActionScreenEvent());
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error Creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    clearInputs() {
        this.record = {};

        this.template.querySelectorAll('lightning-input, lightning-combobox').forEach(input => {
            input.value = null;
        });
        this.template.querySelectorAll('lightning-input-rich-text').forEach(input => {
            input.value = '';
        })

    }
}