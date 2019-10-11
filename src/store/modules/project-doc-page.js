import api from '@/api';
import {stringIsEmpty} from "@/utils";

export default {
    namespaced: true,
    state: {
        docList: [],
        editable: false,
        fileId: ''
    },
    actions:{
        loadProjectDocList({commit},projectId){
            api.projectDoc.getProjectDocCatalog(projectId, docs=>{
                if(docs){
                    commit('updateDocList',docs);
                    commit('updateDocEditable',docs.length === 0);
                    if(docs.length > 0){
                        let doc = docs.filter(item=>{
                            return item.is_home;
                        });
                        commit('updateCurrentFileId',doc[0].id);
                    }
                }
            });
        },
    },
    mutations: {
        updateDocEditable(state, editable){
            state.editable = editable;
        },
        updateDocList(state, docsList){
            state.docList = docsList;
        },
        updateCurrentFileId(state, fileId){
            state.fileId = fileId;
        }
    },
    getters:{
        getDocEditable(state){
            return state.editable
        },
        getFileId(state){
            return state.fileId;
        },
        getCatalog(state){
            let childLogs = state.docList.filter(item=>{
                return !stringIsEmpty(item.doc_name);
            });
            let docMap = childLogs.map(item=>item.doc_name);
            let logs = state.docList.filter(item=>{
                return stringIsEmpty(item.doc_name);
            });
            docMap.forEach(title=>{
                logs.push(
                    {
                        file_name: title,
                        dic: true,
                        children: childLogs.filter(item=>{
                            return item.doc_name = title;
                        })
                    }
                )
            });
            return logs;
        }
    }
}