import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LogoDesc from "./LogoDesc";
import JumboSearch from "./JumboSearch";
// import batman from "../../public/batman.png";

const Jumbo = () => {
  const theme = useTheme();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <React.Fragment>
      <Box
        sx={{
          bgcolor: "primary.chat",
          color: "white",
          justifyContent: "center",
          display: "flex",
          flexFlow: "column",
        }}
        style={{
          background:
            "linear-gradient(295deg, rgba(255,255,255,0.5) 0%, rgba(13,15,18,0.5) 75%)",
        }}
        // style={{
        //   background:
        //     "linear-gradient(342deg, rgba(136,0,113,0.7) 0%, rgba(0,26,129,0.5) 100%)",
        // }}
      >
        <Box
          style={{
            backgroundImage: "url('/batman.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "480px",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 90,
            zIndex: 0,
          }}
        />{" "}
        <Box
          sx={{
            justifyContent: "space-evenly",
            alignItems: "center",
            display: "flex",
            flexFlow: "row wrap",
            zIndex: 2,
            pt: 6,
          }}
        >
          {/* <LogoDesc /> */}
          <JumboSearch />
        </Box>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            style={{
              display: "block",
            }}
          >
            <path
              fill={theme.palette.background.default} // theme.palette.background.default
              fillOpacity="1"
              d="M0,256L48,234.7C96,213,192,171,288,170.7C384,171,480,213,576,229.3C672,245,768,235,864,197.3C960,160,1056,96,1152,74.7C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default Jumbo;
