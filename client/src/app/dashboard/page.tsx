"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import Chats from "./chats";
import UserList from "./user-list";

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: boolean;
};

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>();

  return (
    <div className="h-screen w-screen">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={25} minSize={20}>
          <UserList
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={75} minSize={50}>
          {selectedChat && <Chats selectedChat={selectedChat} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
