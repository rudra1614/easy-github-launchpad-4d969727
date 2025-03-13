
import { GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <header className="bg-github-dark text-white py-3 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-2">
        <GitBranch className="h-6 w-6 text-github-green" />
        <h1 className="text-xl font-semibold">GitHub Launchpad</h1>
      </div>
      
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/identicons/app/gptengineer" alt="@user" />
                <AvatarFallback>GH</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          variant="default" 
          className="bg-github-green hover:bg-github-green/90 text-white"
          onClick={handleLogin}
        >
          Sign in with GitHub
        </Button>
      )}
    </header>
  );
};

export default Header;
