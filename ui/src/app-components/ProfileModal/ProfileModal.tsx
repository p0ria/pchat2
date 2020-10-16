import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import Button, { ButtonKind } from '../../components/Button/Button';
import './ProfileModal.scss';
import axios from "axios";

export default function ProfileModal({ isOpen, onClickAway = () => { }, ...props }) {
    const handleFileUpload = async (files: FileList | null | undefined) => {
        if (!files) return;
        var selectedFile = files[0];
        var fd = new FormData();
        debugger;
        var x = process.env;
        fd.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string);
        fd.append('file', selectedFile);
        axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            data: fd,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
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
    return (
        <Modal
            visible={isOpen}
            width="400"
            height="400"
            effect="fadeInUp"
            onClickAway={onClickAway}
            {...props}>
            <div className="ProfileModal">
                <div className="ProfileModal-Header">
                    <span>Choose Avatar</span>
                </div>
                <div className="ProfileModal-Content">
                    <label
                        htmlFor="avatarInputFile"
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}>
                        <div className="drag-area">
                            <span>drag & drop</span>
                            <span>or</span>
                            <span>browse</span>
                        </div>
                    </label>
                    <input
                        id="avatarInputFile"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={e => handleFileUpload(e.target.files)} />
                </div>
                <div className="ProfileModal-Footer">
                    <Button kind={ButtonKind.Success}>Accept</Button>
                </div>
            </div>
        </Modal>)
}