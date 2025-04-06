import { MessageSquare, Search, Users } from "lucide-react";
import { ProfileDropdown } from "./profile-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: boolean;
};

const mockChats: Chat[] = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    unread: 2,
    isGroup: false,
  },
  {
    id: 2,
    name: "Family Group",
    lastMessage: "Mom: Dinner at 8pm",
    time: "9:15 AM",
    unread: 5,
    isGroup: true,
  },
  {
    id: 3,
    name: "Alice Smith",
    lastMessage: "Can we meet tomorrow?",
    time: "Yesterday",
    unread: 0,
    isGroup: false,
  },
];
interface propsFunction {
  selectedChat?: Chat;
  setSelectedChat: (chat: Chat) => void;
}

const UserList: React.FC<propsFunction> = ({
  setSelectedChat,
  selectedChat,
}) => {
  return (
    <div className="flex flex-col h-full border-r">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg">Chats</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <MessageSquare size={18} />
          </Button>
          <Button variant="ghost" size="icon">
            <Users size={18} />
          </Button>
          <ProfileDropdown />
        </div>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-2.5 text-muted-foreground"
            size={18}
          />
          <Input placeholder="Search chats" className="pl-10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              selectedChat?.id === chat.id ? "bg-primary/10" : "hover:bg-accent"
            }`}
            onClick={() => setSelectedChat(chat)}
          >
            <Avatar className="h-10 w-10">{chat.name[0]}</Avatar>
            <div className="flex-1">
              <div className="flex justify-between">
                <div className="font-medium truncate">{chat.name}</div>
                <div className="text-xs text-muted-foreground">{chat.time}</div>
              </div>
              <div className="text-sm text-muted-foreground truncate">
                {chat.lastMessage}
              </div>
            </div>
            {chat.unread > 0 && (
              <div className="bg-primary text-white rounded-full text-xs px-2 py-0.5">
                {chat.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
