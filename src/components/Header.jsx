import React from 'react'
import Button from '../components/ui/button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu.jsx'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { AvatarFallback } from './ui/avatar.jsx'
import { LinkIcon, LogOut } from 'lucide-react'
import { UrlState } from '../constext.jsx'
import useFetch from '../hooks/use-fetch.jsx'
import { BarLoader } from 'react-spinners'
import { logout } from '../db/apiAuth.js'
import Logo from "../assets/logo.png"

const Header = () => {
  
    const navigate = useNavigate();
    // const user = false;

    const {user, fetchUser} = UrlState();

    const {loading, fn: fnLogout} = useFetch(logout);

    return (
    <>
        <nav className='py-4 flex justify-between items-center'>

            <Link to="/">
            <img src={Logo} alt="logo" className='h-10'/>
            </Link>

            <div>
                {!user ?
                    <Button onClick={() => navigate("/auth")}>Login </Button>
                    : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                                <Avatar>
                                    <AvatarImage src={user?.user_metadata?.profile_pic} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{user?.user_metadata?.name }</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to={"/dashboard"} className="flex">
                                        <LinkIcon className="mr-2 h-4 w-2" />
                                        My Links
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className={'text-red-400'}>
                                    <LogOut className="mr-2 h-4 w-2" />
                                    <span onClick={() => {
                                        fnLogout().then(() => {
                                            fetchUser();
                                            navigate("/");
                                        })
                                    }}
                                    >
                                        Logout
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </div>
        </nav>
            {loading && <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>}
    </>
    )
}

export default Header
