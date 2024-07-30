public class ProjectInReviewController {
    @AuraEnabled(cacheable = true)
    public static List<sObject> getRecords(String objectApiName) {
        Id userId = UserInfo.getUserId(); 
        User currentUser = [SELECT ContactId FROM User WHERE Id = :userId];
        
        Id contactId = currentUser.ContactId;
        List<Contact> currentContact = [SELECT AccountId FROM Contact WHERE Id = :contactId LIMIT 1];
        String accountId;
        if(currentContact.size() > 0){
            accountId = currentContact[0].AccountId;
        }
        
        Schema.DescribeSObjectResult objectDescribe = Schema.getGlobalDescribe().get(objectApiName).getDescribe();
        
        if (objectDescribe.isQueryable()) {
            Map<String, Schema.SObjectField> fieldMap = objectDescribe.fields.getMap();
            
            String query = 'SELECT ';
            Boolean isFirstField = true;
            
            for (String fieldName : fieldMap.keySet()) {
                if (!isFirstField) {
                    query += ', ';
                }
                query += fieldName;
                isFirstField = false;
            }
            
            query += ' FROM ' + objectApiName;
            
            if (objectApiName == 'Project_Review_Assignment__c') {
                query += ' WHERE Reviewer_Name__c = :contactId';
            }else if(objectApiName == 'FundingOpportunity'){
                query += ' Where Governance_Organization__c  =: accountId';
            }
            
            List<SObject> records;
            if (objectApiName == 'Project_Review_Assignment__c') {
                records = Database.query(query.replace(':contactId', '\'' + contactId + '\''));
            } else if (objectApiName == 'FundingOpportunity') {
                records = Database.query(query.replace(':accountId', '\'' + accountId + '\''));
            } else {
                records = Database.query(query);
            }
            
            return records;
        } else {
            System.debug('The object ' + objectApiName + ' is not queryable.');
            return null;
        }
    }
    
    @AuraEnabled(cacheable = true)
    public static List<sObject> getAllProjectReviewAssignment(String objectApiName) {
        Id userId = UserInfo.getUserId();
        User currentUser = [SELECT ContactId FROM User WHERE Id = :userId];
        
        Id contactId = currentUser.ContactId;
        List<Contact> currentContact = [SELECT AccountId FROM Contact WHERE Id = :contactId LIMIT 1];
        String accountId;
        if(currentContact.size() > 0){
            accountId = currentContact[0].AccountId;
        }
        
        Schema.DescribeSObjectResult objectDescribe = Schema.getGlobalDescribe().get(objectApiName).getDescribe();
        
        if (objectDescribe.isQueryable()) {
            Map<String, Schema.SObjectField> fieldMap = objectDescribe.fields.getMap();
            
            String query = 'SELECT ';
            Boolean isFirstField = true;
            
            for (String fieldName : fieldMap.keySet()) {
                if (!isFirstField) {
                    query += ', ';
                }
                query += fieldName;
                isFirstField = false;
            }
            
            query += ' FROM ' + objectApiName;
            
            List<SObject> records = Database.query(query);
            
            return records;
        } else {
            System.debug('The object ' + objectApiName + ' is not queryable.');
            return null;
        }
    }
    
    @AuraEnabled(cacheable = true)
    public static Map<String, List<Map<String, String>>> getPicklistValuesByField(String objectApiName) {
        System.debug('objectApiName ' + objectApiName);
        Map<String, List<Map<String, String>>> picklistMap = new Map<String, List<Map<String, String>>>();
        
        Schema.DescribeSObjectResult objectDescribe = Schema.getGlobalDescribe().get(objectApiName).getDescribe();
        
        for (Schema.SObjectField field : objectDescribe.fields.getMap().values()) {
            Schema.DescribeFieldResult fieldDescribe = field.getDescribe();
            
            if (fieldDescribe.getType() == Schema.DisplayType.Picklist) {
                List<Map<String, String>> picklistValuesList = new List<Map<String, String>>();
                
                List<Schema.PicklistEntry> picklistValues = fieldDescribe.getPicklistValues();
                
                for (Schema.PicklistEntry entry : picklistValues) {
                    Map<String, String> picklistEntryMap = new Map<String, String>();
                    picklistEntryMap.put('label', entry.getLabel());
                    picklistEntryMap.put('value', entry.getValue());
                    picklistValuesList.add(picklistEntryMap);
                }
                
                picklistMap.put(fieldDescribe.getName(), picklistValuesList);
            }
        }
        return picklistMap;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getGOsListPicklistValues() {
        List<Map<String, String>> picklistValuesList = new List<Map<String, String>>();
        
        List<Ifpoc_GOs_List__mdt> metadataRecords = [
            SELECT GOs_List__c
            FROM Ifpoc_GOs_List__mdt Limit 1
        ];
        
        for (Ifpoc_GOs_List__mdt record : metadataRecords) {
            String picklistValues = record.GOs_List__c;
            
            if (picklistValues != null) {
                List<String> values = picklistValues.split(';');
                
                for (String value : values) {
                    Map<String, String> picklistEntry = new Map<String, String>();
                    picklistEntry.put('label', value);
                    picklistEntry.put('value', value);
                    
                    picklistValuesList.add(picklistEntry);
                }
            }
        }
        return picklistValuesList;
    }
    
    @AuraEnabled(cacheable=true)
    public static Contact getUserContact() {
        Id userId = UserInfo.getUserId();
        User currentUser = [SELECT ContactId FROM User WHERE Id = :userId];
        if (currentUser.ContactId != null) {
            return [SELECT Id, Name, Email, Phone, Primary_Designation__c FROM Contact WHERE Id = :currentUser.ContactId];
        }
        return null;
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