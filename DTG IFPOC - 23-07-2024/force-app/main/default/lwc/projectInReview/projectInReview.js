import { LightningElement, track, wire } from 'lwc';
import getRecords from '@salesforce/apex/ProjectInReviewController.getRecords';
import getPicklistValuesByField from '@salesforce/apex/ProjectInReviewController.getPicklistValuesByField';
import getGOsListPicklistValues from '@salesforce/apex/ProjectInReviewController.getGOsListPicklistValues';
import { NavigationMixin } from 'lightning/navigation';
import { allProjectColumns, projectReviewSummaryColumns, projectGroupingForReviewColumns } from './constant';
import getUserContact from '@salesforce/apex/ProjectInReviewController.getUserContact';

import { loadStyle } from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/colors';
export default class ProjectInReview extends NavigationMixin(LightningElement) {

    projectForReviewData;
    projectReviewSummaryData;
    projectRecordData;
    projectReviewSummaryColumns = projectReviewSummaryColumns;
    projectGroupingForReviewColumns = projectGroupingForReviewColumns;
    allProjectColumns = allProjectColumns;

    statusChangeValue;
    goProjectSummaryChangeValue;
    goAllProjectChangeValue;
    reviewSummaryStatusOptions;
    individualApplicationStatusOptions;
    goListOptions;
    @track filteredProjectReviewData;
    @track filteredProjectData;
    showSpinner = false;

    projectForReviewApiName = 'Project_Review_Assignment__c';
    projectReviewSummaryApiName = 'Project_Review_Summary__c';
    projectApiName = 'IndividualApplication';

    isGoReviewerUser = false;

    @track sortBy;
    @track sortDirection;

