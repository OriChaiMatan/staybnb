import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useWindowSize } from "../customHooks/useWindowSize";

function Media(props) {
  const windowSize = useWindowSize()
  const { loading = false } = props;

  if (windowSize.width < 780) {
    return (
      <Box sx={{ width: '100%', p: 2 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{ borderRadius: "4px", mb: 2 }}
        />
        <Typography variant="h6" gutterBottom>
          <Skeleton width="60%" />
        </Typography>
        <Typography variant="body2" gutterBottom>
          <Skeleton width="40%" />
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Skeleton width="30%" />
        </Box>
        <Skeleton width="100%" height={40} sx={{ mb: 1 }} />
        <Skeleton width="100%" height={40} sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Skeleton width="30%" />
          <Skeleton width="30%" height={40} />
        </Box>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {/* Large item */}
      <Grid item xs={12} md={6}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={500}
            sx={{ borderRadius: "2%" }}
          />
        </Box>
      </Grid>

      {/* Smaller items */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          {Array.from(new Array(4)).map((item, index) => (
            <Grid item xs={6} key={index}>
              <Box sx={{ width: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={242}
                  sx={{ borderRadius: "2%" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export function StayDetailsSkeleton() {
  const windowSize = useWindowSize()

  if (windowSize.width < 780) {
    return (
      <Box sx={{ flexGrow: 1, p: 0 }}>
        <Media loading />
      </Box>
    )
  }
  return (
    <Box sx={{ flexGrow: 1, p: 8 }}>
      <Media loading />
    </Box>
  );

}