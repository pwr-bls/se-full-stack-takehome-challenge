import * as React from "react";
import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import { Home, SaleDetails, SearchResults, FavouriteResults } from "./pages";
import { MainLayout } from "./layout/MainLayout";
import { UserContext } from "./context/UserContext";
import axios from "axios";

export const App: React.FC = () => {
  const [userId, setUserId] = useState<string>(
    localStorage.getItem("SET_USER_ID") ?? ""
  );
  const [favouriteSaleIds, setFavouriteSaleIds] = useState<string[]>([]);
  const handleSetUserId: (userId: string) => void = (userId) => {
    localStorage.setItem("SET_USER_ID", userId);
    setUserId(userId);
  };

  const handleAddFavouriteSaleId = (saleId: string) => {
    setFavouriteSaleIds(prev => ([...prev, saleId]))
    axios.post('http://localhost:5002/user/favourites', {userId, saleId});
  };


  const handleRemoveFavouriteSaleId = (saleId: string) => {
    setFavouriteSaleIds(prev => ([...prev.filter(prevId => prevId !== saleId)]))
    axios.delete(`http://localhost:5002/user/favourites?userId=${userId}&saleId=${saleId}`);
  };

  useEffect(() => {
    if (!userId) {
      setFavouriteSaleIds([]);
      return;
    }

    axios.get(`http://localhost:5002/user/favourites?userId=${userId}`).then(response => {
      setFavouriteSaleIds(response.data.favourites)
    })
  }, [userId])

  return (
    <UserContext.Provider value={{ userId, setUserId: handleSetUserId, favouriteSaleIds, addFavouriteSaleId:handleAddFavouriteSaleId, removeFavouriteSaleId:handleRemoveFavouriteSaleId }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sale/:id" element={<SaleDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/search" element={<SearchResults />} />
          {userId && <Route path="/favourite" element={<FavouriteResults />} />}
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};
