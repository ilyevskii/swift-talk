import {useQuery} from "react-query";
import {ChatRepository} from "messanger-serializer";

const chatRepo = new ChatRepository("http://localhost:3001")

export const useChatMessages = (chat_id) => {

    const { data, isLoading, isError, error, refetch } = useQuery(['chat_messages', chat_id],
        async () => {
            return await chatRepo.getChatMessages(chat_id);
        }
    );

    return {
        chat_messages: data,
        isMessagesLoading: isLoading,
        isMessagesError: isError,
        messages_error: error,
        refresh_messages: refetch
    }
}

export const useChatInfo = (user_id, chat_id) => {

    const { data, isLoading, isError, error, refetch } = useQuery(['chat_info', user_id, chat_id],
        async () => {
            return await chatRepo.getChatInfo(user_id, chat_id);
        }
    );

    return {
        chat_info: data,
        isChatInfoLoading: isLoading,
        isChatInfoError: isError,
        chat_info_error: error,
        refresh_chat_info: refetch
    }
}
