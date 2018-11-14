alterState(state => {
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
  console.log(`Searching for contract ID: ${state.contractId}`);

  return query(
    `SELECT Total_Amount_Paid__c, Amount_to_left_to_pay_pre_sand_delivery__c, Total_Amount_Left_to_Pay__c FROM Phase_Contract__c WHERE EE_Contract_ID__c = '${state.contractId}'`
  )(state);
});

alterState(state => {
  console.log(state.references[0].records)
  state.contractData = state.references[0].records[0]
  return state;
});
