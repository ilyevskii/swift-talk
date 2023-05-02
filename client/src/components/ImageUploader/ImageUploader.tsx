import React, { useState } from 'react';
import {useImageUploader} from "../../hooks";

interface ImageUploaderProps {
    type: string
}
export function ImageUploader({type}: ImageUploaderProps): JSX.Element {

    const {setProfileImage, setGroupImage} = useImageUploader();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file: File = event.target.files[0];

            if (type == "profile") setProfileImage(file);
            else setGroupImage(file);

            const formData: FormData = new FormData();
            formData.append('file', file);
            // отправка запроса на сервер
        }
    };

    return (
        <input className="image-uploader" type="file" accept="image/*" onChange={handleImageChange} />
    );
}
