import { TxIMType } from '@/typing';

const { MESSAGE_RESULT_CODE, TIM_EVENT_TYPE } = TxIMType;

/**
 *
 * @class 腾讯IM管理类
 *
 * *******/
let self: any;

class TxIM {
    public userId: string = ''; // im需要的用户id
    public userSig: string = ''; // im需要的用户签名
    public appId: string = ''; // appid
    public tim: any = null; // im对象
    public groupId: string = ''; // 群组id
    public TXTIM: any = null;
    public callback: Function | undefined = undefined;
    constructor(userId: string, userSig: string, appId: string, groupId: string) {
        const win: any = window;
        this.TXTIM = win.TIM;
        this.userId = userId;
        this.userSig = userSig;
        this.appId = appId;
        this.groupId = groupId;
    }
    /** *
     * @method 初始化im
     *
     * ***/
    public init(callback?: Function) {
        self = this;
        self.callback = callback;
        if (self?.tim === null) {
            self.tim = self?.TXTIM.create({ SDKAppID: self?.appId });
            self?.eventListener();
            const promise: any = self?.tim.login({
                userID: self?.userId,
                userSig: self?.userSig,
            });
            promise
                .then(function (imResponse: any) {
                    self?.callback?.({
                        code: MESSAGE_RESULT_CODE.SUCCESS,
                        data: {
                            type: TIM_EVENT_TYPE.IM_LOGIN_SUCCESS,
                            msg: imResponse,
                        },
                    });
                })
                .catch(function (imError: any) {
                    console.log('tim登录失败', imError);
                    self?.callback?.({
                        code: MESSAGE_RESULT_CODE.ERROR,
                        data: {
                            type: TIM_EVENT_TYPE.IM_LOGIN_ERROR,
                            msg: imError,
                        },
                    });
                });
        }
    }

    // 收到消息
    private receivedMessage(event: any) {
        self?.callback?.({
            code: MESSAGE_RESULT_CODE.SUCCESS,
            data: {
                type: TIM_EVENT_TYPE.GET_MESSAGE,
                msg: event,
            },
        });
    }

    // sdk初始化完成
    private imSdkReady(event: any) {
        self?.callback?.({
            code: MESSAGE_RESULT_CODE.SUCCESS,
            data: {
                type: TIM_EVENT_TYPE.SEND_MESSAGE_OK,
                msg: event,
            },
        });
    }

    // 消息撤回
    private messageRevoked(event: any) {
        self?.callback?.({
            code: MESSAGE_RESULT_CODE.SUCCESS,
            data: {
                type: TIM_EVENT_TYPE.MESSAGE_RECALL,
                msg: event,
            },
        });
    }
    // 绘话列表更新
    private conversationListUpdate(event: any) {
        self?.callback?.({
            code: MESSAGE_RESULT_CODE.SUCCESS,
            data: {
                type: TIM_EVENT_TYPE.MESSAGE_UPDATE,
                msg: event,
            },
        });
    }
    // 群组列表更新
    private groupListUpdate(event: any) {
        self?.callback?.({
            code: MESSAGE_RESULT_CODE.SUCCESS,
            data: {
                type: TIM_EVENT_TYPE.GROUP_UPDATE,
                msg: event,
            },
        });
    }
    // 系统消息
    private groupSystemNoticeReceived(event: any) {
        self?.callback?.({
            code: MESSAGE_RESULT_CODE.SUCCESS,
            data: {
                type: TIM_EVENT_TYPE.GROUP_MESSAGE,
                msg: event,
            },
        });
    }
    // 更新信息
    private profileUpdate(event: any) {
        self?.callback?.({
            code: MESSAGE_RESULT_CODE.SUCCESS,
            data: {
                type: TIM_EVENT_TYPE.PROFILE_CHANGE,
                msg: event,
            },
        });
    }
    // 黑名单
    private backlistUpdate(event: any) {
        self?.callback?.({
            code: MESSAGE_RESULT_CODE.SUCCESS,
            data: {
                type: TIM_EVENT_TYPE.BLACK_LIST,
                msg: event,
            },
        });
    }
    // SDK加载错误
    private sdkError(event: any) {
        self?.callback?.({
            code: MESSAGE_RESULT_CODE.SUCCESS,
            data: {
                type: TIM_EVENT_TYPE.SDK_MESSAGE,
                msg: event,
            },
        });
    }
    // SDK未初始化
    private sdkNotReady(event: any) {
        self?.callback?.({
            code: MESSAGE_RESULT_CODE.SUCCESS,
            data: {
                type: TIM_EVENT_TYPE.SDK_NOT_READY,
                msg: event,
            },
        });
    }
    // 断线
    private kickedOut(event: any) {
        self?.callback?.({
            code: MESSAGE_RESULT_CODE.SUCCESS,
            data: {
                type: TIM_EVENT_TYPE.DISCONNECTION,
                msg: event,
            },
        });
    }
    // 事件集合
    private eventListener() {
        self?.tim.setLogLevel(0);
        // this.tim.registerPlugin({ 'cos-wx-sdk': COS });
        // 监听事件，例如：
        self?.onOrOffEvent(true);
    }

