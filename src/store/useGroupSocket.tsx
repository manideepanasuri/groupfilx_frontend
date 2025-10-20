import { useEffect } from 'react';
import { useGroupSocket } from './groupSocketStore';

export const useInitGroupSocket = (groupId: number, token: string) => {
  const setSocket = useGroupSocket((state) => state.setSocket);
  const closeSocket = useGroupSocket((state) => state.closeSocket);

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${groupId}/?token=${token}`);
    setSocket(groupId, ws);

    return () => {
      ws.close();
      closeSocket(groupId);
    };
  }, [groupId, token, setSocket, closeSocket]);
};
