post(
  "https://api.havanao.com/api/sale/purchase",
  {
    query: {
      "api_token": "KxnJo3KWIs01akwsIq8jRFhs8CKkPffG56nIl0d5QAG2EUcg5NdoKbuaI024"
    },
    headers: {
      "Content-Type": "application/json",
    },
    body: (state) => {
      const postBody = {
        "transactionid": state.paymentId,
        "amount": parseInt(state.data.amount),
        "customer": state.data.msisdn,
        "comment": "Thanks for initiating an EarthEnable payment."
      };
      return postBody;
    }
  }
);

alterState(state => {
  console.log(state)
  return state;
})
