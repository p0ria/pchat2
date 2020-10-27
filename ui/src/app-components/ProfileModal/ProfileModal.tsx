import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import Button, { ButtonKind } from '../../components/Button/Button';
import './ProfileModal.scss';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { actionChangeAvatar } from '../../state/app/app.actions';

export default function ProfileModal({ isOpen, onClickAway = () => { }, ...props }) {
    const [avatarUrl, setAvatarUrl] = useState();
    const dispatcher = useDispatch();

    const handleFileUpload = async (files: FileList | null | undefined) => {
        if (!files) return;
        var selectedFile = files[0];
        var fd = new FormData();
        fd.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string);
        fd.append('file', selectedFile);
        axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            data: fd,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function ({ status, data }) {
                //handle success
                if (status == 200) {
                    setAvatarUrl(data.url);
                }
                else {
                    setAvatarUrl(null);
                }
            })
            .catch(function (response) {
                //handle error
                setAvatarUrl(null);
                console.log(response);
            });
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
                    <Button
                        kind={ButtonKind.Success}
                        onClick={submitAvatar}>
                        ACCEPT
                    </Button>
                </div>
            </div>
        </Modal>)
}