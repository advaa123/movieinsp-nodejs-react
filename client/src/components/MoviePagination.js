// import React, { forwardRef, useEffect } from "react";
// import Typography from "@mui/material/Typography";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   loadMoviePage,
//   loadSearchMoviePage,
//   moviesSlice,
//   selectPages,
//   selectRequestType,
// } from "../features/MoviesSlice";
// import { selectCheckedGenres } from "../features/GenresSlice";

// const MoviePagination = forwardRef(({ handleRef }, ref) => {
//   const [page, setPage] = React.useState(1);
//   const checkedGenres = useSelector(selectCheckedGenres);
//   const totalPages = useSelector(selectPages);
//   const requestType = useSelector(selectRequestType);
//   const dispatch = useDispatch();

//   const handleChange = (event, value) => {
//     handleRef();
//     setPage(value);
//   };

//   useEffect(() => {
//     if (!requestType.startsWith(".")) {
//       if (page !== 1)
//         dispatch(loadMoviePage({ reqType: requestType, page: page }));
//     }
//     else {
//         dispatch(
//           loadSearchMoviePage({ movie: requestType.slice(1), page: page })
//         );
//     }
//   }, [dispatch, page]);

//   useEffect(() => {
//     setPage(1);
//   }, [requestType, dispatch]);

//   return (
//     <Stack spacing={2} sx={{ m: 5 }}>
//       {requestType.startsWith(".") && checkedGenres.length ? (
//         ""
//       ) : (
//         <Pagination count={totalPages} page={page} onChange={handleChange} />
//       )}
//     </Stack>
//   );
// });

// export default MoviePagination;
