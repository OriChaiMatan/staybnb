import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

function Media(props) {
    const { loading = false } = props;

    return (
        <Grid container justifyContent="center" alignItems="center" gap={6} wrap="nowrap" marginTop={2}>
            {Array.from(new Array(13)).map((item, index) => (
                <Grid item key={index}>
                    <Grid container direction="column" alignItems="center" spacing={1}>
                        <Grid item>
                            <Skeleton
                                animation="wave"
                                variant="circular"
                                width={28}
                                height={28}
                            />
                        </Grid>
                        <Grid item>
                            <Skeleton animation="wave" width={75} />
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}

Media.propTypes = {
    loading: PropTypes.bool,
};

export function LabelFilterSkeleton() {
    return <Media loading />;
}
