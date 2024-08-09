import './App.css';

import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {UserContextProvider} from "./context/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import Logout from './pages/Logout';
import ErrorPage from './pages/ErrorPage';
import DeletePost from './pages/DeletePost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
      <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Layout />}>
        
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/page-log-out" element={<Logout />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/delete/:id" element={<DeletePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
