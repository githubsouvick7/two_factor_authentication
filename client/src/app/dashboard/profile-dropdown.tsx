import { User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from '@/context/userContext';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClickOpen, setIsClickOpen] = useState<boolean>(false);
  const {user} = useUser();
  
  const menuItems: MenuItem[] = [
    { icon: User, label: 'Profile', onClick: () => console.log('Profile clicked') },
    { icon: LogOut, label: 'Logout', onClick: () => console.log('Logout clicked') }
  ];

  const handleClick = () => {
    setIsClickOpen(!isClickOpen);
    setIsOpen(!isClickOpen);
  };

  return (
    <div 
      onMouseEnter={() => {
        if (!isClickOpen) setIsOpen(true);
      }}
      onMouseLeave={(e) => {
        if (e.relatedTarget instanceof HTMLElement && e.relatedTarget.closest('[data-dropdown-content]')) {
          return;
        }
        if (!isClickOpen) setIsOpen(false);
      }}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer" onClick={handleClick}>
            {/* <Image 
              src={`https://ui-avatars.com/api/?format=svg&name=${user?.name}+${user?.name}&rounded=true&background=random`}
              alt="User avatar"
              width={40}
              height={40}
            /> */}
            <AvatarFallback className="bg-indigo-100 text-indigo-600">{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-56 bg-white" 
          data-dropdown-content
          onMouseLeave={() => {
            if (!isClickOpen) setIsOpen(false);
          }}
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem
                key={index}
                onClick={item.onClick}
                className="cursor-pointer py-3 px-4 hover:bg-gray-100"
              >
                <Icon className="h-4 w-4 mr-3" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
