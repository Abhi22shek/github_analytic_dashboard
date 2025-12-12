import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./component/layout/index";
import {
  Home,
  ProfilePage,
  FavoritesPage,
  ComparePage,
  FollowersPage,
  NotFound,
} from "./pages";

const App = () => {
  return (
    <div className="bg-background text-foreground">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/profile/:username/followers" element={<FollowersPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
