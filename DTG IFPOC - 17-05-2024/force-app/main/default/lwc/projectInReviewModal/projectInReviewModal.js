import { LightningElement, track } from 'lwc';

export default class ProjectInReviewModal extends LightningElement {
    statusChangeValue = 'pendingReview';
    reviewerChangeValue = '- None -';
    acceptedFormats = [
        '.doc', '.docx', '.html', '.htm', '.odt', '.pdf',
        '.xls', '.xlsx', '.ods', '.ppt', '.pptx', '.txt', '.rtf',
    ];

    get projectStatusOptions() {
        return [
            { label: 'New', value: 'new' },
            { label: 'Pending Review', value: 'pendingReview' },
            { label: 'Reviewed', value: 'reviewed' },
        ];
    }

    get reviewerOptions(){
        return [
            {label: '- None -', value: '- None -'}
        ]
    }
    
    hideModalBox() {  
        const closeModalEvent = new CustomEvent('closemodal', {detail : {
            eventName: 'projectInReview'
        }});
        this.dispatchEvent(closeModalEvent);
    }

    handleToggleSection(event) {
        
    }

    handleInputChange(){
        
    }

    handleButtonClick(){
        
    }
}