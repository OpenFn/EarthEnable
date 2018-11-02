upsert('Payment__c', 'EE_Payment_ID__c', fields(
  field("EE_Payment_ID__c", state => {
  		const { msisdn, District, reference_number, house_number, contract_number, payment_number } = state.data;

  		const countryCode = (msisdn.substr(0,3) == "250" ? 'RW' : 'Msisdn code not found' );
		// =========================================================================
		// TODO: Aleksa discuss with TD. Why are you catching this error?
		// What will happen when we send 'District code not found' downstream?
   		function findDistrictCode(district) {
	    	const districtFind = {
	    		Bugesera : 'BT',
	    		Gatsibo : 'GT',
	    		Kamonyi : 'KM',
	    		Kayonza : 'KY',
	    		Ngoma : 'NG',
	    		Rwamagana : 'RW'
	    	};
    	return districtFind[district] || 'District code not found';
    	}
		// =========================================================================

	    const dist = findDistrictCode(District);

	    const date = new Date().getFullYear().toString().substr(-2);

		  const houseId = `${countryCode}${District}${date}-${reference_number}-${house_number}`;

		  const contractId = `${houseId}-${contract_number}`;

		  const paymentId = `${contractId}-${payment_number}`;

		    return paymentId;

  }),
  relationship("Associated_Phase_Contract__r", "EE_Contract_ID__c", state =>{
  		const { msisdn, District, reference_number, house_number, contract_number, payment_number } = state.data;

  		const countryCode = (msisdn.substr(0,3) == "250" ? 'RW' : 'Msisdn code not found' );
		// =========================================================================
		// TODO: Aleksa discuss with TD. Why are you catching this error?
		// What will happen when we send 'District code not found' downstream?
   		function findDistrictCode(district) {
	    	const districtFind = {
	    		Bugesera : 'BT',
	    		Gatsibo : 'GT',
	    		Kamonyi : 'KM',
	    		Kayonza : 'KY',
	    		Ngoma : 'NG',
	    		Rwamagana : 'RW'
	    	};
    	return districtFind[district] || 'District code not found';
    	}
		// =========================================================================

	    const dist = findDistrictCode(District);

	    const date = new Date().getFullYear().toString().substr(-2);

		  const houseId = `${countryCode}${District}${date}-${reference_number}-${house_number}`;

		  const contractId = `${houseId}-${contract_number}`;
  
		    return contractId;
  	}),
  field("Amount_of_Payment__c", dataValue("amount")),
  field("Payment_status__c", "INITIATED"),
  field("Date_Payment_Received_in_Bank__c", Date.now())
));
