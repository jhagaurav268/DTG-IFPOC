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
        sortable: "true",
        cellAttributes: { class: { fieldName: 'sfIdColor' } }
    },
    { label: 'GO Code', fieldName: 'Go_Code__c', wrapText: true, cellAttributes: { class: { fieldName: 'goCodeColor' } } },
    { label: 'IF CODE', fieldName: 'IF_Project_Code__c', wrapText: true, cellAttributes: { class: { fieldName: 'ifProjectCodeColor' } } },
    { label: 'Project Title', fieldName: 'Project_Title__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectTitleColor' } } },
    { label: 'Project Lead(s)', fieldName: 'Project_Lead_s__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectLeadsColor' } } },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c', wrapText: true, cellAttributes: { class: { fieldName: 'reviewDeadlineColor' } } },
    { label: 'Review Type', fieldName: 'Review_Type__c', wrapText: true, cellAttributes: { class: { fieldName: 'reviewTypeColor' } } },
    { label: 'Status', fieldName: 'Status__c', wrapText: true, cellAttributes: { class: { fieldName: 'statusColor' } } },
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
        sortable: "true",
        cellAttributes: { class: { fieldName: 'sfIdColor' } }
    },
    { label: 'GO Code', fieldName: 'Go_Code__c', wrapText: true, cellAttributes: { class: { fieldName: 'goCodeColor' } } },
    { label: 'IF CODE', fieldName: 'IF_Code__c', wrapText: true, cellAttributes: { class: { fieldName: 'ifCodeColor' } } },
    { label: 'Project Title', fieldName: 'Project_Title__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectTitleColor' } } },
    { label: 'Project Lead(s)', fieldName: 'Project_Lead_s__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectLeadsColor' } } },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c', wrapText: true, cellAttributes: { class: { fieldName: 'reviewDeadlineColor' } } },
    { label: 'Review Type', fieldName: 'Review_Type__c', wrapText: true, cellAttributes: { class: { fieldName: 'reviewTypeColor' } } },
    { label: 'Status', fieldName: 'Status__c', wrapText: true, cellAttributes: { class: { fieldName: 'statusColor' } } },
];

export const projectGroupingForReviewColumns = [
    {
        label: 'Name', fieldName: 'Name', wrapText: true, type: 'button',
        type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'individualApplication',
            title: 'Click to View Details',
            variant: 'base'
        },
        sortable: "true",
        cellAttributes: { class: { fieldName: 'nameColor' } }
    },
    // { label: 'Reviewer Name', fieldName: 'Reviewer_Name__c' },
    { label: 'Comments for this Reviewer', fieldName: 'Comments_For_This_Reviewer__c', wrapText: false, cellAttributes: { class: { fieldName: 'commentReviewerColor' } } },
    { label: 'Review Number', fieldName: 'Review_Number__c', wrapText: true, cellAttributes: { class: { fieldName: 'reviewNumberColor' } } },
    { label: 'Review Type', fieldName: 'Review_Type__c', wrapText: true, cellAttributes: { class: { fieldName: 'reviewTypeColor' } } },
    { label: 'Assigned Date', fieldName: 'Assigned_Date__c', wrapText: true, cellAttributes: { class: { fieldName: 'assignedDateColor' } } },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c', wrapText: true, cellAttributes: { class: { fieldName: 'reviewDeadlineColor' } } },
    { label: 'Status', fieldName: 'Status__c', wrapText: true, cellAttributes: { class: { fieldName: 'statusColor' } } },
]