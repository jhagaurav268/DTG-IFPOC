export const allProjectColumns = [
    {
        label: 'Name', fieldName: 'Name', wrapText: true,
        type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'allProjectName',
            title: 'Click to View Details',
            variant: 'base'
        },
        sortable: "true",
        cellAttributes: { class: { fieldName: 'nameColor' } }
    },
    { label: 'IF CODE', fieldName: 'IF_Project_Code__c', wrapText: true, cellAttributes: { class: { fieldName: 'ifCodeColor' } } },
    { label: 'Project Title', fieldName: 'Project_Title__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectTitleColor' } } },
    { label: 'Project Lead(s)', fieldName: 'Lead_s__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectLeadsColor' } } },
    { label: 'Project Duration', fieldName: 'Project_Duration_view__c', wrapText: true, cellAttributes: { class: { fieldName: 'projectDurationColor' } } },
    { label: 'Status', fieldName: 'Status__c', wrapText: true, cellAttributes: { class: { fieldName: 'statusColor' } } },
];