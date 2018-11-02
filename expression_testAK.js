alterState(state => {
	console.log("Aleksa is testing...");
  	const msisdn = (state.data.msisdn.substr(0,3) == "250" ? 'RW' : 'Msisdn code not found' );
    console.log(msisdn);


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
    console.log(district);
    

    const date = new Date().getFullYear().toString().substr(-2);
    console.log(date);


    console.log("Here is the concatenated Payment Id...");
    const paymentId = msisdn.concat(district,date,"-",state.data.reference_number,"-",state.data.house_number,"-",state.data.contract_number,"-",state.data.payment_number)
    console.log(paymentId);
    // generates "RWBT18-8383-8273-7274-8283" with the first payload EE shared in their email

    console.log("And here is the concatenated Contract Id without payment number appended...");
    const contractId = msisdn.concat(district,date,"-",state.data.reference_number,"-",state.data.house_number,"-",state.data.contract_number)
    console.log(contractId);
    // generates "RWBT18-8383-8273-7274" with the first payload EE shared in their email

  	return state;

});
 