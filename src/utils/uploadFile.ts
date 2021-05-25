
import Request from '@/request/Request';
interface UploadFileType{
    file:File,
    OSSAccessKeyId:string,
    policy:string,
    Signature:string,
    key:string,
    url:string
}
async function uploadFile(params:UploadFileType): Promise<any> {
    let formData: FormData = new FormData();
    formData.append('OSSAccessKeyId', params?.OSSAccessKeyId);
    formData.append('policy', params?.policy);
    formData.append('Signature', params?.Signature);
    formData.append('key', params?.key);
    formData.append('file', params?.file);
    return await new Request({
        api: params?.url,
        method: 'post',
        dataType: '',
        requestType:'file',
        data: formData,
        useCustomHeader: false,
    }).fetch();
}
export default uploadFile;