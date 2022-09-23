import SearchLocation from "../SearchLocation";


function UF({ UFList, selectUf }) {

  return (
    <SearchLocation itemList={UFList} call={selectUf} />
  );
}

export default UF;