import { useEffect } from "react";
import { useMeQuery } from "../gql/graphql";
import { useRouter } from "next/router";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const route = useRouter();

  useEffect(() => {
    if (!data?.me && !fetching) {
      route.replace(`/login?next=${route.pathname}`);
    }
  }, [fetching, data, route]);
};
