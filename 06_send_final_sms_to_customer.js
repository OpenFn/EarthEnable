alterState(state => {
  console.log(state.sfData);

  state.messageText = (
    state.paymentSuccess ?
    `Earthenable has received your payment of ${state.sfData.Amount_of_Payment__c}. To begin construction you have a remainder of ${state.contractData.Amount_to_left_to_pay_pre_sand_delivery__c} to pay. To complete your contract you must pay ${state.contractData.Total_Amount_Left_to_Pay__c}.` :
    `Your payment of ${state.sfData.Amount_of_Payment__c} was not able to be completed and your account has not been charged. Please try again.`
  );
  console.log('Attempting to send message: ' + state.messageText);

  return get('/sendsms/earthenable', {
    query: {
      api_token: state.configuration.password,
      receiver: parseInt(state.sfData.Payment_MSISDN__c),
      message: state.messageText,
    }
  })(state);
})
