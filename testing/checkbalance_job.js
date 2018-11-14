//Looks like 'query' function hasn't yet been added to FakeAdaptor, so I couldn't test this yet
query(
  `SELECT Total_Amount_Left_to_Pay__c FROM Phase_Contract__c WHERE EE_Contract_ID__c = '${contractId}'`
  //So I'm not 100% about the syntax of the contractId variable in the query
);

alterState(state => {
  /*
  console.log(state.references[0].records)
  state.contractData = state.references[0].records[0]
  */

  //**Below added to generate lookup reference Id for contracts ****
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
    const contractId = msisdn.concat(district,date,"-",state.data.reference_number,"-",state.data.house_number,"-",state.data.contract_number);
    console.log(contractId);	

 	return state;
});