alterState(state => {
  console.log(state);
  return state;
});

upsert('Payment__c', 'EE_Payment_ID__c', fields(
  field('EE_Payment_ID__c', state.paymentId),
  field('Payment_status__c', state.data.body.transactionStatus)
));
