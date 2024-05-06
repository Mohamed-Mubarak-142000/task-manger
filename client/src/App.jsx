import Routes from "./utils/Routes";
import { Toaster } from "sonner"; // Assuming Toaster is exported as named export

function App() {
  return (
    <>
      <Routes />
      <Toaster
        richColors
        toastOptions={{
          style: {
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          },
          className: "class",
        }}
      />
    </>
  );
}

export default App;
