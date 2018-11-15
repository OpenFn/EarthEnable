alterState(state => {
  state.sfData = state.data.Envelope.Body.notifications.Notification.sObject;
  return get("https://api.havanao.com/api/sale/status", {
    query: {
      "transactionId": state.sfData.EE_Payment_ID__c,
      "api_token": "KxnJo3KWIs01akwsIq8jRFhs8CKkPffG56nIl0d5QAG2EUcg5NdoKbuaI024"
    }
  })(state);
});
