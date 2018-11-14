alterState(state => {
	// prefer object destructuring...
	const { msisdn, District, reference_number, house_number, contract_number, payment_number } = state.data;

	console.log("Aleksa is testing...");
	const countryCode = (msisdn.substr(0,3) == "250" ? 'RW' : 'Msisdn code not found' );
  console.log(countryCode);

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
  console.log(dist);

  const date = new Date().getFullYear().toString().substr(-2);
  console.log(date);

	const houseId = `${countryCode}${District}${date}-${reference_number}-${house_number}`;


  console.log('And here is the concatenated Contract Id without payment number appended...');
  const contractId = `${houseId}-${contract_number}`;
  console.log(contractId);
  // generates "RWBT18-8383-8273-7274" with the first payload EE shared in their email

	console.log('Here is the concatenated Payment Id...');
	const paymentId = `${contractId}-${payment_number}`;
	console.log(paymentId);
	// generates "RWBT18-8383-8273-7274-8283" with the first payload EE shared in their email

	return state;
});
