import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";

export default function App() {
  return <>
    <ToastContainer
      position="top-center" 
      autoClose={3000} 
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Layout />
  </>
}