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
}