import React , {useState} from 'react'

import { GrAttachment } from 'react-icons/gr';
import { FiAtSign } from 'react-icons/fi';
import { MdAccessTime } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { PiDotsThreeBold } from 'react-icons/pi';
import { BsReply } from 'react-icons/bs';
// import LikeReactionButton from "../../../../../../components/misc/rightdrawer/LikeReactionButton"


import { useDispatch, useSelector } from "react-redux";
import {setChatData,setPostLikes} from '../_redux/paymentTermSlice';

import {getCurrentDateTime,timeAgo} from'../../../../../../components/misc/pureComponents/rightdrawer/Functions';
import QuillEditor from '../../../../../../components/misc//pureComponents/editor/QuillEditor';
import { Message } from '../../../../../../components/misc/pureComponents/rightdrawer/Message';

const ConversationTab = ({data}) => {
  
      const [inputAnim,setInputAnim] = useState(false);
  const [isEditor,setIsEditor] = useState(false);
  const [isReply , setIsReply] = useState(false)

   function editorHandler(html,text){
  //console.log(html,text)
  }
  //conversation
  let data1=useSelector((state)=>state.paymentTerm.editorData); 
  let chatData=useSelector((state)=>state.paymentTerm.ChatData);

  let po_number=data?.PAYTER_ID
  let newData=chatData.filter(item=>item.po_number==po_number).sort((a, b) => b.id - a.id);

console.log(newData);

  let username=useSelector((state)=>state.paymentTerm.username); 
  let userId=useSelector((state)=>state.paymentTerm.user_ID); 
 
  
  let dispatch=useDispatch();
  let updateHandler=()=>{
    let payload={
      id:Date.now(),
      po_number:po_number,
      username:username,
      message:data1,
      date:getCurrentDateTime(),
      likes:0,
      likedBy:[]
    }
    dispatch(setChatData(payload));
    setIsEditor(false);

  }

  const likeHandler=(id)=>{
    //console.log("like")

   let payload={
    postId:id,
    userId:userId
   }

   dispatch(setPostLikes(payload));

  }

//console.log(newData)



  return (
     <div className="flex flex-col gap-10  bg-white overflow-auto  h-[85vh]  ">
                        {isEditor?"":<div onMouseDown={()=>setInputAnim(true)}
                        onMouseUp={() => setInputAnim(false)}
                        onClick={()=>setIsEditor(true)}
                        className="flex items-center justify-center w-full h-[45px]"
                        >
                        <div style={{width:inputAnim?"95%":"100%",height:inputAnim?"95%":"100%"}} className="text-[16px] px-[20px] hover:bg-[#6768791a] cursor-pointer  py-[10px] border border-[#0073ea] rounded-[8px] mt-[30px] text-customblack">Write an update...</div>
                        </div>}
                        {isEditor&& <div className="mt-[20px] flex flex-col gap-1">
                          
                          <QuillEditor
                           toolid={"drawerHome"}
                           func={editorHandler}
                           
                          />
                          <div className="flex items-center justify-between"> 
                            <div className="flex">
                            <button className="flex items-center rounded-[4px] hover:bg-customHover  text-[14px] py-[5px] px-[14px] text-customblack  gap-2 ">
                              <GrAttachment className="text-customIcon text-[14px]"/>
                              Add files 
                            </button>
                            <button className="flex items-center rounded-[4px] hover:bg-customHover text-[14px] py-[5px] px-[14px] text-customblack ">
                              GIF
                            </button>
                            <button className="flex items-center rounded-[4px] hover:bg-customHover text-[14px] py-[5px] px-[14px] text-customblack  gap-2 ">
                              <FiAtSign className="text-customIcon text-[14px]"/>
                              Mention
                            </button>
                          </div>
                          <button onClick={
                            updateHandler} className="bg-[#0073ea] focus:bg-[#3b79bb] text-white px-2 p-1 rounded-[4px]">
                            Update
                          </button>
                          </div>
                        </div> }
                        {
                       newData &&   newData.map((data,index)=>( <div key={index} className="border rounded-[8px] ">
                          <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-white text-[20px] font-semibold flex items-center justify-center bg-yellow-500 w-[40px] h-[40px] rounded-full">
                             {data.username?.charAt(0).toUpperCase()}
                            </div>
                            <div className="gap-1 flex items-center">
                            <p className="text-[18px]" >{data.username}</p>
                            <div className="w-[7px] h-[7px] rounded-full bg-green-600"></div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-customblack">
                            <div className="flex gap-1 items-center">
                              <MdAccessTime className="text-[16px] text-customIcon"/>
                             {timeAgo(data.date)}
                            </div>
                            <div>
                              <IoMdNotificationsOutline className="text-[16px] text-customIcon"/>

                            </div>
                            <div>
                              <PiDotsThreeBold className="text-[16px] text-customIcon" />
                            </div>
                          </div>
                          </div>
                          <p className="p-3 min-h-[80px]"><Message string={data.message}/></p>
                          <div className="h-[40px] flex border-t border-[#bac5f1]">
                            <button className="flex items-center flex-[0.5] border-r border-[#d0d4e4] justify-center gap-1">
                           {data.likes==0?'':data.likes}
                              <img src="/icons/thumbs-up.png" className="w-[14px] h-[14px]" alt="thumbs up image" />
                              <p className="text-[16px]" onClick={()=>likeHandler(data.id)}>
                                {data.likes==1 || data.likes==0?'Like':'Likes'}
                              </p>
                              </button>
                              <button onClick={() => setIsReply(true)} className="flex items-center gap-1 justify-center flex-[0.5] ">
                               <div>
                                <BsReply className="text-customIcon text-[18px]"/>
                                {/* <LikeReactionButton/> */}
                               </div>
                               <p className="text-[16px]">Reply</p>
                               
                              </button>
                              
                              
                              
                              
                              
                          </div>
                        </div>))
                        }
                        

                                
                              
                      </div>
  )
}

export default ConversationTab
