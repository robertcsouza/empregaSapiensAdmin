import { useDispatch } from "react-redux";
import { loadSelectedVagas } from "slices/selectedVagaSlice";


export function SelectedVagaHK() {
  const dispatch = useDispatch();

  const selectedVaga = () => {
    dispatch(loadSelectedVagas())
  }
  return selectedVaga;
}