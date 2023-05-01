import {useSelector, useDispatch} from "react-redux";
import {RootState, NewMember, updateNewMembers} from "../../store/reducers/index";
import {Dispatch} from "react";
import {AnyAction} from "redux";

interface groupListHook {
    newMembers: NewMember[];
    setNewMember: (member: NewMember) => void;
    removeNewMember: (member: NewMember) => void;
    findNewMember: (member: NewMember) => boolean;
}

export function useGroupChat(): groupListHook {

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const newMembers: NewMember[] = useSelector((state: RootState) => state.group_chat.newMembers);

    const setNewMember = (member: NewMember): void => {
        dispatch(updateNewMembers([...newMembers, member]))
    }

    const removeNewMember = (member: NewMember): void => {
        dispatch(updateNewMembers(newMembers.filter((mem: NewMember) => mem.id !== member.id)));
    }

    const findNewMember = (member: NewMember): boolean => {
        const obj: NewMember | undefined = newMembers.find((mem: NewMember) => mem.id === member.id);
        return !!obj;
    }


    return {
        newMembers,
        setNewMember,
        removeNewMember,
        findNewMember
    };
}
