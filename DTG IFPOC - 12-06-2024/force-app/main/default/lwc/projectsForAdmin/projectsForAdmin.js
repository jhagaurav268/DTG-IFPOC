import { LightningElement } from 'lwc';
import getRecords from '@salesforce/apex/ProjectInReviewController.getRecords';
import getPicklistValuesByField from '@salesforce/apex/ProjectInReviewController.getPicklistValuesByField';
import { NavigationMixin } from 'lightning/navigation';
import { allProjectColumns } from './constants';

export default class ProjectsForAdmin extends NavigationMixin(LightningElement) {
    allProjectSearchValue;
    allProjectFundingYearValue;
    allProjectFundingYearOptions;
    allProjectPhaseValue;
    allProjectPhaseOptions;
    allProjectStatusValue;
    allProjectStatusOptions;
    allProjectData;
    filteredAllProjectData;
    allProjectColumns = allProjectColumns;

    allProjectAPiName = 'IndividualApplication';
    ifCompetitionAPIName = 'Program';

    connectedCallback() {
        Promise.all([
            this.fetchRecords(this.allProjectAPiName, 'allProjectData'),
            this.fetchPicklistValues(this.allProjectAPiName),
            this.fetchPicklistValues(this.ifCompetitionAPIName),
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
                    console.log('Result is ', result);
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
                    if (objectApiName === 'Program' && result.Funding_Year__c) {
                        this.allProjectFundingYearOptions = this.prependNoneOption(result.Funding_Year__c);
                        this.allProjectPhaseOptions = this.prependNoneOption(result.Funding_Year__c);
                    } else if (objectApiName === 'IndividualApplication' && result.InternalStatus) {
                        this.allProjectStatusOptions = this.prependNoneOption(result.InternalStatus);
                    }
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
            case 'allProjectSearch':
                this.filteredAllProjectData = this.filterData(this.allProjectData, lowerCaseValue);
                break;

            case 'allProjectStatus':
                this.allProjectStatusValue = value;
                this.filteredAllProjectData = this.filterPicklistData(this.allProjectData, this.allProjectStatusValue, 'InternalStatus', true);
                break;

            case 'allProjectPhase':
                this.allProjectPhaseValue = value;
                this.filteredAllProjectData = this.filterPicklistData(this.allProjectData, this.allProjectStatusValue, 'Phase__c', true);
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
                case 'allProjectName':
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
}