export const chatBoxStyle = {
  position: "fixed",
  width: 300,
  height: 400,
  borderTopLeftRadius: 7,
  borderTopRightRadius: 7,
  bottom: 130,
  boxShadow:
    "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);",
  margin: "40px 0",
  right: "40px",
  flexFlow: "column",
  textAlign: "left",
  color: "white",
  bgcolor: "primary.chat",
};

export const headerStyle = {
  alignItems: "center",
  textAlign: "center",
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  borderBottom: "1px solid rgb(91 81 81 / 40%)",
  fontSize: "0.85rem",
  fontwWeight: "700",
  p: "12.5px",
  bgcolor: "primary.dark",
};

export const messagesStyle = {
  overflowY: "auto",
  height: "100%",
};
