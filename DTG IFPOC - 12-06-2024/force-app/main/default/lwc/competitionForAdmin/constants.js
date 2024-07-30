export const allIfCompetitionColumns = [
    {
        label: 'Name', fieldName: 'Name', wrapText: true,
        type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'allIfCompetition',
            title: 'Click to View Details',
            variant: 'base'
        },
        sortable: "true"
    },
    { label: 'Funding Year', fieldName: 'Funding_Year__c', wrapText: true },
    { label: 'Competition Status', fieldName: 'Status', wrapText: true },
    { label: 'Start Date', fieldName: 'StartDate', wrapText: true },
    { label: 'End Date', fieldName: 'EndDate', wrapText: true },
];

export const allGoCompetitionColumns = [
    {
        label: 'Name', fieldName: 'Name', wrapText: true,
        type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'allGoCompetition',
            title: 'Click to View Details',
            variant: 'base'
        },
        sortable: "true"
    },
    { label: 'Funding Year', fieldName: 'Funding_Year__c', wrapText: true },
    { label: 'Status', fieldName: 'Status', wrapText: true },
    { label: 'Start Date', fieldName: 'StartDate', wrapText: true },
    { label: 'End Date', fieldName: 'EndDate', wrapText: true },
    { label: 'Funding Amount Available For IFPOC', fieldName: 'Funding_Amount_Available_From_IFPOC__c', wrapText: true },
    { label: 'Total Funding Approved From IFPOC Amount', fieldName: 'Total_Funding_Approved_From_IFPOC_Amt1__c', wrapText: true },
];