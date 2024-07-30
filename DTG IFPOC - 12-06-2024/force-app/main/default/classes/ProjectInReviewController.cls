public class ProjectInReviewController {
    @AuraEnabled(cacheable = true)
    public static List<sObject> getRecords(String objectApiName) {
        Id userId = UserInfo.getUserId();
        User currentUser = [SELECT ContactId FROM User WHERE Id = :userId];
        
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
            }
            
            List<SObject> records;
            if (objectApiName == 'Project_Review_Assignment__c') {
                records = Database.query(query.replace(':contactId', '\'' + currentUser.ContactId + '\''));
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
    public static Map<String, List<Map<String, String>>> getPicklistValuesByField(String objectApiName) {
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
    public static Contact getUserContact() {
        Id userId = UserInfo.getUserId();
        User currentUser = [SELECT ContactId FROM User WHERE Id = :userId];
        if (currentUser.ContactId != null) {
            return [SELECT Id, Name, Primary_Designation__c FROM Contact WHERE Id = :currentUser.ContactId];
        }
        return null;
    }
    
}