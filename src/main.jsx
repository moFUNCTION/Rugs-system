import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";
import { UserDataProvider } from "./Context/UserDataProvider/UserDataPRovider.jsx";
const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
    Input: {
      baseStyle: {
        border: "1px",
        borderRadius: "sm",
      },
    },
    Select: {
      baseStyle: {
        border: "1px",
        borderRadius: "sm",
      },
    },
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
