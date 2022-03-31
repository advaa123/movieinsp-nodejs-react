import React, { useRef } from "react";
import Movies from "./Movies";

const MoviesBody = () => {
  const ref = useRef(null);
  const executeScroll = () => ref.current.scrollIntoView({behavior: 'smooth'}); 

  return (
    <React.Fragment>
      <Movies ref={ref} handleRef={executeScroll} />
      {/* <MoviePagination ref={ref} handleRef={executeScroll} /> */}
    </React.Fragment>
  );
};

export default MoviesBody;
