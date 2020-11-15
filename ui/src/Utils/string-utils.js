export const blobToBase64 = blob => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = e => {
                var comma = e.target.result.indexOf(',');
                var base64 = e.target.result.substr(comma + 1);
                try {
                    var typeIndex = e.target.result.lastIndexOf(';');
                    var type = e.target.result.substring(0, typeIndex);
                    resolve({ base64, type });
                } catch (err) {
                    resolve({ base64 });
                }
            }
        } catch (err) {
            reject(`Error in converting blob to base64 string, ${err}`);
        }
    })
}

export const b64ToBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}