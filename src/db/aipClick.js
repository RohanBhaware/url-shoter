import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClickForUrls(urlIds) {
  const {data, error} = await supabase
  .from("clicks")
  .select("*")
  .in("url_id", urlIds);

  if (error){
    console.error(error.message);
    throw new Error("Unable  to load URLs")
  };

  return data;
}



const parser = new UAParser();


export const storeClicks = async({id}) => {
  try{
    const res = parser.getResult();
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");

    const {city, country_name: country} = await response.json();
   
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      divice: device,
    });


  } catch(error){

    console.error("Error recordig clicks:", error);
  }
};



export async function getClickForUrl(url_id) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id)

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }
return data;
}
 