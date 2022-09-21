
// Material Dashboard 2 React components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import SubscriptionInformation from "./components/SubscriptionInformation";
import Footer from "components/Footer";
import { useEffect } from "react";
import auth from '../../service/auth'
import { SubscriptionHK } from "../../hooks/subscription/subscriptionHK";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { load } from "slices/userSlice";
import { loadSubscriptions } from "slices/SubscriptionSlice";


function Subscription() {

  const subscriptionRd = useSelector(state => state.vagas.vagas)
  const subscriptionHook = SubscriptionHK();

  let navigate = useNavigate();
  useEffect(() => {
    async function isAuthenticate() {

      try {
        const result = await auth();

        if (result !== true) {
          navigate('/');
        }



      } catch (error) {

        navigate('/');

      }

    }
    isAuthenticate();

    subscriptionHook();

    /*if (!subscriptionRd) {

      
    }*/


  }, [])


  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile)
  const subscription = useSelector(state => state.user.subscription)

  if (profile.id === -1) {
    dispatch(load())
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} mt={4}>
          <SubscriptionInformation />
        </Grid>

      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default Subscription;