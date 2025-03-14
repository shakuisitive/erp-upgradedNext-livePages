import { createSlice } from "@reduxjs/toolkit";

const DrawerSlice=createSlice({
name:"DrawerSlice",
initialState:{
    ChatData:[],
    editorData:'',
    postLikes:[],
   
},
reducers:{
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
    }
    
}
});


export const {setChatData,setEditorData,setPostLikes}=DrawerSlice.actions

export default DrawerSlice;