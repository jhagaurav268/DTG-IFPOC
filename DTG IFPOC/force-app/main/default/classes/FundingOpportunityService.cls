public without sharing class FundingOpportunityService {
    @AuraEnabled
    public static void createRecord(Map<String, Object> recordData) {
        Id userId = UserInfo.getUserId(); 
        User currentUser = [SELECT ContactId FROM User WHERE Id = :userId];
        
        Id contactId = currentUser.ContactId;
        List<Contact> currentContact = [SELECT AccountId FROM Contact WHERE Id = :contactId LIMIT 1];
        String accountId;
        if(currentContact.size() > 0){
            accountId = currentContact[0].AccountId;
        }

        FundingOpportunity record = new FundingOpportunity();
        
        record.Name = 'Testing ' + String.valueOf(DateTime.now());

        if (recordData.containsKey('Status')) {
            record.Status = (String) recordData.get('Status');
        }
        if (recordData.containsKey('Application_Start_Date__c')) {
            String dateValue = (String) recordData.get('Application_Start_Date__c');
            record.Application_Start_Date__c = dateValue != null ? Date.valueOf(dateValue) : null;
        }
        if (recordData.containsKey('Application_Due_Date__c')) {
            String dateValue = (String) recordData.get('Application_Due_Date__c');
            record.Application_Due_Date__c = dateValue != null ? Date.valueOf(dateValue) : null;
        }
        if (recordData.containsKey('GO_Annual_Report_Due_Date__c')) {
            String dateValue = (String) recordData.get('GO_Annual_Report_Due_Date__c');
            record.GO_Annual_Report_Due_Date__c = dateValue != null ? Date.valueOf(dateValue) : null;
        }
        if (recordData.containsKey('GO_Final_Report_Due_Date__c')) {
            String dateValue = (String) recordData.get('GO_Final_Report_Due_Date__c');
            record.GO_Final_Report_Due_Date__c = dateValue != null ? Date.valueOf(dateValue) : null;
        }
        if (recordData.containsKey('Innovation_Fund_Competition_Overview__c')) {
            record.Innovation_Fund_Competition_Overview__c = (String) recordData.get('Innovation_Fund_Competition_Overview__c');
        }
        if (recordData.containsKey('Process_for_Application__c')) {
            record.Process_for_Application__c = (String) recordData.get('Process_for_Application__c');
        }
        if (recordData.containsKey('Highlights_of_Important_Guidelines__c')) {
            record.Highlights_of_Important_Guidelines__c = (String) recordData.get('Highlights_of_Important_Guidelines__c');
        }
        if (recordData.containsKey('Timelines__c')) {
            record.Timelines__c = (String) recordData.get('Timelines__c');
        }
        if (recordData.containsKey('Key_Information__c')) {
            record.Key_Information__c = (String) recordData.get('Key_Information__c');
        }
        
        record.Governance_Organization__c = accountId;

        insert record;
    }
    
    @AuraEnabled
    public static void updateRecord(Map<String, Object> recordData) {
        String recordId = (String) recordData.get('Id');
        
        FundingOpportunity record = [
            SELECT Id, Status, Application_Start_Date__c, Application_Due_Date__c,
            GO_Annual_Report_Due_Date__c, GO_Final_Report_Due_Date__c,
            Innovation_Fund_Competition_Overview__c, Process_for_Application__c,
            Highlights_of_Important_Guidelines__c, Timelines__c, Key_Information__c
            FROM FundingOpportunity
            WHERE Id = :recordId
            LIMIT 1
        ];
        
        if (recordData.containsKey('Status')) {
            record.Status = (String) recordData.get('Status');
        }
        if (recordData.containsKey('Application_Start_Date__c')) {
            String dateValue = (String) recordData.get('Application_Start_Date__c');
            record.Application_Start_Date__c = dateValue != null ? Date.valueOf(dateValue) : null;
        }
        if (recordData.containsKey('Application_Due_Date__c')) {
            String dateValue = (String) recordData.get('Application_Due_Date__c');
            record.Application_Due_Date__c = dateValue != null ? Date.valueOf(dateValue) : null;
        }
        if (recordData.containsKey('GO_Annual_Report_Due_Date__c')) {
            String dateValue = (String) recordData.get('GO_Annual_Report_Due_Date__c');
            record.GO_Annual_Report_Due_Date__c = dateValue != null ? Date.valueOf(dateValue) : null;
        }
        if (recordData.containsKey('GO_Final_Report_Due_Date__c')) {
            String dateValue = (String) recordData.get('GO_Final_Report_Due_Date__c');
            record.GO_Final_Report_Due_Date__c = dateValue != null ? Date.valueOf(dateValue) : null;
        }
        if (recordData.containsKey('Innovation_Fund_Competition_Overview__c')) {
            record.Innovation_Fund_Competition_Overview__c = (String) recordData.get('Innovation_Fund_Competition_Overview__c');
        }
        if (recordData.containsKey('Process_for_Application__c')) {
            record.Process_for_Application__c = (String) recordData.get('Process_for_Application__c');
        }
        if (recordData.containsKey('Highlights_of_Important_Guidelines__c')) {
            record.Highlights_of_Important_Guidelines__c = (String) recordData.get('Highlights_of_Important_Guidelines__c');
        }
        if (recordData.containsKey('Timelines__c')) {
            record.Timelines__c = (String) recordData.get('Timelines__c');
        }
        if (recordData.containsKey('Key_Information__c')) {
            record.Key_Information__c = (String) recordData.get('Key_Information__c');
        }
        
        update record;
    }
}