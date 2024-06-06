import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ id, onUploaded = null }) {
    const [imgData, setImgData] = useState({
        imgUrl: null,
    })
    const [isUploading, setIsUploading] = useState(false)

    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        setImgData({ imgUrl: secure_url, width, height })
        setIsUploading(false)
        onUploaded && onUploaded(id, secure_url)
    }

    function getUploadLabel() {
        if (imgData.imgUrl) return 'Edit Image'
        return isUploading ? 'Uploading....' : 'Upload Image'
    }

    return (
        <section className="upload-preview">
            <label className="upload-label" htmlFor={`imgUpload-${id}`}>{getUploadLabel()}</label>
            <input className='file-upload' type="file" onChange={uploadImg} accept="image/*" id={`imgUpload-${id}`} />
            {imgData.imgUrl && <img src={imgData.imgUrl} />}
        </section>
    )
}
