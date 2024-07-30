/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_Letter_of_IntentTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_Letter_of_IntentTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new Letter_of_Intent__c());
    }
}