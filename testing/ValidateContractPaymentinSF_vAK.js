alterState(state => {
  state.districts = {
    Bugesera: 'BT',
    Gatsibo: 'GT',
    Kamonyi: 'KM',
    Kayonza: 'KY',
    Ngoma: 'NG',
    Rwamagana: 'RW'
  };
  return state;
})

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
    const countryCode = (msisdn.substr(0, 3) == "250" ? 'RW' : 'Msisdn code not found');
    const dist = state.districts[District];
    const date = new Date().getFullYear().toString().substr(-2);
    const houseId = `${countryCode}${District}${date}-${reference_number}-${house_number}`;
    const contractId = `${houseId}-${contract_number}`;
    const paymentId = `${contractId}-${payment_number}`;

    return paymentId;
  }),
  relationship("Associated_Phase_Contract__r", "EE_Contract_ID__c", state => {
    const {
      msisdn,
      District,
      reference_number,
      house_number,
      contract_number,
      payment_number
    } = state.data;
    const countryCode = (msisdn.substr(0, 3) == "250" ? 'RW' : 'Msisdn code not found');
    const dist = state.districts[District];
    const date = new Date().getFullYear().toString().substr(-2);
    const houseId = `${countryCode}${District}${date}-${reference_number}-${house_number}`;
    const contractId = `${houseId}-${contract_number}`;

    return contractId;
  }),
  field("Amount_of_Payment__c", dataValue("amount")),
  field("Payment_status__c", "INITIATED"),
  field("Date_Payment_Received_in_Bank__c", Date.now())
));
