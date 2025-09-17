import Button from "../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Banner from "../assets/last.png";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-sky-900 via-blue-900 to-black min-h-screen text-white px-4">
      {/* Hero Section */}
      <h2 className="my-10 sm:my-16 text-4xl sm:text-6xl lg:text-7xl text-center font-extrabold leading-tight">
        The only URL Shortener <br /> you’ll ever need 
      </h2>

      {/* Input + Button */}
      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-3 bg-white rounded-xl p-2 shadow-lg"
      >
        <input
          type="url"
          placeholder="Paste your long URL here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button
          className="h-full px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
          type="submit"
        >
          Shorten!
        </Button>
      </form>

      {/* Banner */}
      <img
        src={Banner}
        alt="banner"
        className="w-full max-w-5xl my-14 md:px-11 rounded-xl shadow-lg"
      />

      {/* FAQ Section */}
      <div className="w-full md:w-3/4 lg:w-2/3 mb-20">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h3>
        <Accordion type="multiple" collapsible className="bg-white/10 rounded-xl p-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How does the Trimrr URL shortener work?
            </AccordionTrigger>
            <AccordionContent>
              It’s simple! Paste your long link in the box above, click
              <b> Shorten</b>, and we’ll instantly generate a short, easy-to-share
              link. You can copy it and use it anywhere — social media, email, or
              even QR codes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              Is the shortened link permanent?
            </AccordionTrigger>
            <AccordionContent>
              Yes, once you create a short link with Trimrr, it will remain active
              unless you choose to delete it from your dashboard. We ensure
              reliable redirects for all generated links.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Can I track who clicks on my links?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely! Trimrr provides powerful analytics. You can see how many
              people clicked your link, where they are from, and which device they
              used. Perfect for marketers and creators.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              Is Trimrr free to use?
            </AccordionTrigger>
            <AccordionContent>
              Yes, our basic URL shortening service is completely free. We also
              offer premium features like custom domains, branded links, and
              advanced analytics for power users and businesses.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;
