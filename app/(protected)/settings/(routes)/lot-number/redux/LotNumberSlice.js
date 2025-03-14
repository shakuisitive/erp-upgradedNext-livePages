
import { createSlice } from "@reduxjs/toolkit";

let taxSlice=createSlice({
    name:"taxSlice",
    initialState: {

        //search start
        searchedData:[],
        isHitApi:false,
        //end search 

        //right drawer
        // username:localStorage.getItem("username"),
        // user_ID:localStorage.getItem("use_id"),
        // token:localStorage.getItem("tokenSession"),
        ChatData:[],
        editorData:'',
        postLikes:[],
        files:[],
        //end right drawer
        pageCount:25,
        tax:false,
        index:[],
        closeModall: false,
        count:0,
        countArray:[],
        formIndex:[],
        openModallForm:false,
        taxHead:[],
        taxMainGrid:[],
        isObjectEqual:true,
        formPayload:[],
        Refresh:false,
        enabled:true,
        refArray:[],
        defHead:[] ,
        nextFocus:null,
        inputData:[]
        

        //
       
        
    },
    reducers: {
      setInputData(state,action){
        state.inputData = action.payload
      },
        setFormPayload(state,action){
            state.formPayload=action.payload;
        },
        setObjectEqual(state,action){
            state.isObjectEqual=action.payload;
        },
        setIsHitApi(state,action){
            state.isHitApi=action.payload;
            state.searchedData=[]
          },
          setSearchData(state,action){
            state.searchedData[0]=action.payload;
      
          },
          //rightDrawer actions
          setChatData(state,action){
            state.ChatData.push(action.payload);
        },
        setEditorData(state,action){
      
            state.editorData=action.payload;
        },
        setPostLikes(state,action){
            const { postId, userId } = action.payload;
      
            const postIndex = state.ChatData.findIndex(post => post.id === postId);
            console.log(postIndex)
            if (postIndex !== -1) {
              const post = state.ChatData[postIndex];
              
              if (!post.likedBy.includes(userId)) {
                state.ChatData[postIndex] = {
                  ...post,
                  likes: post.likes + 1,
                  likedBy: [...post.likedBy, userId]
                };
              }else{
                console.log('user already included')
              }
            }else{
                console.log("not");
            }
        },
        addFile(state,action){
          state.files.push(action.payload);
      },

      setHeadRedux(state , action){
        state.taxHead = action.payload
        state.defHead = action.payload
      },
      setEditHead(state , action){
        if(state.taxHead[action.payload].hidden  == false){
          state.taxHead[action.payload].hidden = true
  
        }else if (state.taxHead[action.payload].hidden  == true){
          state.taxHead[action.payload].hidden = false
  
        }
      } , 


        settax(state,action){
            state.tax = action.payload;
        },
        setIndex(state,action){

            state.count+=1;
            state.countArray.push(state.count);
            if (!state.index.includes(action.payload)) {
                state.index.push(action.payload); // Add the unique index to the state
              }
            
            
        },
        setcloseModall(state, action) {
            state.closeModall = action.payload;
           
           
          },
          openForm(state, action) {
            state.formIndex = action.payload;
            state.openModallForm = true,
            state.enabled=true
            // console.log("modall open redux", action.payload);
          } , 
          setHeadReduxT(state , action){
            if( action.payload.cat == true){
              state.taxHead[action.payload.index].def = true
              state.taxHead[action.payload.index].title = action.payload.hData
            } else if(action.payload.cat == false){
              state.taxHead[action.payload.index].def = false
              state.taxHead[action.payload.index].title = state.defHead[action.payload.index].title
            }
           
          },
          setRefresh(state, action) {
            state.Refresh = action.payload;
          },
          setMainTaxList(state , action){
            state.taxMainGrid = action.payload
            },
            closeModallForm(state , action){
                state.openModallForm = false
               
          
                // console.log('set reset chulling ' , state.openModallForm  );
              },
        OpenNewModalForm(state,action){
                state.openModallForm = true
                state.enabled=false;
        },
        
        addRef(state,action){

            state.refArray.push(action.payload);
        },
        setNextIndex(state,action){
          
          state.nextFocus=action.payload;
      },setPageCount(state ,action){
        state.pageCount = action.payload
      }
    }
})

export const {
  setPageCount,
    addRef,
    setNextIndex,
    closeModallForm,
    settax,
    setIndex,
    setcloseModall,
    openForm,
    addFile,
    setIsHitApi,
    setSearchData,
    setChatData,
    setEditorData,
    setPostLikes,
    setEditHead,
    setHeadRedux,
    setHeadReduxT,
    setRefresh,
    setFormPayload,
    setObjectEqual,
    OpenNewModalForm,
    setMainTaxList,
    setInputData
    

}=taxSlice.actions;

export default taxSlice