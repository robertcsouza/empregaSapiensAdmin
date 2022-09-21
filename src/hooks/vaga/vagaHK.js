import { useDispatch } from "react-redux";
import { loadVagas } from "slices/vagaSlice";


export function VagaHK() {
  const dispatch = useDispatch();

  const profile = () => {
    dispatch(loadVagas())
  }
  return profile
}