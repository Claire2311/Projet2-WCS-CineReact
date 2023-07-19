import AppRoutes from "./routes/Routes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
