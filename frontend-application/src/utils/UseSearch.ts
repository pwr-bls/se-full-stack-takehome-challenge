import { DocumentNode, gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { IBasicSale } from "./Sale.interface";

export interface ISearchResponse {
  resultCount: number;
  sales: Array<IBasicSale>;
}

interface IUseSearch {
  response: ISearchResponse | null;
  loading: boolean;
  error: any;
  fetchMore: () => void;
}

interface IUseSearchProps {
  query: string;
  pageSize?: number;
}
interface IUseFavouriteSearchProps {
  ids: string[];
  query: string;
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE: number = 10;
const SEARCH_QUERY: DocumentNode = gql`
  query search($query: String, $limit: Int, $offset: Int, $ids: [String]) {
    saleSearch(query: $query, travelTypes: "HOTEL_ONLY", saleIds: $ids) {
      resultCount
      sales(limit: $limit, offset: $offset) {
        id
        editorial {
          title
          destinationName
        }
        photos {
          url
        }
      }
    }
  }
`;

export const useSearch: (props: IUseSearchProps) => IUseSearch = ({
  query,
  pageSize = DEFAULT_PAGE_SIZE,
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [currentQuery, setCurrentQuery] = useState<string>(query);

  if (query !== currentQuery) {
    setOffset(0);
    setCurrentQuery(query);
  }

  const { data, loading, error, fetchMore } = useQuery(SEARCH_QUERY, {
    variables: {
      query,
      offset: 0,
      limit: pageSize,
    },
  });

  return {
    response: data?.saleSearch,
    loading,
    error,
    fetchMore: () => {
      fetchMore({
        variables: {
          query,
          offset: offset + pageSize,
          limit: pageSize,
        },
      });
      setOffset((v) => v + pageSize);
    },
  };
};

export const useFavouriteSearch: (props: IUseFavouriteSearchProps) => IUseSearch = ({
                                                                                      ids,
  query,
  pageSize = DEFAULT_PAGE_SIZE,
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [currentQuery, setCurrentQuery] = useState<string>(query);

  if (query !== currentQuery) {
    setOffset(0);
    setCurrentQuery(query);
  }

  const { data, loading, error, fetchMore } = useQuery(SEARCH_QUERY, {
    variables: {
      ids,
      query,
      offset: 0,
      limit: pageSize,
    },
  });

  return {
    response: data?.saleSearch,
    loading,
    error,
    fetchMore: () => {
      fetchMore({
        variables: {
          ids,
          query,
          offset: offset + pageSize,
          limit: pageSize,
        },
      });
      setOffset((v) => v + pageSize);
    },
  };
};
