import { useDispatch } from "react-redux";
import { load } from 'slices/userSlice';

export function UsuarioHK() {
  const dispatch = useDispatch();

  const profile = () => {
    dispatch(load())
  }
  return profile
}