import { loadAnalytics } from "slices/analyticsSlice";
import { useDispatch } from "react-redux";



export function AnalyticsHK() {
  const dispatch = useDispatch();

  const analytics = () => {
    dispatch(loadAnalytics())
  }
  return analytics;
}