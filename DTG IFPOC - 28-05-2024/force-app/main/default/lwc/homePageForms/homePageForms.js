import { LightningElement } from 'lwc';
import G1FundingRequest from '@salesforce/label/c.Ifpoc_Form_G1_Funding_Request';
import G2SubstitutionRequest from '@salesforce/label/c.Ifpoc_Form_G2_Substitution_Request';
import G3PolicyConfirmation from '@salesforce/label/c.Ifpoc_Form_G3_Policy_Confirmation';
import G4LeaveAndCovid19ExtensionRequest from '@salesforce/label/c.Ifpoc_Form_G4_Leave_and_COVID_19_Extension_Request_NEW';
import FormP1ProjectProposal from '@salesforce/label/c.Ifpoc_Form_P1_Project_Proposal';
import FormP2_4_ProjectProposal from '@salesforce/label/c.Ifpoc_Form_P2_4_Proposal_and_Final_Budget';
import FormP3FinalReport from '@salesforce/label/c.Ifpoc_Form_P3_Final_Report';
import FormP5ChangeInStatusForm from '@salesforce/label/c.Ifpoc_Form_P5_Change_in_Status_Form';
import FormDDeclarationForSubstitution from '@salesforce/label/c.Ifpoc_Form_D_Declaration_for_Substitution';

import DownloadFormG1Declaration from '@salesforce/resourceUrl/DownloadFormG1Declaration';
import DownloadFormG1Supplementary from '@salesforce/resourceUrl/DownloadFormG1Supplementary';
import DownloadFormG2 from '@salesforce/resourceUrl/DownloadFormG2';
import DownloadFormG3 from '@salesforce/resourceUrl/DownloadFormG3';
import DownloadFormG4 from '@salesforce/resourceUrl/DownloadFormG4';
import DownloadP1AdobeProjectProposal from '@salesforce/resourceUrl/DownloadP1AdobeProjectProposal';
import DownloadFormP1AdobeNOA from '@salesforce/resourceUrl/DownloadFormP1AdobeNOA';
import DownloadP1WordProjectProposal from '@salesforce/resourceUrl/DownloadP1WordProjectProposal';
import DownloadFormP1WordHAH from '@salesforce/resourceUrl/DownloadFormP1WordHAH';
import DownloadFormP1WordAMO from '@salesforce/resourceUrl/DownloadFormP1WordAMO';
import DownloadFormP24ProposalFinalBudget from '@salesforce/resourceUrl/DownloadFormP24ProposalFinalBudget';
import DownloadFormP3 from '@salesforce/resourceUrl/DownloadFormP3';
import DownloadFormP3AMO from '@salesforce/resourceUrl/DownloadFormP3AMO';
import DownloadFormP3HAH from '@salesforce/resourceUrl/DownloadFormP3HAH';
import DownloadFormP5 from '@salesforce/resourceUrl/DownloadFormP5';
import DownloadFormD from '@salesforce/resourceUrl/DownloadFormD';


const resourceMapping = {
    'DownloadFormG1Declaration': DownloadFormG1Declaration,
    'DownloadFormG1Supplementary': DownloadFormG1Supplementary,
    'DownloadFormG2': DownloadFormG2,
    'DownloadFormG3': DownloadFormG3,
    'DownloadFormG4': DownloadFormG4,
    'DownloadP1AdobeProjectProposal': DownloadP1AdobeProjectProposal,
    'DownloadFormP1AdobeNOA': DownloadFormP1AdobeNOA,
    'DownloadP1WordProjectProposal': DownloadP1WordProjectProposal,
    'DownloadFormP1WordHAH': DownloadFormP1WordHAH,
    'DownloadFormP1WordAMO': DownloadFormP1WordAMO,
    'DownloadFormP24ProposalFinalBudget': DownloadFormP24ProposalFinalBudget,
    'DownloadFormP3': DownloadFormP3,
    'DownloadFormP3AMO': DownloadFormP3AMO,
    'DownloadFormP3HAH': DownloadFormP3HAH,
    'DownloadFormP5': DownloadFormP5,
    'DownloadFormD': DownloadFormD
};

export default class HomePageForms extends LightningElement {
    customLabel = G1FundingRequest;

    labelData = [
        { id: '1', formName: 'G1FundingRequest', formlabel: 'Form G1 - Funding Request', formData: G1FundingRequest, buttonList: [{ name: 'DownloadFormG1Declaration', label: 'Download Form G1-Declaration' }, { name: 'DownloadFormG1Supplementary', label: 'Download Form G1-Supplementary' }] },
        { id: '2', formName: 'G2SubstitutionRequest', formlabel: 'Form G2 - Substitution Request', formData: G2SubstitutionRequest, buttonList: [{ name: 'DownloadFormG2', label: 'Download Form G2' }] },
        { id: '3', formName: 'G3PolicyConfirmation', formlabel: 'Form G3 - Policy Confirmation', formData: G3PolicyConfirmation, buttonList: [{ name: 'DownloadFormG3', label: 'Download Form G3' }] },
        { id: '4', formName: 'G4LeaveAndCovid19ExtensionRequest', formlabel: 'Form G4 - Leave and COVID-19 Extension Request (NEW)', formData: G4LeaveAndCovid19ExtensionRequest, buttonList: [{ name: 'DownloadFormG4', label: 'Download Form G4' }] },
        { id: '5', formName: 'IfpocFormP1ProjectProposal', formlabel: 'Form P1 - Project Proposal', formData: FormP1ProjectProposal, buttonList: [{ name: 'DownloadP1AdobeProjectProposal', label: 'Download P1 Adobe (P1A) - Project Proposal' }, { label: 'Download Form P1 Adobe - NOA', name: 'DownloadFormP1AdobeNOA' }, { label: 'Download P1 Word (P1W) - Project Proposal', name: 'DownloadP1WordProjectProposal' }, { label: 'Download Form P1 Word - HAH', name: 'DownloadFormP1WordHAH' }, { label: 'Download Form P1 Word - AMO', name: 'DownloadFormP1WordAMO' }] },
        { id: '6', formName: 'IfpocFormP2_4_ProjectProposal', formlabel: 'Form P2/4 – Proposal and Final Budget', formData: FormP2_4_ProjectProposal, buttonList: [{ label: 'Download Form P2/4 - Proposal and Final Budget', name: 'DownloadFormP24ProposalFinalBudget' }] },
        { id: '7', formName: 'FormP3FinalReport', formlabel: 'Form P3 - Final Report', formData: FormP3FinalReport, buttonList: [{ label: 'Download Form P3', name: 'DownloadFormP3' }, { label: 'Download Form P3 AMO', name: 'DownloadFormP3AMO' }, { label: 'Download Form P3 HAH', name: 'DownloadFormP3HAH' }] },
        { id: '8', formName: 'FormP5ChangeInStatusForm', formlabel: 'Form P5 - Change in Status Form', formData: FormP5ChangeInStatusForm, buttonList: [{ label: 'Download Form P5', name: 'DownloadFormP5' }] },
        { id: '9', formName: 'FormDDeclarationForSubstitution', formlabel: 'Form D - Declaration for Substitution', formData: FormDDeclarationForSubstitution, buttonList: [{ label: 'Download Form D', name: 'DownloadFormD' }] },
    ]

    handleToggleSection(event) {

    }

    handleFormButtonClick(event) {
        const resourceName = event.target.name;

        if (resourceMapping.hasOwnProperty(resourceName)) {
            const resource = resourceMapping[resourceName];
            window.open(resource, '_blank');
        } else {
            console.error(`Resource not found .`);
        }
    }
}