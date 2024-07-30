import { LightningElement } from 'lwc';
import { allFundedProjectColumns } from './constants';
import getRecords from '@salesforce/apex/ProjectInReviewController.getRecords';
import getUserContact from '@salesforce/apex/ProjectInReviewController.getUserContact';
import { loadStyle } from 'lightning/platformResourceLoader'
import COLORS from '@salesforce/resourceUrl/colors'

export default class ProjectLeadProjectReporting extends LightningElement {
    allProjectData;
    allFundedProjectsData;
    allFundedProjectColumns = allFundedProjectColumns;
    showSpinner = true;
    isProjectLeadUser;
    isCssLoaded = false;

    allProjectAPiName = 'IndividualApplication';

    connectedCallback() {
        Promise.all([
            this.fetchRecords(this.allProjectAPiName, 'allProjectData'),
            this.checkUserDesignation(),
        ]).then(() => {
            this.filterDataByStatus();
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    checkUserDesignation() {
        return new Promise((resolve, reject) => {
            getUserContact()
                .then(result => {
                    if (result && result.Primary_Designation__c.includes('Project Lead')) {
                        this.isProjectLeadUser = true;
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

    filterDataByStatus() {
        this.allFundedProjectsData = this.allProjectData.filter(item => {
            return item.Overall_Status__c && item.Overall_Status__c.includes('Approved');
        });

        this.allFundedProjectsData = this.allFundedProjectsData.map(item => {
            return {
                ...item,
                "nameColor": "datatable-orange",
                "goCodeColor": "datatable-aqua",
                "titleColor": "datatable-blue",
                "projectLeadsColor": "datatable-purple",
                "overallStatusColor": "datatable-lightorange",
                "annualReportDueDateColor": "datatable-orange",
                "finalReportDueDateColor": "datatable-aqua",
            }
        })
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