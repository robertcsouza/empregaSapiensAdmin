import SearchLocation from "../SearchLocation";


function City({ cidadeList, selectCity }) {

  if (cidadeList.length > 0) {
    return <SearchLocation itemList={cidadeList} call={selectCity} />
  } else {
    return <div>Escolha o estado Primeiro </div>
  }
}

export default City;