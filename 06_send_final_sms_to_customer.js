alterState(state =>{
  console.log(state);
  // we will need to format a nice message for the customer here, based on the
  // earlier salesforce data.
  return state;
});

// Your job goes here.
// when customer data comes from SF, update customer/agent.
// Thank you you’re payment of [Amount_of_Payment__c] (from payment object).
// To begin your floor construction you have a remainder of [Amount_to_left_to_pay_pre_sand_delivery__c] to pay.
// To fully complete your contract you must pay [Total_Amount_Left_to_Pay__c]. (from phase/contract object)
get('/sendsms/earthenable', {
  query: {
    api_token: state.configuration.password,
    receiver: 250722878433,
    message: state.messageText,
  }
});
