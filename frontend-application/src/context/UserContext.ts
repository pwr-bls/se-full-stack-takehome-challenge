import { Context, createContext } from "react";

interface IUserContext {
  userId: string;
  setUserId: (userId: string) => void;
  favouriteSaleIds: string[];
  addFavouriteSaleId: (id: string) => void;
  removeFavouriteSaleId: (id: string) => void;
}

export const UserContext: Context<IUserContext> = createContext({
  userId: "",
  setUserId: (_userId) => {},
  favouriteSaleIds: new Array<string>(),
  addFavouriteSaleId: (_saleId) => {},
  removeFavouriteSaleId: (_saleId) => {},
});
