import { useState } from "react"
import axios from 'axios';

export default () => {
    const setFile = async file => {
        if (!file) {
            setUrl(null);
            return;
        }
        setUploading(true);
        var fd = new FormData();
        fd.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        fd.append('file', file);
        try {
            const { status, data } = await axios({
                method: 'post',
                url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                data: fd,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (status == 200) {
                setUrl(data.url);
            }
            else {
                setUrl(null);
            }
        } catch (error) {
            console.log(error);
            setUrl(null);
        } finally {
            setUploading(false);
        }
    }
    const [uploading, setUploading] = useState();
    const [url, setUrl] = useState();

    return [url, uploading, setFile];
}