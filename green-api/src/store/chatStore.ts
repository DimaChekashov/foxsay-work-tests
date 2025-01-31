import { create } from "zustand";

const useChatStore = create(() => ({
    chats: [1, 2, 3],
}));

export default useChatStore;