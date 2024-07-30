import { LightningElement, track, wire } from 'lwc';
import getRecords from '@salesforce/apex/ProjectInReviewController.getRecords';
import getUserContact from '@salesforce/apex/ProjectInReviewController.getUserContact';
import getPicklistValuesByField from '@salesforce/apex/ProjectInReviewController.getPicklistValuesByField';
import { NavigationMixin } from 'lightning/navigation';

const projectColumns = [
    {
        label: 'SF ID', fieldName: 'Name', wrapText: true, type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'individualApplication',
            title: 'Click to View Details',
            variant: 'base'
        }
    },
    { label: 'GO Code', fieldName: 'Go_Code__c', wrapText: true },
    { label: 'IF CODE', fieldName: 'IF_Code__c', wrapText: true },
    { label: 'Project Title', fieldName: 'Project_Title__c', wrapText: true },
    { label: 'Project Lead(s)', fieldName: 'Project_Lead_s__c', wrapText: true },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c', wrapText: true },
    { label: 'Review Type', fieldName: 'Review_Type__c', wrapText: true },
    { label: 'Status', fieldName: 'Status__c', wrapText: true },
];

const projectInReviewColumns = [
    { label: 'Name', fieldName: 'Name', wrapText: true },
    // { label: 'Reviewer Name', fieldName: 'Reviewer_Name__c' },
    { label: 'Comments for this Reviewer', fieldName: 'Comments_For_This_Reviewer__c', wrapText: true, initialWidth: 200 },
    { label: 'Review Number', fieldName: 'Review_Number__c', wrapText: true },
    { label: 'Review Type', fieldName: 'Review_Type__c', wrapText: true },
    { label: 'Assigned Date', fieldName: 'Assigned_Date__c', wrapText: true },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c', wrapText: true },
    { label: 'Status', fieldName: 'Status__c', wrapText: true },
]

export default class ProjectInReview extends NavigationMixin(LightningElement) {

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
    showConflict = false;
    isGoAdminUser = false;
    reviewSummaryStatusOptions;
    individualApplicationStatusOptions;
    @track filteredProjectReviewData;
    @track filteredProjectData;

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
        ]).then(() => {
            this.filteredProjectReviewData = this.projectReviewSummaryData;
            this.filteredProjectData = this.projectRecordData;
        }).catch(error => {
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
                    if (objectApiName === 'Project_Review_Summary__c' && result.Status__c) {
                        this.reviewSummaryStatusOptions = result.Status__c
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

    handleProjectReviewChange(event) {
        console.log(event.target.name);
        switch (event.target.name) {
            case 'projectReviewSearch':
                const projectReviewSearchKey = event.target.value.toLowerCase();
                this.filteredProjectReviewData = this.projectReviewSummaryData.filter(row => {
                    return Object.values(row).some(value =>
                        String(value).toLowerCase().includes(projectReviewSearchKey)
                    );
                });
                break;
            case 'projectSearch':
                const projectSearchKey = event.target.value.toLowerCase();
                this.filteredProjectData = this.projectRecordData.filter(row => {
                    return Object.values(row).some(value =>
                        String(value).toLowerCase().includes(projectSearchKey)
                    );
                });
                break;
            default:
                break;
        }
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

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        if (actionName === 'individualApplication') {
            // console.log('row->>',event.detail.row);
            let rowId = event.detail.row.Id;
            if(rowId){
                console.log(rowId);
                this.navigateToRecordPage(this.projectApiName, event.detail.row.Id);
            }
        }
    }

    navigateToRecordPage(objectApiName, recordId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: objectApiName,
                actionName: 'view'
            },
        });
    }
}