upsert('Payment__c', 'EE_Payment_ID__c', fields(
  field("EE_Payment_ID__c", state => {
    const {
      msisdn,
      District,
      reference_number,
      house_number,
      contract_number,
      payment_number
    } = state.references[1];

    const country = (msisdn.substr(0, 3) == "250" ? 'RW' : 'Msisdn code not found');
    const dist = state.districts[District];
    const date = new Date().getFullYear().toString().substr(-2);
    const houseId = `${country}${dist}${date}-${reference_number}-${house_number}`;
    const contractId = `${houseId}-${contract_number}`;
    const paymentId = `${contractId}-${payment_number}`;

    return paymentId;
  }),
  field("Payment_status__c", "REQUESTED")
));
