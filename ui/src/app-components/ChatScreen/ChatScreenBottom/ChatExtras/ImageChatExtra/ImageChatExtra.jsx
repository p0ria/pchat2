import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useUploadImages from '../../../../../hooks/useUploadImages';
import { actionSendMessage } from '../../../../../state/chat/chat.actions';
import ImageDrawer from '../../../../chat-drawers/ImageDrawer/ImageDrawer';
import './ImageChatExtra.scss';

export default function ImageChatExtra({ audienceId, activate = () => { }, passedInRef }) {
    const [urls, setUrls] = useState([]);
    const [imageUrls, uploading, setFiles] = useUploadImages();
    const textInputRef = useRef();
    const dispatch = useDispatch();

    const clearFields = () => {
        setFiles(null);
        setUrls([]);
        textInputRef.current.value = null;
    }

    const submit = () => {
        if (audienceId) {
            if (urls && urls.length > 0) {
                const payload = {
                    type: 'IMAGE',
                    value: {
                        urls
                    }
                }
                dispatch(actionSendMessage(audienceId, payload.type, payload.value));

                clearFields();
            }

        }
    }

    useImperativeHandle(passedInRef, () => ({
        clear: () => { clearFields(); },
        submit: () => { submit(); }
    }));

    useEffect(() => {
        if (imageUrls) {
            setUrls([...urls, ...imageUrls]);
        }
    }, [imageUrls])

    useEffect(() => {
        if (urls && urls.length > 0) {
            activate(<ImageDrawer imageUrls={urls} />);
        } else {
            activate(null);
        }
    }, [urls])

    const handleFileUpload = async (files) => {
        if (!files) return;
        setFiles(files);
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
                multiple={true}
                ref={textInputRef}
                onChange={e => handleFileUpload(e.target.files)} />
        </div>
    )
}