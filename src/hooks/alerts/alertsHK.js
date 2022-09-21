import { useDispatch } from "react-redux";
import { loadAlerts } from "slices/alertSlice";


export function AlertsHK() {
  const dispatch = useDispatch();

  const alerts = () => {
    dispatch(loadAlerts());
  }
  return alerts
}