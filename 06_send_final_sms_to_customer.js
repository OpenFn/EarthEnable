get('/sendsms/earthenable', {
  query: {
    api_token: state.configuration.password,
    receiver: parseInt(state.references[2].Envelope.Body.notifications.Notification.sObject.Payment_MSISDN__c),
    message: (state) => {
      if (!state.paymentSuccess) {
        return `Your payment of ${state.references[2].Envelope.Body.notifications.Notification.sObject.Amount_of_Payment__c} was not able to be completed and your account has not been charged. Please try again.`
      }
      return `Earthenable has received your payment of ${state.references[2].Envelope.Body.notifications.Notification.sObject.Amount_of_Payment__c}. To begin construction you have a remainder of ${state.contractData.Amount_to_left_to_pay_pre_sand_delivery__c} to pay. To complete your contract you must pay ${state.contractData.Total_Amount_Left_to_Pay__c}.`
    },
  }
});
