export default {
    userInfo: undefined,
    alertFlag: false,
    alertType: '',
    alertMsg: '',
    routerName: '',
    notice: {
        type: 'success',
        msg: ''
    },
    toastFlag: false,
    toast: {
        color: '',
        msg: ''
    },
    loadingFlag: false,
    loading: {
        query: false,
        color: '',
        value: 0
    },
    pathItems: [],
    modalFlag: false,
    modal: {
        title: '',
        content: '',
        ok:{},
        cancel:{},
        callback: ()=>{}
    },
}
