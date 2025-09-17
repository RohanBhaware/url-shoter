import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useEffect, useState } from "react";
import { UrlState } from "../constext";
import useFetch from "../hooks/use-fetch";
import { getUrls } from "../db/apiUrls";
import { getClickForUrls } from "../db/aipClick";
import LinkCard from "../components/link-card";
import { CreateLink } from "../components/create-link";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(getClickForUrls, urls?.map((url) => url.id));

  useEffect(() => {
    fnUrls();
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (
    <div className="flex flex-col gap-10 px-4 sm:px-8 py-6">
      {/* Loading Bar */}
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#3b82f6" />
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg">Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{urls?.length || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Header + Create Link Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          My Links
        </h1>
        <CreateLink />
      </div>

      {/* Search Box */}
      <div className="relative">
        <input
          className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          type="text"
          placeholder="Search your links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Error Handling */}
      {error && (
        <p className="text-red-500 font-semibold">
          {error?.message || "Something went wrong!"}
        </p>
      )}

      {/* Links List */}
      <div className="flex flex-col gap-4">
        {(filteredUrls || []).length > 0 ? (
          filteredUrls.map((url, i) => (
            <LinkCard key={i} url={url} fetchUrls={fnUrls} />
          ))
        ) : (
          <p className="text-gray-500 italic text-center">
            No links found. Try creating one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
