state => {
  const {
    msisdn,
    District,
    reference_number,
    house_number,
    contract_number,
    payment_number
  } = state.data;

  state.districts = {
    Bugesera: 'BG',
    Gatsibo: 'GT',
    Kamonyi: 'KM',
    Kayonza: 'KY',
    Ngoma: 'NG',
    Rwamagana: 'RW'
  };

  const countryCode = (msisdn.substr(0, 3) == "250" ? 'RW' : 'Msisdn code not found');
  const dist = state.districts[District];
  const date = new Date().getFullYear().toString().substr(-2);
  const houseId = `${countryCode}${dist}${date}-${reference_number}-${house_number}`;

  state.contractId = `${houseId}-${contract_number}`;
  state.paymentId = `${state.contractId}-${payment_number}`;

  return state;

  upsert('Payment__c', 'EE_Payment_ID__c', fields(
    field("EE_Payment_ID__c", state.paymentId),
    relationship("Associated_Phase_Contract__r", "EE_Contract_ID__c", state.contractId),
    field("Amount_of_Payment__c", dataValue("amount")),
    field("Payment_status__c", "INITIATED"),
    field("Date_Payment_Received_in_Bank__c", Date.now())
  ))(state);
}
