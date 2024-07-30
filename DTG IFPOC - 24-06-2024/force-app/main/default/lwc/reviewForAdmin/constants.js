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
        sortable: "true",
        cellAttributes: { class: { fieldName: 'sfCodeColor' } }
    },
    { label: 'GO CODE', fieldName: 'GO_Internal_Project_Code__c', wrapText: true, cellAttributes: { class: { fieldName: 'goCodeColor' } } },
    { label: 'IF CODE', fieldName: 'IF_Project_Code__c', wrapText: true, cellAttributes: { class: { fieldName: 'ifCodeColor' } } },
    { label: 'Title', fieldName: 'Project_Title__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectTitleColor' } } },
    { label: 'Project Lead(s)', fieldName: 'Lead_s__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectLeadsColor' } } },
    { label: 'PL#1 Practice Plan', fieldName: 'PL_1_Practice_Plan__c', wrapText: true, cellAttributes: { class: { fieldName: 'plOnePlanColor' } } },
    { label: 'PL#2 Practice Plan', fieldName: 'PL_2_Practice_Plan__c', wrapText: true, cellAttributes: { class: { fieldName: 'plTwoPlanColor' } } },
    { label: 'Status', fieldName: 'InternalStatus', wrapText: true, cellAttributes: { class: { fieldName: 'internalStatusColor' } } },
];

export const projectAssignmentColumns = [
    { label: 'Name', fieldName: 'Name', wrapText: true, cellAttributes: { class: { fieldName: 'nameColor' } }},
    { label: 'Reviewer Name', fieldName: 'Reviewer_Name__c', cellAttributes: { class: { fieldName: 'reviewerNameColor' } } },
    { label: 'Reviewer Number', fieldName: 'Reviewer_Number__c', wrapText: true, cellAttributes: { class: { fieldName: 'reviewerNumberColor' } } },
    { label: 'Review Number', fieldName: 'Review_Number__c', wrapText: true, cellAttributes: { class: { fieldName: 'reviewNumberColor' } } },
    { label: 'Review Type', fieldName: 'Review_Type__c', wrapText: true, cellAttributes: { class: { fieldName: 'reviewTypeColor' } } },
    { label: 'Assigned Date', fieldName: 'Assigned_Date__c', wrapText: true, cellAttributes: { class: { fieldName: 'assignedDateColor' } } },
    { label: 'Review Deadline', fieldName: 'Review_Deadline__c', wrapText: true, cellAttributes: { class: { fieldName: 'reviewDeadlineColor' } } },
    { label: 'Status', fieldName: 'Status__c', wrapText: true, cellAttributes: { class: { fieldName: 'statusColor' } } },
]