export const allProjectColumns = [
    {
        label: 'SF CODE', fieldName: 'Name', wrapText: true,
        type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'allProjectReviewName',
            title: 'Click to View Details',
            variant: 'base'
        },
        sortable: "true"
    },
    { label: 'GO CODE', fieldName: 'GO_Internal_Project_Code__c', wrapText: true },
    { label: 'IF CODE', fieldName: 'IF_Project_Code__c', wrapText: true },
    { label: 'Title', fieldName: 'Project_Title__c', wrapText: true },
    { label: 'Project Lead(s)', fieldName: 'Lead_s__c', wrapText: true },
    { label: 'PL#1 Practice Plan', fieldName: 'PL_1_Practice_Plan__c', wrapText: true },
    { label: 'PL#2 Practice Plan', fieldName: 'PL_2_Practice_Plan__c', wrapText: true },
    { label: 'Status', fieldName: 'InternalStatus', wrapText: true },
];

export const projectAssignmentColumns = [
    { label: 'Name', fieldName: 'Name', wrapText: true},
    { label: 'Reviewer Name', fieldName: 'Reviewer_Name__c' },
    { label: 'Reviewer Number', fieldName: 'Reviewer_Number__c', wrapText: true },
    { label: 'Review Number', fieldName: 'Review_Number__c', wrapText: true },
    { label: 'Review Type', fieldName: 'Review_Type__c', wrapText: true },
    { label: 'Assigned Date', fieldName: 'Assigned_Date__c', wrapText: true },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c', wrapText: true },
    { label: 'Status', fieldName: 'Status__c', wrapText: true },
]