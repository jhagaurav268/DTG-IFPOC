export const allProjectColumns = [
    {
        label: 'SF CODE', fieldName: 'Name', wrapText: true,
        type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'allProjectReviewName',
            title: 'Click to View Details',
            variant: 'base',
        },
        sortable: "true",
        cellAttributes: { class: { fieldName: 'sfCodeColor' } }
    },
    { label: 'GO CODE', fieldName: 'GO_Internal_Project_Code__c', wrapText: true, cellAttributes: { class: { fieldName: 'goCodeColor' } } },
    { label: 'Title', fieldName: 'Project_Title__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectTitleColor' } } },
    { label: 'Project Lead(s)', fieldName: 'Lead_s__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectLeadsColor' } } },
    { label: 'Status', fieldName: 'Overall_Status__c', wrapText: true, cellAttributes: { class: { fieldName: 'overallStatusColor' } } },
];

export const allFundedProjectColumns = [
    {
        label: 'SF CODE', fieldName: 'Name', wrapText: true,
        type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'allProjectReviewName',
            title: 'Click to View Details',
            variant: 'base'
        },
        sortable: "true",
        cellAttributes: { class: { fieldName: 'sfCodeColor' } }
    },
    { label: 'GO CODE', fieldName: 'GO_Internal_Project_Code__c', wrapText: true, cellAttributes: { class: { fieldName: 'goCodeColor' } } },
    { label: 'Title', fieldName: 'Project_Title__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectTitleColor' } } },
    { label: 'Project Lead(s)', fieldName: 'Lead_s__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectLeadsColor' } } },
    { label: 'Status', fieldName: 'Overall_Status__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectStatusColor' } } },
    { label: 'GO Annual Report Due Date', fieldName: 'GO_Annual_Report_Due_Date__c', wrapText: true, cellAttributes: { class: { fieldName: 'goAnnualReportColor' } } },
    { label: 'GO Final Report Due Date', fieldName: 'GO_Final_Report_Due_Date__c', wrapText: true, cellAttributes: { class: { fieldName: 'goFinalReportColor' } } },
];