    /** ***
     *
     * @method 开启或关闭事件监听
     * @param on:是否开启
     *
     * *****/
    private onOrOffEvent(on: boolean) {
        if (on) {
            self?.tim.on(self?.TXTIM.EVENT.SDK_READY, self?.imSdkReady);
            self?.tim.on(self?.TXTIM.EVENT.MESSAGE_RECEIVED, self?.receivedMessage);
            self?.tim.on(self?.TXTIM.EVENT.MESSAGE_REVOKED, self?.messageRevoked);
            self?.tim.on(self?.TXTIM.EVENT.CONVERSATION_LIST_UPDATED, self?.conversationListUpdate);
            self?.tim.on(self?.TXTIM.EVENT.GROUP_LIST_UPDATED, self?.groupListUpdate);
            self?.tim.on(
                self?.TXTIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED,
                self?.groupSystemNoticeReceived,
            );
            self?.tim.on(self?.TXTIM.EVENT.PROFILE_UPDATED, self?.profileUpdate);
            self?.tim.on(self?.TXTIM.EVENT.BLACKLIST_UPDATED, self?.backlistUpdate);
            self?.tim.on(self?.TXTIM.EVENT.ERROR, self?.sdkError);
            self?.tim.on(self?.TXTIM.EVENT.SDK_NOT_READY, self?.sdkNotReady);
            self?.tim.on(self?.TXTIM.EVENT.KICKED_OUT, self?.kickedOut);
            return;
        }
        self?.tim.off(self?.TXTIM.EVENT.SDK_READY, self?.imSdkReady);
        self?.tim.off(self?.TXTIM.EVENT.MESSAGE_RECEIVED, self?.receivedMessage);
        self?.tim.off(self?.TXTIM.EVENT.MESSAGE_REVOKED, self?.messageRevoked);
        self?.tim.off(self?.TXTIM.EVENT.CONVERSATION_LIST_UPDATED, self?.conversationListUpdate);
        self?.tim.off(self?.TXTIM.EVENT.GROUP_LIST_UPDATED, self?.groupListUpdate);
        self?.tim.off(
            self?.TXTIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED,
            self?.groupSystemNoticeReceived,
        );
        self?.tim.off(self?.TXTIM.EVENT.PROFILE_UPDATED, self?.profileUpdate);
        self?.tim.off(self?.TXTIM.EVENT.BLACKLIST_UPDATED, self?.backlistUpdate);
        self?.tim.off(self?.TXTIM.EVENT.ERROR, self?.sdkError);
        self?.tim.off(self?.TXTIM.EVENT.SDK_NOT_READY, self?.sdkNotReady);
        self?.tim.off(self?.TXTIM.EVENT.KICKED_OUT, self?.kickedOut);
    }

