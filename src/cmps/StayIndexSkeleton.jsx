import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function Media(props) {
  const { loading = false } = props;

  return (
    <Grid container wrap="nowrap" margin={10}>
      {Array.from(new Array(5)).map((item, index) => (
        <Box key={index} sx={{ width: 280, marginRight: 5, my: 5 }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={280}
            height={280}
            sx={{ borderRadius: "5%" }}
          />

          <Box sx={{ pt: 0.5 }}>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" width="60%" />
          </Box>
        </Box>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export function StayIndexSkeleton() {
  return (
    <Box>
      <Media loading />
      <Media />
    </Box>
  );
}
