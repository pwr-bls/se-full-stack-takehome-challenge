import * as React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button, LoadingSpinner, SaleCard, SearchForm } from "../../components";
import {useFavouriteSearch} from "../../utils/UseSearch";
import {
  LoadMoreWrapper,
  SearchResultsContainer,
  SearchResultsHeader,
} from "./SearchResults.styles";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

export const FavouriteResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const {favouriteSaleIds} = useContext(UserContext)
  const params = useParams();
  const query: string = params?.query ?? searchParams.get("query") ?? "";
  const { loading, error, response, fetchMore } = useFavouriteSearch({
    query,
    ids: favouriteSaleIds,
    pageSize: 16,
  });
  if (favouriteSaleIds.length === 0) {
    return <div>
      <SearchResultsHeader>
        <h2> </h2>
        <SearchForm />
      </SearchResultsHeader>
      <h4>
        You haven't selected your favorite sales yet
      </h4>
    </div>
  }

  return (
    <div>
      <SearchResultsHeader>
        <h2> </h2>
        <SearchForm />
      </SearchResultsHeader>
      {loading && <LoadingSpinner />}
      {error && <p>{error.toString()}</p>}
      {response && (
        <>
          <h4>
            Found {response?.resultCount ?? 0}{" "}
            {response?.resultCount !== 1 ? "results" : "result"}
          </h4>
          <SearchResultsContainer>
            {response?.sales?.map((s, i) => (
              <SaleCard key={i} sale={s} />
            ))}
          </SearchResultsContainer>
          {response?.sales.length < response.resultCount && (
            <LoadMoreWrapper>
              <Button onClick={fetchMore} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </Button>
            </LoadMoreWrapper>
          )}
        </>
      )}
    </div>
  );
};
