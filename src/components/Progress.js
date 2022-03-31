import React from "react";
import { CircularProgress, Box, Typography } from "@material-ui/core";
const Progress = ({ value }) => {
  return (
    <>
      {!value ? (
        <CircularProgress
          style={{
            position: "absolute",
            bottom: "25%",
            left: "50%",
          }}
        />
      ) : (
        <Box
          style={{
            position: "absolute",
            bottom: "25%",
            left: "50%",
            display: "inline-flex",
          }}
        >
          <CircularProgress variant="determinate" value={parseFloat(value)} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color={"textSecondary"}
            >{`${parseFloat(value)}%`}</Typography>
          </Box>
        </Box>
      )}
      <div
        style={{
          opacity: "0.3",
          height: " 95%",
          width: "96%",
          transform: "scale(2)",
        }}
        className="modal-backdrop fade show"
      ></div>
    </>
  );
};

export default Progress;
