alterState(state =>{
  console.log(state);
  return state;
});

get('/sendsms/earthenable', {
  query: {
    api_token: state.configuration.password,
    receiver: parseInt(state.data.msisdn),
    message: `Earthenable has received your payment of ${state.contractData.Total_Amount_Paid__c}. To begin construction you have a remainder of ${state.contractData.Amount_to_left_to_pay_pre_sand_delivery__c} to pay. To complete your contract you must pay ${state.contractData.Total_Amount_Left_to_Pay__c}.`,
  }
});
