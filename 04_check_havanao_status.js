get("https://api.havanao.com/api/sale/status", {
  query: {
    "transactionId": state.data.Envelope.Body.notifications.Notification.sObject.EE_Payment_ID__c,
    "api_token": "KxnJo3KWIs01akwsIq8jRFhs8CKkPffG56nIl0d5QAG2EUcg5NdoKbuaI024"
  }
});
