import { LightningElement } from 'lwc';
import { allIfCompetitionColumns, allGoCompetitionColumns } from './constants';
import getRecords from '@salesforce/apex/ProjectInReviewController.getRecords';
import getPicklistValuesByField from '@salesforce/apex/ProjectInReviewController.getPicklistValuesByField';
import { NavigationMixin } from 'lightning/navigation';
import getUserContact from '@salesforce/apex/ProjectInReviewController.getUserContact';
import { loadStyle } from 'lightning/platformResourceLoader'
import COLORS from '@salesforce/resourceUrl/colors'

export default class CompetitionForAdmin extends NavigationMixin(LightningElement) {
    //IF Competition Variables
    ifCompetitionSearchValue;
    ifFundingYearValue;
    ifFundingYearOptions;
    allIfCompetitionData;
    filteredIfCompetitionData;
    allIfCompetitionColumns = allIfCompetitionColumns;

    //GO Competition Variable
    goCompetitionSearchValue;
    goFundingYearValue;
    goFundingYearOptions;
    goStatusValue;
    goStatusOptions;
    allGoCompetitionData;
    filteredGoCompetitionData;
    allGOCompetitionColumns = allGoCompetitionColumns;

    //object API Name
    ifCompetitionAPIName = 'Program';
    goCompetitionAPIName = 'FundingOpportunity';

    isGoAdminUser = false;
    showSpinner = false;
    isCssLoaded = false;
    // isRecordDatailPage = false;

    currentRow;

    connectedCallback() {
        Promise.all([
            this.showSpinner = true,
            this.fetchRecords(this.ifCompetitionAPIName, 'allIfCompetitionData'),
            this.fetchRecords(this.goCompetitionAPIName, 'allGoCompetitionData'),
            this.fetchPicklistValues(this.ifCompetitionAPIName),
            this.fetchPicklistValues(this.goCompetitionAPIName),
            this.checkUserDesignation(),
        ]).then(() => {
            this.allIfCompetitionData = this.allIfCompetitionData.map(item => {
                return {
                    ...item,
                    "nameColor": "datatable-orange",
                    "fundingYearColor": "datatable-aqua",
                    "competitionStatusColor": "datatable-blue",
                    "startDateColor": "datatable-purple",
                    "endDateColor": "datatable-lightorange"
                }
            })

            this.allGoCompetitionData = this.allGoCompetitionData.map(item => {
                return {
                    ...item,
                    "nameColor": "datatable-orange",
                    "fundingYearColor": "datatable-aqua",
                    "statusColor": "datatable-blue",
                    "startDateColor": "datatable-purple",
                    "endDateColor": "datatable-lightorange",
                    "ifpocAmtAvailableColor": "datatable-orange",
                    "ifpocAmtFundingColor": "datatable-aqua",
                }
            })
            this.filteredIfCompetitionData = this.allIfCompetitionData;
            this.filteredGoCompetitionData = this.allGoCompetitionData;
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
                    if (objectApiName === 'Program' && result.Funding_Year__c) {
                        this.ifFundingYearOptions = this.prependNoneOption(result.Funding_Year__c);
                        this.goFundingYearOptions = this.prependNoneOption(result.Funding_Year__c);
                    } else if (objectApiName === 'FundingOpportunity' && result.Status) {
                        this.goStatusOptions = this.prependNoneOption(result.Status);
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


    handleCompetitionChange(event) {
        const { name, value } = event.target;
        const lowerCaseValue = value.toLowerCase();

        switch (name) {
            case 'ifCompetitionSearch':
                this.filteredIfCompetitionData = this.filterData(this.allIfCompetitionData, lowerCaseValue);
                break;

            case 'goCompetitionSearch':
                this.filteredGoCompetitionData = this.filterData(this.allGoCompetitionData, lowerCaseValue);
                break;

            case 'ifFundingYear':
                this.ifFundingYearValue = value;
                this.filteredIfCompetitionData = this.filterPicklistDataByFundingYear(this.allIfCompetitionData, this.ifFundingYearValue, true);
                break;

            case 'goFundingYear':
                this.goFundingYearValue = value;
                this.filteredGoCompetitionData = this.filterPicklistDataByFundingYear(this.allGoCompetitionData, this.goFundingYearValue, true);
                break;

            case 'goStatus':
                this.goStatusValue = value;
                this.filteredGoCompetitionData = this.filterPicklistDataByStatus(this.allGoCompetitionData, this.goStatusValue, true);
                break;

        }
    }

    filterData(data, searchKey) {
        return data.filter(row => Object.values(row).some(value => String(value).toLowerCase().includes(searchKey)));
    }

    filterPicklistDataByFundingYear(data, fundingYear, allowNone = false) {
        if (allowNone && fundingYear === 'None') {
            return data;
        }
        return data.filter(row => row.Funding_Year__c === fundingYear);
    }

    filterPicklistDataByStatus(data, status, allowNone = false) {
        if (allowNone && status === 'None') {
            return data;
        }
        return data.filter(row => row.Status === status);
    }

    handleRowAction(event) {
        this.currentRow = event.detail.row;
        const { action: { name }, row: { Id } } = event.detail;
        if (Id) {
            //const objectApiName = name === 'individualApplication' ? this.projectApiName : this.projectReviewSummaryApiName;
            var objectApiName;
            switch (name) {
                case 'allIfCompetition':
                    objectApiName = this.ifCompetitionAPIName;
                    this.navigateToRecordPage(objectApiName, Id);
                    break;
                case 'allGoCompetition':
                    // this.isRecordDatailPage = true;
                    objectApiName = this.goCompetitionAPIName;
                    this.navigateToRecordPage(objectApiName, Id);
                    break;
            }
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

    // handleBackClick(){
    //     this.isRecordDatailPage = false;
    // }

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