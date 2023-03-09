import * as React from "react";
import { useParams } from "react-router-dom";
import { useFetchSale } from "../../utils/UseFetchSale";
import DOMPurify from "dompurify";
import {FavouriteRow, ImageWrapper, SaleDetailHeader} from "./SaleDetails.styles";
import {Button, LoadingSpinner} from "../../components";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

export const SaleDetails: React.FC = () => {
  const {userId, favouriteSaleIds, addFavouriteSaleId, removeFavouriteSaleId} = useContext(UserContext)
  const params = useParams();
  const id: string = params.id ?? "";
  const { loading, error, sale } = useFetchSale({ saleId: id });

  const isFavourite = favouriteSaleIds.findIndex(favId => favId === id) > -1;
  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <p>{error.toString()}</p>}
      {sale && (
        <section>
          <SaleDetailHeader>
            <div>
              <h2>{sale.editorial.destinationName}</h2>
              <h1>{sale.editorial.title}</h1>
            </div>
            <strong>from {sale.prices.leadRate.forDisplay}</strong>
          </SaleDetailHeader>
          <FavouriteRow>
            {userId && <Button onClick={() => isFavourite ? removeFavouriteSaleId(id) : addFavouriteSaleId(id)}>{`${isFavourite ? `\u2713`: 'add'} favourite`}</Button>}
          </FavouriteRow>
          <ImageWrapper>
            <img src={sale.photos?.[0].url} alt={sale.editorial?.title} />
          </ImageWrapper>
          {sale.editorial.hotelDetails && (
            <article
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(sale?.editorial?.hotelDetails),
              }}
            />
          )}
        </section>
      )}
    </div>
  );
};
