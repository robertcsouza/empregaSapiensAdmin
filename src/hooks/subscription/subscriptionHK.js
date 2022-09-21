import { useDispatch } from "react-redux";
import { loadSubscriptions } from "slices/SubscriptionSlice";


export function SubscriptionHK() {
  const dispatch = useDispatch();

  const subscriptions = () => {
    dispatch(loadSubscriptions())
  }
  return subscriptions
}