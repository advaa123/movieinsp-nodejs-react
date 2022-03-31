import { Container, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 3 }}
        py={{ xs: 5, sm: 3 }}
        bgcolor="text.secondary"
        color="white"
        style={{position: "relative", bottom: "0", width: "100%"}}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <GitHubIcon /> <FacebookIcon /> <LinkedInIcon /> <TwitterIcon />
          </Box>
          <Box textAlign="center">
            Movies Inspiration &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
