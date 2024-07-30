import { LightningElement, api, track, wire } from 'lwc';
import updateRecord from '@salesforce/apex/FundingOpportunityService.updateRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';
import getRecords from '@salesforce/apex/ProjectInReviewController.getRecords';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class CompetitionDetail extends LightningElement {
    @track recordId;
    @api initialRecord;
    @track record = {};
    showSpinner = false;
    ifCompetitionAPIName = 'FundingOpportunity';
    allIfCompetitionData;

    @wire(CurrentPageReference)
    currentPageReference;

    statusOptions = [
        { label: 'Planned', value: 'Planned' },
        { label: 'Active', value: 'Active' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Cancelled', value: 'Cancelled' },
    ];

    connectedCallback() {
        this.showSpinner = true;
        this.extractRecordIdFromUrl();
        console.log('recordId ', this.recordId);
        Promise.all([
            this.fetchRecords(this.ifCompetitionAPIName, 'allIfCompetitionData'),
        ]).then(() => {
            console.log('allIfCompetitionData ', this.allIfCompetitionData);
            this.allIfCompetitionData.map((item) => {
                if (item.Id === this.recordId) {
                    this.record = { ...item };
                    this.showSpinner = false;
                }
            })
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
        // this.record = { ...this.initialRecord };
    }

    extractRecordIdFromUrl() {
        if (this.currentPageReference && this.currentPageReference.state) {
            const url = window.location.href;
            const recordId = url.substring(url.lastIndexOf('/') + 1);
            this.recordId = recordId;
        }
    }

    fetchRecords(objectApiName, propertyName) {
        return new Promise((resolve, reject) => {
            getRecords({ objectApiName })
                .then(result => {
                    this[propertyName] = result;
                    resolve();
                })
                .catch(error => {
                    console.error('Error fetching ' + propertyName + ':', error);
                    reject(error);
                });
        });
    }

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this.record = { ...this.record, [field]: event.target.value };
    }

    handleSave() {
        this.showSpinner = true;
        updateRecord({ recordData: this.record })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record updated',
                        variant: 'success'
                    })
                );

                this.showSpinner = false;
                this.dispatchEvent(new CloseActionScreenEvent());
                
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error updating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    handleBackClick() {
        this.dispatchEvent(new CustomEvent('backclick'));
    }
}