import { LightningElement, api } from 'lwc';

export default class MeetingDocumentModal extends LightningElement {
    acceptedFormats = [
        '.doc', '.docx', '.html', '.htm', '.odt', '.pdf',
        '.xls', '.xlsx', '.ods', '.ppt', '.pptx', '.txt', '.rtf',
    ];
    documentAccessOptionsValue = ['Authenticated User'];
    @api modalName;
    @api showConflict;

    hideModalBox() {  
        const closeModalEvent = new CustomEvent('closemodal', {detail : {
            eventName: 'meetingDocument'
        }});
        this.dispatchEvent(closeModalEvent);
    }

    get documentAccessOptions() {
        return [
            { label: 'Authenticated User', value: 'Authenticated User' },
            { label: 'Innovation Committee Member', value: 'Innovation Committee Member' },
            { label: 'Opportunity Committee Member', value: 'Opportunity Committee Member' }
        ];
    }

    handleToggleSection(event) {
        
    }

    handleInputChange(){
        
    }

    handleButtonClick(){
        
    }
}