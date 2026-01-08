"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Video } from "lucide-react"

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  is_read: boolean
  created_at: string
  sender?: {
    id: string
    email: string
    full_name: string | null
    is_alumni: boolean
  }
  receiver?: {
    id: string
    email: string
    full_name: string | null
    is_alumni: boolean
  }
}

interface Profile {
  id: string
  email: string
  full_name: string | null
  is_alumni: boolean
}

interface MessagingInterfaceProps {
  currentUserId: string
  sentMessages: Message[]
  receivedMessages: Message[]
  currentProfile: Profile | null
}

export function MessagingInterface({
  currentUserId,
  sentMessages,
  receivedMessages,
  currentProfile,
}: MessagingInterfaceProps) {
  const searchParams = useSearchParams()
  const initialUserId = searchParams.get("user")

  const [selectedUserId, setSelectedUserId] = useState<string | null>(initialUserId)
  const [messages, setMessages] = useState<Message[]>([...sentMessages, ...receivedMessages])
  const [newMessage, setNewMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isZoomDialogOpen, setIsZoomDialogOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([...sentMessages, ...receivedMessages])
  }, [sentMessages, receivedMessages])

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedUserId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Get unique conversations
  const conversations = messages.reduce(
    (acc, msg) => {
      const otherUserId = msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id
      const otherUser = msg.sender_id === currentUserId ? msg.receiver : msg.sender

      if (!acc[otherUserId] && otherUser) {
        acc[otherUserId] = {
          userId: otherUserId,
          user: otherUser,
          lastMessage: msg,
          unreadCount: 0,
        }
      }

      // Update last message if newer
      if (acc[otherUserId] && new Date(msg.created_at) > new Date(acc[otherUserId].lastMessage.created_at)) {
        acc[otherUserId].lastMessage = msg
      }

      // Count unread messages
      if (msg.receiver_id === currentUserId && !msg.is_read) {
        acc[otherUserId].unreadCount++
      }

      return acc
    },
    {} as Record<
      string,
      {
        userId: string
        user: { id: string; email: string; full_name: string | null; is_alumni: boolean }
        lastMessage: Message
        unreadCount: number
      }
    >,
  )

  const conversationList = Object.values(conversations).sort(
    (a, b) => new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime(),
  )

  // Get messages for selected conversation
  const selectedConversation = selectedUserId
    ? messages
        .filter((msg) => msg.sender_id === selectedUserId || msg.receiver_id === selectedUserId)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    : []

  const selectedUser = selectedUserId ? conversations[selectedUserId]?.user : null

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedUserId || isSending) return

    setIsSending(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        sender_id: currentUserId,
        receiver_id: selectedUserId,
        content: newMessage.trim(),
        is_read: false,
        created_at: new Date().toISOString(),
        sender: currentProfile,
      }

      setMessages([...messages, newMsg])
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsSending(false)
    }
  }

  const markAsRead = async (messageId: string) => {
    console.log("[v0] Marking message as read:", messageId)
  }

  useEffect(() => {
    if (selectedUserId) {
      const unreadMessages = selectedConversation.filter((msg) => msg.receiver_id === currentUserId && !msg.is_read)
      unreadMessages.forEach((msg) => markAsRead(msg.id))
    }
  }, [selectedUserId, selectedConversation])

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-12rem)]">
      {/* Conversations List */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>メッセージ</CardTitle>
          <CardDescription>{conversationList.length}件の会話</CardDescription>
        </CardHeader>
        <ScrollArea className="flex-1">
          <CardContent className="space-y-2">
            {conversationList.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">まだメッセージがありません</p>
              </div>
            ) : (
              conversationList.map((conv) => (
                <button
                  key={conv.userId}
                  onClick={() => setSelectedUserId(conv.userId)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedUserId === conv.userId
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conv.user.full_name?.[0]?.toUpperCase() || conv.user.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm truncate">
                          {conv.user.full_name || conv.user.email.split("@")[0]}
                        </p>
                        {conv.unreadCount > 0 && (
                          <Badge
                            variant="default"
                            className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                          >
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{conv.lastMessage.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(conv.lastMessage.created_at).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </CardContent>
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <Card className="flex flex-col">
        {selectedUser ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedUser.full_name?.[0]?.toUpperCase() || selectedUser.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {selectedUser.full_name || selectedUser.email.split("@")[0]}
                    </CardTitle>
                    <CardDescription>{selectedUser.is_alumni ? "OB/OG" : "現役生"}</CardDescription>
                  </div>
                </div>
                <Button onClick={() => setIsZoomDialogOpen(true)} variant="outline" className="gap-2">
                  <Video className="h-4 w-4" />
                  Zoom
                </Button>
              </div>
            </CardHeader>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedConversation.map((msg) => {
                  const isSender = msg.sender_id === currentUserId
                  return (
                    <div key={msg.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          isSender ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${isSender ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                        >
                          {new Date(msg.created_at).toLocaleTimeString("ja-JP", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <CardContent className="border-t pt-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="メッセージを入力..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={isSending}
                />
                <Button type="submit" disabled={isSending || !newMessage.trim()} className="gap-2">
                  <Send className="h-4 w-4" />
                  送信
                </Button>
              </form>
            </CardContent>

            {/* Zoom Meeting Dialog */}
            {/* Removed Zoom Meeting Dialog component */}
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>会話を選択してください</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
