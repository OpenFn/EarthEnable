alterState(state => {
  state.districts = {
    Bugesera: 'BG',
    Gatsibo: 'GT',
    Kamonyi: 'KM',
    Kayonza: 'KY',
    Ngoma: 'NG',
    Rwamagana: 'RW'
  };
  return state;
})

steps(
  upsert('Payment__c', 'EE_Payment_ID__c', fields(
    field("EE_Payment_ID__c", state => {
      const {
        msisdn,
        District,
        reference_number,
        house_number,
        contract_number,
        payment_number
      } = state.data;
      const country = (msisdn.substr(0, 3) == "250" ? 'RW' : 'Msisdn code not found');
      const dist = state.districts[District];
      const date = new Date().getFullYear().toString().substr(-2);
      const houseId = `${country}${dist}${date}-${reference_number}-${house_number}`;
      const contractId = `${houseId}-${contract_number}`;
      const paymentId = `${contractId}-${payment_number}`;

      return paymentId;
    }),
  )),
  query(`SELECT Id FROM Patient__c WHERE Health_ID__c = '${state.data.field1}'`)
);
