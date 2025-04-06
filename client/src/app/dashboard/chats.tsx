import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: boolean;
};

interface propsData {
  selectedChat: Chat;
}

type Message = {
  id: number;
  text: string;
  time: string;
  sender: "me" | "them";
};

const mockMessages: Message[] = [
  { id: 1, text: "Hey there!", time: "10:00 AM", sender: "them" },
  { id: 2, text: "Hi! How are you?", time: "10:02 AM", sender: "me" },
];

const Chats: React.FC<propsData> = ({ selectedChat }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessages); // simulate fetch
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };
  return (
    <div>
      {selectedChat ? (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">{selectedChat.name[0]}</Avatar>
              <div>
                <div className="font-medium">{selectedChat.name}</div>
                <div className="text-xs text-muted-foreground">
                  {selectedChat.isGroup ? "Group chat" : "Online"}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Phone size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <Video size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical size={18} />
              </Button>
            </div>
          </div>

          <ScrollArea>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-sm p-3 rounded-lg text-sm ${
                    msg.sender === "me"
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs mt-1 text-muted-foreground text-right">
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </ScrollArea>

          <div className="flex items-center gap-2 p-4 border-t">
            <Smile className="text-muted-foreground" size={20} />
            <Paperclip className="text-muted-foreground" size={20} />
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send size={18} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default Chats;
