export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>(resolve => {
        var reader = new FileReader();
        reader.onload = function (e: any) {
            var comma = e.target.result.indexOf(',');
            var base64 = e.target.result.substr(comma + 1);
            resolve(base64);
        }
        reader.readAsDataURL(file);
    });
}