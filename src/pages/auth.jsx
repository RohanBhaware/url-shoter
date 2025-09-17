import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "../components/login";
import Signup from "../components/signup";
import { useEffect } from "react";
import { UrlState } from "../constext"; 

const Auth = () => {

  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const {isAuthenticated, loading} = UrlState();

  useEffect(() => {
    if(isAuthenticated && !loading){
    navigate(`/dashboard?  ${longLink ? `createNew=${longLink}`: ""}`);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="mt-20 flex flex-col items-center gap-5">
      <h1 className="text-5xl font-extrabold">
        {searchParams.get("createNow")
          ? "Hold up! Let's Login first..."
          : "Login / SignUp"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="gray w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>

        <TabsContent value="login"><Login /></TabsContent>

        <TabsContent value="signup"><Signup /></TabsContent>
      </Tabs>
    </div>
  )
}

export default Auth;


// r           t
// 1 - 6.8      8.53    
// 2 - 6.6      8.08
//3 -            7.3
//4 -            7
//5 - 6.41      7.07
//6 - 6.7       7.33