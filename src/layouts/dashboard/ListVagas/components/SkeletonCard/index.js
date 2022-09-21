

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import MDBox from 'components/MDBox';

export default () => {
  return (<MDBox>
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={160} />
      <Skeleton variant="rectangular" height={160} />
      <Skeleton variant="rectangular" height={160} />
      <Skeleton variant="rectangular" height={160} />

    </Stack>
  </MDBox>)
}
