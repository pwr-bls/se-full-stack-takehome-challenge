import * as React from "react";
import { ISale } from "../../utils/Sale.interface";
import {
  DestenationText,
  SaleCardContent,
  SaleCardLink,
  TitleText,FavouriteRow
} from "./SaleCard.styles";
import {Button} from "../Button/Button";
import {SyntheticEvent, useContext} from "react";
import {UserContext} from "../../context/UserContext";

interface ISaleCardProps {
  sale: Partial<ISale>;
}

export const SaleCard: React.FC<ISaleCardProps> = ({ sale }) => {
  const {userId, favouriteSaleIds, addFavouriteSaleId, removeFavouriteSaleId} = useContext(UserContext);
  const isFavourite = favouriteSaleIds.findIndex(favId => favId === sale.id) > -1;

  const handleFavourite = (event: SyntheticEvent) => {
      event.preventDefault();
      isFavourite ? removeFavouriteSaleId(sale?.id!) : addFavouriteSaleId(sale?.id!)
  }
  return (
    <SaleCardLink to={`/sale/${sale.id}`}>
      <img
        width="100%"
        src={sale.photos?.[0].url}
        alt={sale?.editorial?.title}
      />
      <SaleCardContent>
        <DestenationText>{sale?.editorial?.destinationName}</DestenationText>
        <TitleText>{sale?.editorial?.title}</TitleText>
          <FavouriteRow>
              {userId && <Button onClick={handleFavourite}>{`${isFavourite ? `\u2713`: 'add'} favourite`}</Button>}
          </FavouriteRow>
      </SaleCardContent>
    </SaleCardLink>
  );
};
