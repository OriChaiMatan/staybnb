import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null }) {
    const [isUploading, setIsUploading] = useState(false)

    // async function uploadImg(ev) {
    //     setIsUploading(true)
    //     const { secure_url, height, width } = await uploadService.uploadImg(ev)
    //     setIsUploading(false)
    //     onUploaded && onUploaded({ imgUrl: secure_url })
    // }

    async function uploadImg(ev) {
        setIsUploading(true);
        try {
            const { secure_url, height, width } = await uploadService.uploadImg(ev)
            setIsUploading(false);
            onUploaded && onUploaded({ imgUrl: secure_url });
        } catch (error) {
            setIsUploading(false);
            console.error('Failed to upload image', error);
        }
    }

    function getUploadLabel() {
        return isUploading ? 'Uploading....' : 'Upload Image'
    }

    return (
        <div className="upload-preview">
            <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" multiple="multiple" />
        </div>
    );
}
