import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;