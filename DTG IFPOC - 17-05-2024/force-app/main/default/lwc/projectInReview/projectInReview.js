import { LightningElement, track, wire } from 'lwc';
import getRecords from '@salesforce/apex/ProjectInReviewController.getRecords';
import getUserContact from '@salesforce/apex/ProjectInReviewController.getUserContact';
import getPicklistValuesByField from '@salesforce/apex/ProjectInReviewController.getPicklistValuesByField';

const projectColumns = [
    { label: 'SF ID', fieldName: 'Id' },
    { label: 'GO Code', fieldName: 'Go_Code__c' },
    // {
    //     label: 'Title', fieldName: 'Title', type: 'button',
    //     typeAttributes: {
    //         label: { fieldName: 'Title' },
    //         name: 'viewTitle',
    //         title: 'Click to View Details',
    //         variant: 'base'
    //     }
    // },
    { label: 'IF CODE', fieldName: 'IF_Code__c' },
    { label: 'Project Title', fieldName: 'Project_Title__c' },
    { label: 'Project Lead(s)', fieldName: 'Project_Lead_s__c' },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c' },
    { label: 'Review Type', fieldName: 'Review_Type__c' },
    { label: 'Status', fieldName: 'Status__c' },
];

const projectInReviewColumns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Reviewer Name', fieldName: 'Reviewer_Name__c' },
    { label: 'Comments for this Reviewer', fieldName: 'Comments_For_This_Reviewer__c' },
    { label: 'Review Number', fieldName: 'Review_Number__c' },
    { label: 'Review Type', fieldName: 'Review_Type__c' },
    { label: 'Assigned Date', fieldName: 'Assigned_Date__c' },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c' },
    { label: 'Status', fieldName: 'Status__c' },
]

export default class ProjectInReview extends LightningElement {

    projectForReviewData;
    projectReviewSummaryData;
    projectRecordData;
    projectColumns = projectColumns;
    projectInReviewColumns = projectInReviewColumns;

    statusChangeValue = 'inProgress';
    projectCodeValue = 'inProgress';
    goCompetitionChangeValue = 'inProgress';
    isShowInnovationProject = false;
    isShowMeetingDocument = false;
    isShowReviewPane = false;
    selectedReviewProjectRows;
    showConflict = false;
    isGoAdminUser = false;
    reviewSummaryStatusOptions;
    individualApplicationStatusOptions;

    modalName;

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    projectForReviewApiName = 'Project_Review_Assignment__c';
    projectReviewSummaryApiName = 'Project_Review_Summary__c';
    projectApiName = 'IndividualApplication';

    connectedCallback() {
        Promise.all([
            this.fetchRecords(this.projectForReviewApiName, 'projectForReviewData'),
            this.fetchRecords(this.projectReviewSummaryApiName, 'projectReviewSummaryData'),
            this.fetchRecords(this.projectApiName, 'projectRecordData'),
            this.checkUserDesignation(),
            this.fetchPicklistValues(this.projectReviewSummaryApiName),
            this.fetchPicklistValues(this.projectApiName),
        ]).catch(error => {
            console.error('Error fetching data:', error);
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

    checkUserDesignation() {
        return new Promise((resolve, reject) => {
            getUserContact()
                .then(result => {
                    if (result && result.Primary_Designation__c === 'GO Administrator') {
                        this.isGoAdminUser = true;
                    }
                    resolve();
                })
                .catch(error => {
                    console.error('Error fetching user contact details:', error);
                    reject(error);
                });
        });
    }

    fetchPicklistValues(objectApiName) {
        return new Promise((resolve, reject) => {
            getPicklistValuesByField({ objectApiName })
                .then(result => {
                    if(objectApiName === 'Project_Review_Summary__c' && result.Status__c){
                        this.reviewSummaryStatusOptions = result.Status__c
                    }else if(objectApiName === 'IndividualApplication' && result.Status){
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

    handleProjectReviewChange(event) {

    }

    handleButtonClick(event) {
        switch (event.target.name) {
            // case 'innovationProject':
            //     this.isShowInnovationProject = true;
            //     break;
            case 'meetingDocument':
                this.isShowMeetingDocument = true;
                this.modalName = 'Meeting Document';
                this.showConflict = true;
                break;
            case 'reviewerResource':
                this.isShowMeetingDocument = true;
                this.modalName = 'Reviewer Resource';
                this.showConflict = false;
                break;
            default:
                break;
        }
    }

    hideModalBox(event) {
        switch (event.detail.eventName) {
            case 'projectInReview':
                this.isShowInnovationProject = false;
                break;
            case 'meetingDocument':
                this.isShowMeetingDocument = false;
                break;
            case 'reviewPane':
                this.isShowReviewPane = false;
            default:
                break;
        }
    }

    // handleRowAction(event) {
    //     const actionName = event.detail.action.name;
    //     if (actionName === 'viewTitle') {
    //         this.selectedReviewProjectRows = event.detail.row;
    //         this.isShowReviewPane = true;
    //     }
    // }
}