    /** *
     * @method 退出im
     *
     * ***/
    public logoutIm() {
        self?.onOrOffEvent(false);
        self?.logoutGroup(() => {
            const promise: Promise<any> = this.tim.logout();
            promise
                ?.then(function () {
                    console.log('im logout success!');
                })
                ?.catch(function () {
                    console.log('im logout fail!');
                });
        });
    }

    private async logoutGroup(callback?: Function) {
        await self?.tim.quitGroup(self?.groupId);
        callback?.();
    }

    /** *
     * @method 更新用户资料
     *
     * ****/
    public updateProfile(nickname?: string, avatar?: string, callback?: Function) {
        const promise: Promise<any> = self?.tim.updateMyProfile({
            nick: nickname,
            avatar: avatar,
            gender: self?.TXTIM.TYPES.GENDER_UNKNOWN,
            allowType: self?.TXTIM.TYPES.ALLOW_TYPE_ALLOW_ANY,
        });
        promise
            .then((imResponse: any) => {
                callback?.({
                    code: MESSAGE_RESULT_CODE.SUCCESS,
                    data: imResponse,
                });
            })
            .catch((error: any) => {
                callback?.({
                    code: MESSAGE_RESULT_CODE.ERROR,
                    data: error,
                });
            });
    }

    /** **
     * @method 加入房间
     *
     * ***/
    public joinGroup(callback?: Function) {
        const promise: Promise<any> = self?.tim.joinGroup({
            groupID: self?.groupId,
        });
        promise
            .then(function (imResponse) {
                switch (imResponse.data.status) {
                    case self?.TXTIM.TYPES.JOIN_STATUS_WAIT_APPROVAL:
                        // 等待管理员同意
                        callback?.({
                            code: MESSAGE_RESULT_CODE.SUCCESS,
                            data: TIM_EVENT_TYPE.WAITING_APPROVAL,
                        });
                        break;
                    case self?.TXTIM.TYPES.JOIN_STATUS_SUCCESS:
                        // 加群成功
                        callback?.({
                            code: MESSAGE_RESULT_CODE.SUCCESS,
                            data: TIM_EVENT_TYPE.JOIN_GROUP_SUCCESS,
                        });
                        break;
                    case self?.TXTIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP:
                        // 已经在群中
                        callback?.({
                            code: MESSAGE_RESULT_CODE.ERROR,
                            data: TIM_EVENT_TYPE.APPLICATION_IN_PROGRESS,
                        });
                        break;
                }
            })
            .catch((error: any) => {
                callback?.({ code: MESSAGE_RESULT_CODE.ERROR, data: error });
            });
    }

    /** **
     * @method 发送自定义消息
     * @param txt:发送的消息
     * @param callback?:发送完成回调
     * *****/
    public sendMessage(txt: string, callback?: Function) {
        const message: any = self?.tim.createCustomMessage({
            to: self?.groupId,
            conversationType: self?.TXTIM.TYPES.CONV_GROUP,
            payload: {
                data: txt,
            },
        });
        console.log(message);
        const promise: Promise<any> = self?.tim.sendMessage(message);
        promise
            .then(() => callback?.({ code: MESSAGE_RESULT_CODE.SUCCESS, data: txt }))
            .catch((error: any) => callback?.({ code: MESSAGE_RESULT_CODE.ERROR, data: error }));
    }
    /** **
     * @method 获取历史记录
     * @param count:消息条数
     *
     * ****/
    public getMessageHistory(count: number, callback?: Function) {
        self?.tim
            .getMessageList({
                conversationID: 'GROUP'.concat(self?.groupId),
                count,
            })
            .then(function (imResponse: any) {
                callback?.({
                    code: MESSAGE_RESULT_CODE.SUCCESS,
                    data: imResponse?.data?.messageList,
                });
            })
            .catch((error: any) => {
                callback?.({
                    code: MESSAGE_RESULT_CODE.ERROR,
                    data: error,
                });
            });
    }
}

export default TxIM;
