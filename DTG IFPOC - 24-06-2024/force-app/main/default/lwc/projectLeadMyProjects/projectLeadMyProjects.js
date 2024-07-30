import { LightningElement } from 'lwc';
import { allProjectColumns, allFundedProjectColumns } from './constants';
import getRecords from '@salesforce/apex/ProjectInReviewController.getRecords';
import getUserContact from '@salesforce/apex/ProjectInReviewController.getUserContact';
import { loadStyle } from 'lightning/platformResourceLoader'
import COLORS from '@salesforce/resourceUrl/colors'

export default class ProjectLeadMyProjects extends LightningElement {
    allProjectData;
    filteredAllProjectData;
    allProjectColumns = allProjectColumns;
    allFundedProjectColumns = allFundedProjectColumns;
    showSpinner = true;
    isProjectLeadUser = false;

    allProjectAPiName = 'IndividualApplication';
    allFundedProjectsData;
    isCssLoaded = false

    connectedCallback() {
        Promise.all([
            this.fetchRecords(this.allProjectAPiName, 'allProjectData'),
            this.checkUserDesignation(),
        ]).then(() => {
            this.filterDataByCurrentYear();
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

    filterDataByCurrentYear() {
        const currentYear = new Date().getFullYear();
        this.filteredAllProjectData = this.allProjectData.filter(item => {
            if (!item.Innovation_Fund_Year__c) {
                return false;
            }

            const yearRange = item.Innovation_Fund_Year__c.match(/\((\d{4})\/(\d{4})\)/);
            if (yearRange) {
                const startYear = parseInt(yearRange[1], 10);
                const endYear = parseInt(yearRange[2], 10);
                return currentYear >= startYear && currentYear <= endYear;
            }
            return false;
        });

        this.filteredAllProjectData = this.filteredAllProjectData.map(item => {
            return {
                ...item,
                "sfCodeColor": "datatable-orange",
                "goCodeColor": "datatable-aqua",
                "projectTitleColor": "datatable-blue",
                "projectLeadsColor": "datatable-purple",
                "overallStatusColor": "datatable-lightorange"
            }

        })
    }

    filterDataByStatus() {
        this.allFundedProjectsData = this.allProjectData.filter(item => {
            return item.Overall_Status__c && item.Overall_Status__c.includes('Approved');
        });

        this.allFundedProjectsData = this.allFundedProjectsData.map(item => {
            return {
                ...item,
                "sfCodeColor": "datatable-orange",
                "goCodeColor": "datatable-aqua",
                "projectTitleColor": "datatable-blue",
                "projectLeadsColor": "datatable-purple",
                "projectStatusColor": "datatable-lightorange",
                "goAnnualReportColor": "datatable-orange",
                "goFinalReportColor": "datatable-aqua",
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