    connectedCallback() {
        Promise.all([
            this.showSpinner = true,
            this.fetchRecords(this.projectForReviewApiName, 'projectForReviewData'),
            this.fetchRecords(this.projectReviewSummaryApiName, 'projectReviewSummaryData'),
            this.fetchRecords(this.projectApiName, 'projectRecordData'),
            this.fetchPicklistValues(this.projectReviewSummaryApiName),
            this.fetchPicklistValues(this.projectApiName),
            this.fetchAllGOsData(),
            this.checkUserDesignation(),
        ]).then(() => {
            this.projectReviewSummaryData = this.projectReviewSummaryData.map(item => {
                return {
                    ...item,
                    "sfIdColor": "datatable-orange",
                    "goCodeColor": "datatable-aqua",
                    "ifCodeColor": "datatable-blue",
                    "projectTitleColor": "datatable-purple",
                    "projectLeadsColor": "datatable-lightorange",
                    "reviewDeadlineColor": "datatable-blue",
                    "reviewTypeColor": "datatable-purple",
                    "statusColor": "datatable-aqua"
                }
            })

            this.projectRecordData = this.projectRecordData.map(item => {
                return {
                    ...item,
                    "sfIdColor": "datatable-orange",
                    "goCodeColor": "datatable-aqua",
                    "ifProjectCodeColor": "datatable-blue",
                    "projectTitleColor": "datatable-purple",
                    "projectLeadsColor": "datatable-lightorange",
                    "reviewDeadlineColor": "datatable-blue",
                    "reviewTypeColor": "datatable-aqua",
                    "statusColor": "datatable-purple"
                }

            })
            this.projectForReviewData = this.projectForReviewData.map(item => {
                return {
                    ...item,
                    "nameColor": "datatable-orange",
                    "commentReviewerColor": "datatable-aqua",
                    "reviewNumberColor": "datatable-blue",
                    "reviewTypeColor": "datatable-purple",
                    "assignedDateColor": "datatable-lightorange",
                    "reviewDeadlineColor": "datatable-blue",
                    "statusColor": "datatable-purple"
                }

            })
            this.filteredProjectReviewData = this.projectReviewSummaryData;
            this.filteredProjectData = this.projectRecordData;
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    checkUserDesignation() {
        return new Promise((resolve, reject) => {
            getUserContact()
                .then(result => {
                    if (result && result.Primary_Designation__c.includes('GO Reviewer')) {
                        this.isGoReviewerUser = true;
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
                    if (objectApiName === 'Project_Review_Summary__c' && result.Status__c) {
                        this.reviewSummaryStatusOptions = result.Status__c;
                    } else if (objectApiName === 'IndividualApplication' && result.Status) {
                        this.individualApplicationStatusOptions = result.Status;
                    }
                    resolve();
                })
                .catch(error => {
                    console.error('Error fetching picklist values:', error);
                    reject(error);
                });
        });
    }

    fetchAllGOsData() {
        return new Promise((resolve, reject) => {
            getGOsListPicklistValues()
                .then(result => {
                    this.goListOptions = result;
                    resolve();
                })
                .catch(error => {
                    console.error('Error fetching picklist values:', error);
                    reject(error);
                });
        });
    }

    handleProjectReviewChange(event) {
        const { name, value } = event.target;
        const lowerCaseValue = value.toLowerCase();

        switch (name) {
            case 'projectReviewSearch':
                this.filteredProjectReviewData = this.filterData(this.projectReviewSummaryData, lowerCaseValue);
                break;
            case 'projectSearch':
                this.filteredProjectData = this.filterData(this.projectRecordData, lowerCaseValue);
                break;
            case 'projectSummaryStatus':
                this.statusChangeValue = value;
                this.filteredProjectReviewData = this.filterDataByStatus(this.projectReviewSummaryData, this.statusChangeValue);
                break;
            case 'allProjectStatus':
                this.statusChangeValue = value;
                this.filteredProjectData = this.filterDataByStatus(this.projectRecordData, this.statusChangeValue);
                break;
            case 'goProjectSummary':
                this.goProjectSummaryChangeValue = value;
                this.filteredProjectReviewData = this.filterDataByStatus(this.projectReviewSummaryData, this.goProjectSummaryChangeValue, true);
                break;
            case 'goAllProject':
                this.goAllProjectChangeValue = value;
                this.filteredProjectData = this.filterDataByStatus(this.projectRecordData, this.goAllProjectChangeValue, true);
                break;
        }
    }

    filterData(data, searchKey) {
        return data.filter(row => Object.values(row).some(value => String(value).toLowerCase().includes(searchKey)));
    }

    filterDataByStatus(data, status, allowNone = false) {
        if (allowNone && status === 'None') {
            return data;
        }
        return data.filter(row => row.Status__c === status);
    }

    handleRowAction(event) {
        const { action: { name }, row: { Id } } = event.detail;
        if (Id) {
            //const objectApiName = name === 'individualApplication' ? this.projectApiName : this.projectReviewSummaryApiName;
            var objectApiName;
            switch (name) {
                case 'projectReviewAssignment':
                    objectApiName = this.projectForReviewApiName;
                    break;
                case 'projectReviewSummary':
                    objectApiName = this.projectReviewSummaryApiName;
                    break;
                case 'individualApplication':
                    objectApiName = this.projectApiName;
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

    doSorting(event) {
        const { fieldName, sortDirection } = event.detail;
        this.sortBy = fieldName;
        this.sortDirection = sortDirection;
        const data = event.target.name === 'projectPreviewSummary' ? this.filteredProjectReviewData : this.filteredProjectData;
        this.sortData(this.sortBy, this.sortDirection, data, event.target.name);
    }

    sortData(fieldname, direction, data, eventName) {
        const parseData = [...data];
        const isReverse = direction === 'asc' ? 1 : -1;
        parseData.sort((a, b) => {
            const x = a[fieldname] ? a[fieldname] : '';
            const y = b[fieldname] ? b[fieldname] : '';
            return isReverse * ((x > y) - (y > x));
        });
        if (eventName === 'projectPreviewSummary') {
            this.filteredProjectReviewData = parseData;
        } else {
            this.filteredProjectData = parseData;
        }
    }

    renderedCallback() {
        if (this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(() => {
            console.log("Loaded Successfully")
        }).catch(error => {
            console.error("Error in loading the colors")
        })
    }
}