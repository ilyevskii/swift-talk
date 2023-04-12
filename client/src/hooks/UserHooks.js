import {useQuery} from "react-query";
import {UserRepository} from "messanger-serializer";

const userRepo = new UserRepository("http://localhost:3001")

export const useUserChats = (user_id) => {

    const { data, isLoading, isError, error, refetch } = useQuery(['user_chats', user_id],
        async () => {
            return await userRepo.getAllUserChats(user_id);
        }
    );

    return {
        user_chats: data,
        isChatsLoading: isLoading,
        isChatError: isError,
        chat_error: error,
        refresh_chats: refetch
    }
}

export const useUserContacts = (user_id) => {

    const { data, isLoading, isError, error, refetch } = useQuery(['user_contacts', user_id],
        async () => {
            return await userRepo.getAllUserContacts(user_id);
        }
    );

    return {
        user_contacts: data,
        isContactsLoading: isLoading,
        isContactsError: isError,
        contacts_error: error,
        refresh_contacts: refetch
    }
}