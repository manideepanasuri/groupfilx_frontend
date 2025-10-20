import React, { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Group } from '@/app_types';
import { userAuthStore } from '@/store/userAuthStore';
import { useGroupSocket } from '@/store/groupSocketStore';
import { useInitGroupSocket } from '@/store/useGroupSocket';

interface Message {
  id: number;
  sender_id: number;
  sender_name: string;
  sender_email: string;
  content: string;
  timestamp: string;
}

interface ChatTabProps {
  group: Group;
}

const ChatTab: React.FC<ChatTabProps> = ({ group }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const { tokens, email } = userAuthStore();
  const ws = useGroupSocket((state) => state.sockets[group.id]);
  useInitGroupSocket(group.id, tokens.access);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages]);

  useEffect(() => {
    if (!ws) return;
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'init') setMessages(data.messages);
        else if (data.type === 'message') setMessages((prev) => [...prev, data.message]);
      } catch (err) {
        console.error('Message parse error:', err);
      }
    };
    ws.onerror = () => setConnected(false);
  }, [ws]);

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !ws || !connected) return;
    ws.send(JSON.stringify({ type: 'message', message: chatMessage }));
    setChatMessage('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          Group Chat
          <span className={`h-3 w-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-secondary rounded-lg p-4 h-96 overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No messages yet.</p>
            ) : (
              <>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender_email === email ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender_email === email ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground border border-border'}`}>
                      <p className="text-xs font-semibold opacity-75 mb-1">{msg.sender_name}</p>
                      <p>{msg.content}</p>
                      <p className="text-xs opacity-60 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={!connected}
            />
            <Button onClick={handleSendMessage} size="icon" disabled={!connected || !chatMessage.trim()}>
              <Send size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatTab;
