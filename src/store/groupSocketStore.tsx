import {create} from 'zustand';

interface GroupSocketState {
  sockets: { [groupId: number]: WebSocket | null };
  setSocket: (groupId: number, ws: WebSocket | null) => void;
  closeSocket: (groupId: number) => void;
}

export const useGroupSocket = create<GroupSocketState>((set, get) => ({
  sockets: {},
  setSocket: (groupId, ws) =>
    set((state) => ({ sockets: { ...state.sockets, [groupId]: ws } })),
  closeSocket: (groupId) => {
    const ws = get().sockets[groupId];
    if (ws) ws.close();
    set((state) => ({ sockets: { ...state.sockets, [groupId]: null } }));
  },
}));
