import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import Button, { ButtonKind } from '../../components/Button/Button';
import './ProfileModal.scss';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { actionChangeAvatar } from '../../state/app/app.actions';
import Spinner from 'react-spinner';

export default function ProfileModal({ isOpen, onClickAway = () => { }, ...props }) {
    const [avatarUrl, setAvatarUrl] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const dispatcher = useDispatch();

    const handleFileUpload = async (files: FileList | null | undefined) => {
        if (!files) return;
        setIsUploading(true);
        var selectedFile = files[0];
        var fd = new FormData();
        fd.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string);
        fd.append('file', selectedFile);
        try {
            const { status, data } = await axios({
                method: 'post',
                url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                data: fd,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (status == 200) {
                setAvatarUrl(data.url);
            }
            else {
                setAvatarUrl(null);
            }
        } catch (error) {
            console.log(error);
            setAvatarUrl(null);
        } finally {
            setIsUploading(false);
        }
    }
    const handleDragEnter = e => {
        e.stopPropagation();
        e.preventDefault();
    }
    const handleDragOver = e => {
        e.stopPropagation();
        e.preventDefault();
    }
    const handleDrop = e => {
        e.stopPropagation();
        e.preventDefault();

        const files = e.dataTransfer?.files;
        handleFileUpload(files);
    }
    const submitAvatar = () => {
        if (avatarUrl) {
            dispatcher(actionChangeAvatar(avatarUrl));
            setAvatarUrl(null);
            onClickAway();
        }
    }
    return (
        <Modal
            visible={isOpen}
            width="280"
            height="400"
            effect="fadeInUp"
            onClickAway={onClickAway}
            {...props}>
            <div className="ProfileModal">
                <div className="ProfileModal-Header">
                    <span>Change Profile Picture</span>
                </div>
                {
                    isUploading ?
                        <div className="ProfileModal-Spinner"><Spinner /></div>
                        :
                        <>
                            <div className="ProfileModal-Content">
                                <label
                                    htmlFor="avatarInputFile"
                                    onDragEnter={handleDragEnter}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}>
                                    {
                                        avatarUrl ?
                                            <img className="avatar-preview" src={avatarUrl} />
                                            :
                                            <div className="drag-area">
                                                <span>drag & drop</span>
                                                <span>or</span>
                                                <span>browse</span>
                                            </div>
                                    }
                                </label>
                                <input
                                    id="avatarInputFile"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={e => handleFileUpload(e.target.files)} />
                            </div>
                            <div className="ProfileModal-Footer">
                                <Button disabled={!avatarUrl}
                                    kind={ButtonKind.Success}
                                    onClick={submitAvatar}>
                                    ACCEPT
                                </Button>
                            </div>
                        </>
                }

            </div>
        </Modal>)
}