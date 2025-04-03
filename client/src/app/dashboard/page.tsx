"use client";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  MessageSquare,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Users,
  Video,
} from "lucide-react";
import { ProfileDropdown } from "./profile-dropdown";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

const mockChats = [
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
  {
    id: 4,
    name: "Work Team",
    lastMessage: "Bob: I've sent the report",
    time: "Yesterday",
    unread: 0,
    isGroup: true,
  },
  {
    id: 5,
    name: "David Wilson",
    lastMessage: "Thanks for your help!",
    time: "Tuesday",
    unread: 0,
    isGroup: false,
  },
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
  {
    id: 4,
    name: "Work Team",
    lastMessage: "Bob: I've sent the report",
    time: "Yesterday",
    unread: 0,
    isGroup: true,
  },
  {
    id: 5,
    name: "David Wilson",
    lastMessage: "Thanks for your help!",
    time: "Tuesday",
    unread: 0,
    isGroup: false,
  },
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
  {
    id: 4,
    name: "Work Team",
    lastMessage: "Bob: I've sent the report",
    time: "Yesterday",
    unread: 0,
    isGroup: true,
  },
  {
    id: 5,
    name: "David Wilson",
    lastMessage: "Thanks for your help!",
    time: "Tuesday",
    unread: 0,
    isGroup: false,
  },
];

const mockMessages: Message[] = [
  { id: 1, text: "Hey there!", time: "10:00 AM", sender: "them" },
  { id: 2, text: "Hi! How are you?", time: "10:02 AM", sender: "me" },
  {
    id: 3,
    text: "I'm good, thanks! Just wanted to check in.",
    time: "10:05 AM",
    sender: "them",
  },
  {
    id: 4,
    text: "That's great to hear. I've been meaning to ask you about our plans for the weekend.",
    time: "10:07 AM",
    sender: "me",
  },
  {
    id: 5,
    text: "Yes, I was thinking we could go to that new restaurant downtown. I heard it's really good.",
    time: "10:10 AM",
    sender: "them",
  },
  {
    id: 6,
    text: "Sounds perfect! What time were you thinking?",
    time: "10:12 AM",
    sender: "me",
  },
  {
    id: 7,
    text: "How about 7 PM on Saturday?",
    time: "10:15 AM",
    sender: "them",
  },
  {
    id: 8,
    text: "Works for me! I'll make a reservation.",
    time: "10:17 AM",
    sender: "me",
  },
  {
    id: 9,
    text: "Great, looking forward to it!",
    time: "10:20 AM",
    sender: "them",
  },
];

interface Message {
  id: number;
  text: string;
  time: string;
  sender: "me" | "them";
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: boolean;
}

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessages);
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen w-screen bg-background">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg">
        <ResizablePanel minSize={15} defaultSize={25}>
          <div className="p-4 flex justify-between items-center bg-primary/5">
            <div className="font-semibold text-lg">Chats</div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <MessageSquare size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Users size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <ProfileDropdown />
              </Button>
            </div>
          </div>
          <div className="p-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search or start a new chat"
                className="pl-10"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat?.id === chat.id
                    ? "bg-primary/10"
                    : "hover:bg-accent"
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 bg-gray-200 flex items-center justify-center font-semibold text-lg">
                    {chat.name.charAt(0)}
                  </Avatar>
                  {chat.isGroup && (
                    <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1">
                      <Users size={10} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div className="font-medium truncate">{chat.name}</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {chat.time}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </div>
                </div>

                {chat.unread > 0 && (
                  <div className="bg-primary text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel minSize={25} defaultSize={75}>
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <div className="bg-primary/10 text-primary flex items-center justify-center font-medium h-full">
                        {selectedChat.name.charAt(0)}
                      </div>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedChat.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedChat.isGroup ? "Group chat" : "Online"}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Search size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={20} />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === "me"
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent"
                        }`}
                      >
                        <div>{message.text}</div>
                        <div
                          className={`text-xs ${
                            message.sender === "me"
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          } text-right mt-1`}
                        >
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>

                <div className="p-4 border-t flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Smile size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Paperclip size={20} />
                  </Button>
                  <Input
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send size={20} className="text-primary" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <MessageSquare
                  size={80}
                  className="text-muted-foreground/20 mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">Welcome to ChatApp</h3>
                <p className="text-muted-foreground max-w-md">
                  Select a chat from the sidebar to start messaging or create a
                  new conversation.
                </p>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ChatPage;

{
  /*  <div className="w-80 border-r flex flex-col">
        <div className="p-4 flex justify-between items-center bg-primary/5">
          <div className="font-semibold text-lg">Chats</div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <MessageSquare size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Users size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <ProfileDropdown />
            </Button>
          </div>
        </div>

        <div className="p-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input placeholder="Search or start a new chat" className="pl-10" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat?.id === chat.id
                    ? "bg-primary/10"
                    : "hover:bg-accent"
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <div className=" flex items-center justify-center font-medium h-full text-lg">
                      {chat.name.charAt(0)}
                    </div>
                  </Avatar>
                  {chat.isGroup && (
                    <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1">
                      <Users size={10} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div className="font-medium truncate">{chat.name}</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {chat.time}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </div>
                </div>

                {chat.unread > 0 && (
                  <div className="bg-primary text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

       */
}
