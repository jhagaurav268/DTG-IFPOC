export const allProjectColumns = [
    {
        label: 'SF ID', fieldName: 'Name', wrapText: true,
        type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'projectReviewAssignment',
            title: 'Click to View Details',
            variant: 'base'
        },
        sortable: "true"
    },
    { label: 'GO Code', fieldName: 'Go_Code__c', wrapText: true },
    { label: 'IF CODE', fieldName: 'IF_Project_Code__c', wrapText: true },
    { label: 'Project Title', fieldName: 'Project_Title__c', wrapText: true },
    { label: 'Project Lead(s)', fieldName: 'Project_Lead_s__c', wrapText: true },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c', wrapText: true },
    { label: 'Review Type', fieldName: 'Review_Type__c', wrapText: true },
    { label: 'Status', fieldName: 'Status__c', wrapText: true },
];

export const projectReviewSummaryColumns = [
    {
        label: 'SF ID', fieldName: 'Name', wrapText: true, type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'projectReviewSummary',
            title: 'Click to View Details',
            variant: 'base'
        },
        sortable: "true"
    },
    { label: 'GO Code', fieldName: 'Go_Code__c', wrapText: true },
    { label: 'IF CODE', fieldName: 'IF_Code__c', wrapText: true },
    { label: 'Project Title', fieldName: 'Project_Title__c', wrapText: true },
    { label: 'Project Lead(s)', fieldName: 'Project_Lead_s__c', wrapText: true },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c', wrapText: true },
    { label: 'Review Type', fieldName: 'Review_Type__c', wrapText: true },
    { label: 'Status', fieldName: 'Status__c', wrapText: true },
];

export const projectGroupingForReviewColumns = [
    {
        label: 'Name', fieldName: 'Name', wrapText: true, type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'individualApplication',
            title: 'Click to View Details',
            variant: 'base'
        },
        sortable: "true"
    },
    // { label: 'Reviewer Name', fieldName: 'Reviewer_Name__c' },
    { label: 'Comments for this Reviewer', fieldName: 'Comments_For_This_Reviewer__c', wrapText: true, initialWidth: 200 },
    { label: 'Review Number', fieldName: 'Review_Number__c', wrapText: true },
    { label: 'Review Type', fieldName: 'Review_Type__c', wrapText: true },
    { label: 'Assigned Date', fieldName: 'Assigned_Date__c', wrapText: true },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c', wrapText: true },
    { label: 'Status', fieldName: 'Status__c', wrapText: true },
]