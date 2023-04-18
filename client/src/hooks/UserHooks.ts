import {useQuery} from "react-query";
import {ChatDTO} from "repositories";
import {UserRepository, ContactDTO} from "repositories";

const userRepo: UserRepository = new UserRepository("http://localhost:3001");

export const useUserChats = (user_id: string) => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<ChatDTO[], Error>(["user_chats", user_id], async (): Promise<any[]> => {
            return await userRepo.getAllUserChats(user_id);
        }
    );

    return {
        user_chats: data,
        isChatsLoading: isLoading,
        isChatError: isError,
        chat_error: error,
        refresh_chats: refetch,
    };
};

export const useUserContacts = (user_id: string) => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<ContactDTO[], Error>(["user_contacts", user_id], async (): Promise<ContactDTO[]> => {
            return (await userRepo.getAllUserContacts(user_id)) as ContactDTO[];
        }
    );

    return {
        user_contacts: data,
        isContactsLoading: isLoading,
        isContactsError: isError,
        contacts_error: error,
        refresh_contacts: refetch,
    };
};
