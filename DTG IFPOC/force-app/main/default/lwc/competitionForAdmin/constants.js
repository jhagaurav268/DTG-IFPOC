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
        sortable: "true",
        cellAttributes: { class: { fieldName: 'nameColor' } }
    },
    { label: 'Funding Year', fieldName: 'Funding_Year__c', wrapText: true, cellAttributes: { class: { fieldName: 'fundingYearColor' } } },
    { label: 'Competition Status', fieldName: 'Status', wrapText: true, cellAttributes: { class: { fieldName: 'competitionStatusColor' } } },
    { label: 'Start Date', fieldName: 'StartDate', wrapText: true, cellAttributes: { class: { fieldName: 'startDateColor' } } },
    { label: 'End Date', fieldName: 'EndDate', wrapText: true, cellAttributes: { class: { fieldName: 'endDateColor' } } },
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
        sortable: "true",
        cellAttributes: { class: { fieldName: 'nameColor' } }
    },
    { label: 'Funding Year', fieldName: 'Funding_Year__c', wrapText: true, cellAttributes: { class: { fieldName: 'fundingYearColor' } } },
    { label: 'Status', fieldName: 'Status', wrapText: true, cellAttributes: { class: { fieldName: 'statusColor' } } },
    { label: 'Start Date', fieldName: 'StartDate', wrapText: true, cellAttributes: { class: { fieldName: 'startDateColor' } } },
    { label: 'End Date', fieldName: 'EndDate', wrapText: true, cellAttributes: { class: { fieldName: 'endDateColor' } } },
    { label: 'Funding Amount Available For IFPOC', fieldName: 'Funding_Amount_Available_From_IFPOC__c', wrapText: true, cellAttributes: { class: { fieldName: 'ifpocAmtAvailableColor' } } },
    { label: 'Total Funding Approved From IFPOC Amount', fieldName: 'Total_Funding_Approved_From_IFPOC_Amt1__c', wrapText: true, cellAttributes: { class: { fieldName: 'ifpocAmtFundingColor' } } },
];