import React, { useEffect, useRef, useState } from 'react';
import useUploadImage from '../../../../../hooks/useUploadImage';
import ImageDrawer from '../../../../chat-drawers/ImageDrawer/ImageDrawer';
import './ImageChatExtra.scss';

export default function ImageChatExtra({ audienceId, activate = () => { }, submit, onSubmitted = () => { } }) {
    const [urls, setUrls] = useState([]);
    const [url, uploading, setFile] = useUploadImage();
    const ref = useRef();

    useEffect(() => {
        if (url) {
            setUrls([...urls, url]);
        }
    }, [url])

    useEffect(() => {
        if (urls && urls.length > 0) {
            activate(<ImageDrawer imageUrls={urls} />);
        } else {
            activate(null);
        }
    }, [urls])

    useEffect(() => {
        if (submit) {
            alert(urls);

            setFile(null);
            ref.current.value = null;
            setUrls(null);
            onSubmitted();
        }
    }, [submit])

    const handleFileUpload = async (files) => {
        if (!files) return;
        var selectedFile = files[0];
        setFile(selectedFile);
    }

    return (
        <div className="ImageChatExtra">
            <label
                htmlFor="imageInputFile"
                className="material-icons">
                attach_file
            </label>
            <input
                id="imageInputFile"
                type="file"
                accept="image/png, image/jpeg"
                ref={ref}
                onChange={e => handleFileUpload(e.target.files)} />
        </div>
    )
}