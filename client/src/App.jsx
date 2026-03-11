import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ScrollToTop from "./components/ScrollToTop";
import './index.css'
import Navbar from './components/Navbar'
import ChatbotWidget from './components/ChatbotWidget'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import Resorts from './pages/Resorts'
import Contact from './pages/Contact'
import ResortDetail from './pages/ResortDetail'
import Destinations from './pages/Destinations'
import PlaceDetail from './pages/PlaceDetail';



function App() {
  return (
    <>
     <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/resorts" element={<Resorts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resorts/:id" element={<ResortDetail />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
      </Routes>
      <ChatbotWidget />
      <Footer />
    </>
  );
}

export default App