import { LightningElement } from 'lwc';
import getRecords from '@salesforce/apex/ProjectInReviewController.getRecords';
import getAllProjectReviewAssignment from '@salesforce/apex/ProjectInReviewController.getAllProjectReviewAssignment';
import getPicklistValuesByField from '@salesforce/apex/ProjectInReviewController.getPicklistValuesByField';
import { NavigationMixin } from 'lightning/navigation';
import { allProjectColumns, projectAssignmentColumns } from './constants';

export default class ReviewForAdmin extends NavigationMixin(LightningElement) {
    allProjectReviewSearchValue;
    allProjectReviewStatusValue;
    allProjectReviewStatusOptions;
    allProjectPracticePlanValueOne;
    allProjectPracticePlanOptionsOne;
    allProjectPracticePlanValueTwo;
    allProjectPracticePlanOptionsTwo;
    allProjectData;
    filteredAllProjectData;
    allProjectColumns = allProjectColumns;

    allProjectAPiName = 'IndividualApplication';
    projectForReviewApiName = 'Project_Review_Assignment__c';

    projectAssignmentColumns = projectAssignmentColumns;
    reviewAssignmentData;


    connectedCallback() {
        Promise.all([
            this.fetchRecords(this.allProjectAPiName, 'allProjectData'),
            this.fetchPicklistValues(this.allProjectAPiName),
            this.fetchAssignmentData()
        ]).then(() => {
            this.filteredAllProjectData = this.allProjectData;
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    fetchRecords(objectApiName, propertyName) {
        return new Promise((resolve, reject) => {
            getRecords({ objectApiName })
                .then(result => {
                    console.log(result);
                    this[propertyName] = result;
                    resolve();
                })
                .catch(error => {
                    console.error('Error fetching ' + propertyName + ':', error);
                    reject(error);
                });
        });
    }

    fetchPicklistValues(objectApiName) {
        return new Promise((resolve, reject) => {
            getPicklistValuesByField({ objectApiName })
                .then(result => {
                    this.allProjectReviewStatusOptions = this.prependNoneOption(result.InternalStatus);
                    this.allProjectPracticePlanOptionsOne = this.prependNoneOption(result.PL_1_Practice_Plan__c);
                    this.allProjectPracticePlanOptionsTwo = this.prependNoneOption(result.PL_2_Practice_Plan__c);
                    resolve();
                })
                .catch(error => {
                    console.error('Error fetching picklist values:', error);
                    reject(error);
                });
        });
    }

    prependNoneOption(options) {
        return [{ label: 'None', value: 'None' }, ...options];
    }


    handleProjectChange(event) {
        const { name, value } = event.target;
        const lowerCaseValue = value.toLowerCase();

        switch (name) {
            case 'allProjectForReviewSearch':
                this.filteredAllProjectData = this.filterData(this.allProjectData, lowerCaseValue);
                break;

            case 'allProjectReviewStatus':
                this.allProjectReviewStatusValue = value;
                this.filteredAllProjectData = this.filterPicklistData(this.allProjectData, this.allProjectReviewStatusValue, 'InternalStatus', true);
                break;

            case 'allProjectPracticePlanOne':
                this.allProjectPracticePlanValueOne = value;
                this.filteredAllProjectData = this.filterPicklistData(this.allProjectData, this.allProjectPracticePlanValueOne, 'PL_1_Practice_Plan__c', true);
                break;

            case 'allProjectPracticePlanTwo':
                this.allProjectPracticePlanValueTwo = value;
                this.filteredAllProjectData = this.filterPicklistData(this.allProjectData, this.allProjectPracticePlanValueTwo, 'PL_2_Practice_Plan__c', true);
                break;
        }
    }

    filterData(data, searchKey) {
        return data.filter(row => Object.values(row).some(value => String(value).toLowerCase().includes(searchKey)));
    }

    filterPicklistData(data, status, filteredValue, allowNone = false) {
        if (allowNone && status === 'None') {
            return data;
        }
        return data.filter(row => row[filteredValue] === status);
    }

    handleRowAction(event) {
        const { action: { name }, row: { Id } } = event.detail;
        if (Id) {
            //const objectApiName = name === 'individualApplication' ? this.projectApiName : this.projectReviewSummaryApiName;
            var objectApiName;
            switch (name) {
                case 'allProjectReviewName':
                    objectApiName = this.allProjectAPiName;
                    break;
            }
            this.navigateToRecordPage(objectApiName, Id);
        }
    }

    navigateToRecordPage(objectApiName, recordId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId,
                objectApiName,
                actionName: 'view'
            },
        });
    }

    handleFlowStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            console.log('FLOW FINISHED');
            this.fetchAssignmentData();
            // this.fetchRecords(this.projectForReviewApiName, 'reviewAssignmentData');
        }
    }

    fetchAssignmentData() {
        getAllProjectReviewAssignment({ objectApiName: this.projectForReviewApiName })
            .then(result => {
                console.log(result);
                this.reviewAssignmentData = result;
            })
            .catch(error => {
                console.error('Error fetching ' + propertyName + ':', error);
                reject(error);
            });
    }
}