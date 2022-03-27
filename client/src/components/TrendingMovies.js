import React from "react";
import { useTrending } from "../hooks/useTrending";
import MovieCard from "./MovieCard";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const responsive = {
  0: {
    items: 2,
  },
  512: {
    items: 3,
  },
  1024: {
    items: 6,
  },
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "transparent !important",
  [theme.breakpoints.down("md")]: {
    marginTop: "100px !important",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor: "transparent !important",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
      justifyContent: "center",
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: "0px solid rgba(0, 0, 0, .125)",
  width: "80vw",
}));

const TrendingMovies = () => {
  const { data } = useTrending();
  const trending = sessionStorage.getItem("trending");
  const isTrending = trending ? trending === "true" : true;
  const [expanded, setExpanded] = React.useState(isTrending);

  const handleChange = (event, newExpanded) => {
    setExpanded(newExpanded);
    sessionStorage.setItem("trending", newExpanded ? true : false);
  };

  return (
    <>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          style={{ justifyContent: "center" }}
        >
          <Typography variant="h6">
            {!expanded ? (
              <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
            ) : (
              <ArrowForwardIosSharpIcon
                sx={{ fontSize: "0.9rem", transform: "rotate(90deg)" }}
              />
            )}{" "}
            Trending Movies
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AliceCarousel
            disableDotsControls
            disableButtonsControls
            infinite
            autoPlay
            autoPlayInterval={2000}
            responsive={responsive}
            mouseTracking
            items={data?.data?.data?.movies?.map((movie, index) => (
              <div className="carouselItem trending">
                <MovieCard movie={movie} key={index} trending={true} />
              </div>
            ))}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TrendingMovies;
