import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageUploaderState {
    profile_image: File | null;
    group_image: File | null;
}

const initialState: ImageUploaderState = {
    profile_image: null,
    group_image: null
};

const imageUploaderReducer = createSlice({
    name: "image_uploader",
    initialState,
    reducers: {
        updateProfileImage: (state, action: PayloadAction<File|null>): void => {
            state.profile_image = action.payload;
        },
        updateGroupImage: (state, action: PayloadAction<File|null>): void => {
            state.group_image = action.payload;
        },
    }
});

export const {updateGroupImage, updateProfileImage} = imageUploaderReducer.actions;

export default imageUploaderReducer.reducer;
