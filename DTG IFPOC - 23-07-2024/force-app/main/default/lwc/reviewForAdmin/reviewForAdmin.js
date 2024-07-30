import { LightningElement } from 'lwc';
import getRecords from '@salesforce/apex/ProjectInReviewController.getRecords';
import getAllProjectReviewAssignment from '@salesforce/apex/ProjectInReviewController.getAllProjectReviewAssignment';
import getPicklistValuesByField from '@salesforce/apex/ProjectInReviewController.getPicklistValuesByField';
import { NavigationMixin } from 'lightning/navigation';
import { allProjectColumns, projectAssignmentColumns } from './constants';
import getUserContact from '@salesforce/apex/ProjectInReviewController.getUserContact';
import { loadStyle } from 'lightning/platformResourceLoader'
import COLORS from '@salesforce/resourceUrl/colors'

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
    showSpinner = false;

    allProjectAPiName = 'IndividualApplication';
    projectForReviewApiName = 'Project_Review_Assignment__c';

    projectAssignmentColumns = projectAssignmentColumns;
    reviewAssignmentData;
    isGoAdminUser = false;
    isCssLoaded = false;

    connectedCallback() {
        Promise.all([
            this.showSpinner = true,
            this.fetchRecords(this.allProjectAPiName, 'allProjectData'),
            this.fetchPicklistValues(this.allProjectAPiName),
            this.fetchAssignmentData(),
            this.checkUserDesignation(),
        ]).then(() => {
            this.allProjectData = this.allProjectData.map(item => {
                return {
                    ...item,
                    "sfCodeColor": "datatable-orange",
                    "goCodeColor": "datatable-aqua",
                    "ifCodeColor": "datatable-blue",
                    "projectTitleColor": "datatable-purple",
                    "projectLeadsColor": "datatable-lightorange",
                    "plOnePlanColor": "datatable-orange",
                    "plTwoPlanColor": "datatable-lightorange",
                    "internalStatusColor": "datatable-orange",
                }
            });
            this.filteredAllProjectData = this.allProjectData;
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    checkUserDesignation() {
        return new Promise((resolve, reject) => {
            getUserContact()
                .then(result => {
                    if (result && result.Primary_Designation__c.includes('GO Admin')) {
                        this.isGoAdminUser = true;
                        this.showSpinner = false;
                    } else {
                        this.showSpinner = false;
                    }
                    resolve();
                })
                .catch(error => {
                    console.error('Error fetching user contact details:', error);
                    reject(error);
                });
        });
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
            this.fetchAssignmentData();

            // this.fetchRecords(this.projectForReviewApiName, 'reviewAssignmentData');
        }
    }

    fetchAssignmentData() {
        getAllProjectReviewAssignment({ objectApiName: this.projectForReviewApiName })
            .then(result => {
                this.reviewAssignmentData = result.map(item => {
                    return {
                        ...item,
                        "nameColor": "datatable-orange",
                        "reviewerNameColor": "datatable-aqua",
                        "reviewerNumberColor": "datatable-blue",
                        "reviewNumberColor": "datatable-purple",
                        "reviewTypeColor": "datatable-lightorange",
                        "assignedDateColor": "datatable-orange",
                        "reviewDeadlineColor": "datatable-blue",
                        "statusColor": "datatable-purple"
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching ' + propertyName + ':', error);
                reject(error);
            });
    }

    renderedCallback() {
        if (this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(() => {
            // console.log("Loaded Successfully")
        }).catch(error => {
            console.error("Error in loading the colors")
        })
    }
}