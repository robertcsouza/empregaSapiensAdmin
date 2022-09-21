import { useDispatch } from "react-redux";
import { loadHabilidades } from "slices/habilidadesSlice";


export function HabilidadesHK() {
  const dispatch = useDispatch();

  const habilidades = () => {
    dispatch(loadHabilidades())
  }
  return habilidades;
}