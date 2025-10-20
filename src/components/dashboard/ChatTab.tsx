import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Group } from '@/app_types';

interface ChatTabProps {
  group: Group;
  currentUser: string;
  chatMessage: string;
  setChatMessage: (message: string) => void;
  onSendMessage: () => void;
}

const ChatTab: React.FC<ChatTabProps> = ({
  group,
  currentUser,
  chatMessage,
  setChatMessage,
  onSendMessage,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Group Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-secondary rounded-lg p-4 h-96 overflow-y-auto space-y-3">
            {group.messages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No messages yet. Start the conversation!
              </p>
            ) : (
              group.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.author === currentUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.author === currentUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-xs font-semibold opacity-75 mb-1">
                      {msg.author}
                    </p>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            />
            <Button
              onClick={onSendMessage}
              size="icon"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatTab;