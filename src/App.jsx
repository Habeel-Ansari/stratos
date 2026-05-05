import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage, ContactPage, HomePage, NotFoundPage, ProductsPage } from "./pages";
import { SiteLayout } from "./siteComponents";

function App() {
  return (
    <BrowserRouter>
      <SiteLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  );
}

export default App;
