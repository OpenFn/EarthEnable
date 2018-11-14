// First update the paymnent status.
upsert('Payment__c', 'EE_Payment_ID__c', fields(
  field("EE_Payment_ID__c", state.references[0].Envelope.Body.notifications.Notification.sObject.EE_Payment_ID__c),
  field("Payment_status__c", state.data.transactionStatus)
));

query(
  `SELECT Total_Amount_Paid__c, Amount_to_left_to_pay_pre_sand_delivery__c, Total_Amount_Left_to_Pay__c FROM Phase_Contract__c WHERE Id = '${state.references[0].Envelope.Body.notifications.Notification.sObject.Associated_Phase_Contract__c}'`
);

alterState(state => {
  state.contractData = state.references[0].records[0]
  return state;
});
