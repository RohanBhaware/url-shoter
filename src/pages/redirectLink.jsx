import { useParams } from "react-router-dom";
import useFetch from "../hooks/use-fetch";
import { getLongUrl } from "../db/apiUrls";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { storeClicks } from "../db/aipClick";

const RedirectLink = () => {
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl, id)
  const { loading: loadingState, fn: fnState } = useFetch(storeClicks, {
    id: data?.id,
  });

 useEffect(() => {
  if (id) {
    fn();
  }
}, [id]);

  useEffect(() => {
    if (!loading && data?.original_url) {
      fnState(); // store clicks
    
      window.location.href = data.original_url; 
    }
  }, [loading, data]);

  if (loading || loadingState) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting....
      </>
    );
  }

  return null
}

export default RedirectLink;
