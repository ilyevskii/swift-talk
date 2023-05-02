import {useSelector, useDispatch} from "react-redux";
import {RootState, updateGroupImage, updateProfileImage} from "../../store/reducers/index";
import {Dispatch} from "react";
import {AnyAction} from "redux";

interface imageUploaderHook {
    profile_image: File | null;
    group_image: File | null;
    setProfileImage: (file: File | null) => void;
    setGroupImage: (file: File | null) => void;
}

export function useImageUploader(): imageUploaderHook {

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const profile_image: File | null = useSelector((state: RootState) => state.image_uploader.profile_image);
    const group_image: File | null = useSelector((state: RootState) => state.image_uploader.group_image);

    const setProfileImage = (file: File | null): void => {
        dispatch(updateProfileImage(file));
    }

    const setGroupImage = (file: File | null): void => {
        dispatch(updateGroupImage(file));
    }

    return {
        profile_image,
        group_image,
        setGroupImage,
        setProfileImage
    };
}
