export declare namespace Toast {
    const PositionType: ['bottom', 'center', 'top'];

    export type FontType = {
        maxWidth: number; //最大宽度
        designWidth: number; //设计尺寸
        fontSize: number; //基数字体大小
    };

    export type OtherParams = {
        position?: typeof PositionType[number]; //显示位置
        fontSizeType?: FontType; //字体配置
        style?: any;
        keepTime?: number; //保持时间，单位毫秒
    };

    export type ToastFuncType = (text: string, other?: Toast.OtherParams) => any;
}

export declare namespace TxIMType {
    export enum MESSAGE_RESULT_CODE {
        SUCCESS = 200,
        ERROR = 400,
    }

    export enum TIM_EVENT_TYPE {
        SEND_MESSAGE_OK = 'send_message_ok', // 可以发送消息了
        GET_MESSAGE = 'get_message', // 获取到消息
        MESSAGE_RECALL = 'message_recall', // 消息被撤回
        MESSAGE_UPDATE = 'message_update', // 消息更新
        GROUP_UPDATE = 'group_update', // 群组更新
        GROUP_MESSAGE = 'group_message', // 群组消息
        PROFILE_CHANGE = 'profile_change', // 资料更新
        BLACK_LIST = 'black_list', // 黑名单
        SDK_MESSAGE = 'sdk_message', // sdk消息
        DISCONNECTION = 'disconnection', // 断开链接，包括被踢出房间等
        IM_LOGIN_SUCCESS = 'im_login_success', // im登录成功
        IM_LOGIN_ERROR = 'im_login_error', // im登录失败
        SDK_NOT_READY = 'sdk_not_ready', // 初始化成功
        WAITING_APPROVAL = 'waiting for administrator‘s approval', // 等待管理员同意
        JOIN_GROUP_SUCCESS = 'join group success', // 加入群组成功,
        APPLICATION_IN_PROGRESS = 'application in progress',
    }

    export type RESULT_TYPE = {
        code: number;
        data: DATA_TYPE;
    };

    type DATA_TYPE = {
        type: string;
        msg: any;
    };
}

export declare namespace FixedHooksType {
    type BoundingType = {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
        x: number;
        y: number;
        [key: string]: number;
    };

    export type IntersectionObserverEntryType = {
        boundingClientRect: BoundingType;
        intersectionRatio: number;
        intersectionRect: BoundingType;
        isIntersecting: boolean;
        rootBounds: BoundingType;
        target: Element;
        time: number;
        key: string;
        parentRect?: DOMRect;
    };

    type StatusType = {
        [key: string]: boolean;
    };

    export type UniqueType = {
        callback?: (io: IntersectionObserverEntryType) => void;
        key: string;
        el: Element;
        parent?: Element;
    };

    type IoRefType<T> = {
        io: IntersectionObserverType | null;
        params: T | null;
    };

    type IntersectionObserverType = {
        observe: (target: Element) => void;
        unobserve: (target: Element) => void;
        disconnect: () => void;
        getTargets: () => IntersectionObserverEntryType[];
        POLL_INTERVAL: number;
    };
}

export declare const ResolveType: (value: string) => void;
