import Request from '@/request/Request';
interface UploadFileType {
    file: File;
    OSSAccessKeyId: string;
    policy: string;
    Signature: string;
    key: string;
    url: string;
}
/**
 *
 * @method 上传文件到阿里云
 * @param params:{UploadFileType}:上传文件的参数配置
 *
 * ********/
async function uploadFile(params: UploadFileType): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('OSSAccessKeyId', params?.OSSAccessKeyId);
    formData.append('policy', params?.policy);
    formData.append('Signature', params?.Signature);
    formData.append('key', params?.key);
    formData.append('file', params?.file);
    return await new Request({
        api: params?.url,
        method: 'post',
        dataType: '',
        requestType: 'file',
        data: formData,
        useCustomHeader: false
    }).fetch();
}
export default uploadFile;
