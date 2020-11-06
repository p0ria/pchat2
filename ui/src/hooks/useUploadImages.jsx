import { useState } from "react"
import axios from 'axios';

export default () => {
    const setFiles = async files => {
        if (!files || files.length == 0) {
            setUrls([]);
            return;
        }
        setUploading(true);
        try {
            let promises = [];
            for (let i = 0; i < files.length; i++)
                promises.push(uploadFile(files.item(i)));
            const imageUrls = await Promise.all(promises);
            setUrls(imageUrls);
        } catch (error) {
            console.log(error);
            setUrls([]);
        } finally {
            setUploading(false);
        }
    }
    const [uploading, setUploading] = useState();
    const [urls, setUrls] = useState([]);

    return [urls, uploading, setFiles];
}

const uploadFile = async file => {
    var fd = new FormData();
    fd.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    fd.append('file', file);
    const { status, data } = await axios({
        method: 'post',
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        data: fd,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (status == 200) {
        return data.url;
    }
    else {
        return null;
    }
}

