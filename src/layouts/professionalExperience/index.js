
// Material Dashboard 2 React components


// Material Dashboard 2 React example components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import ProfessionalInformation from "layouts/professionalExperience/components/ProfessionalInformation";
import Footer from "components/Footer";
import { useEffect } from "react";
import auth from '../../service/auth'

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { load } from "slices/userSlice";


function Professional() {

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
  }, [])


  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile)
  if (profile.id === -1) {
    dispatch(load())
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ProfessionalInformation />
      <Footer />
    </DashboardLayout>
  );
}

export default Professional;