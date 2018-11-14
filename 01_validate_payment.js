upsert('Payment__c', 'EE_Payment_ID__c', fields(
  field("EE_Payment_ID__c", state => {
  	/*
  	return state.data.reference_number + "-" + state.data.payment_number
  	*/

  	////Added below to generate lookup reference Id for payments ****
   const msisdn = (state.data.msisdn.substr(0,3) == "250" ? 'RW' : 'Msisdn code not found' );

   function findDistrict(dis) {
    	const districtFIND = {
    		Bugesera : 'BT',
    		Gatsibo : 'GT',
    		Kamonyi : 'KM',
    		Kayonza : 'KY',
    		Ngoma : 'NG',
    		Rwamagana : 'RW'
    	};
    	return districtFIND[dis] || 'District code not found';
    }
    const district = findDistrict(state.data.District);

    const date = new Date().getFullYear().toString().substr(-2);
    const paymentId = msisdn.concat(district,date,"-",state.data.reference_number,"-",state.data.house_number,"-",state.data.contract_number,"-",state.data.payment_number);
    return paymentId;
    ////
  }),
  relationship("Associated_Phase_Contract__r", "EE_Contract_ID__c", dataValue("reference_number")),
  field("Amount_of_Payment__c", dataValue("amount")),
  field("Payment_status__c", "INITIATED"),
  field("Date_Payment_Received_in_Bank__c", Date.now())
));
