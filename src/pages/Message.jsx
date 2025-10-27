import React, { useEffect, useState } from 'react'
import Sidebar from '../componetes/message/Sidebar'
import { useSelector } from 'react-redux'
import { push, ref, set, getDatabase, onValue } from 'firebase/database'
import moment from 'moment/moment'
const Message = () => {
     let [msg, setMsg] = useState('')
     let [msgList, setMsgList] = useState([])
     let db = getDatabase()
     let selecteduser = useSelector((state) => state.selectedUser.value)
     let user = useSelector((state) => state.userInfo.value);


     let handleMsgText = (e) => {
          setMsg(e.target.value)
     }

     let handleSendMsg = (e) => {
          set(push(ref(db, "msglist/")), {
               sendername: user.displayName,
               senderid: user.uid,
               senderemail: user.email,
               recivername: selecteduser.name,
               reciveremail: selecteduser.email,
               reciverid: selecteduser.id,
               msg: msg,
               time: `${new Date().getFullYear()} -${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getHours()} - ${new Date().getMinutes()} - ${new Date().getSeconds()} `
          })
     }


     useEffect(() => {
          const msgRef = ref(db, "msglist/");
          onValue(msgRef, (snapshot) => {
               let array = [];
               snapshot.forEach((item) => {
                    if (user.uid == item.val().senderid && selecteduser.id == item.val().reciverid || user.uid == item.val().reciverid && selecteduser.id == item.val().senderid) {
                         array.push(item.val())
                    }
               });
               setMsgList(array)


          });
     }, [selecteduser])


     console.log(msgList)
     return (
          <>
               {/* component */}
               <div className="flex h-screen overflow-hidden">
                    {/* Sidebar */}
                    <Sidebar />
                    {/* Main Chat Area */}
                    {selecteduser ?
                         <div className="flex-1">
                              {/* Chat Header */}
                              <header className="bg-white p-4 text-gray-700">
                                   <h1 className="text-2xl font-semibold">{selecteduser.name}</h1>
                              </header>
                              {/* Chat Messages */}
                              <div className="h-screen overflow-y-auto p-4 pb-36">
                                   {msgList.map((item) => (
                                        item.senderid == user.uid ?


                                             < div className="flex justify-end mb-4 cursor-pointer" >
                                                  <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                                       <div>
                                                       <p>
                                                            {item.msg}
                                                       </p>
                                                       <p>{moment(item.time, "YYYYMMDDh:mm:ss a").fromNow()}</p>
                                                       </div>
                                                  </div>
                                                  <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                                       <img
                                                            src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                                            alt="My Avatar"
                                                            className="w-8 h-8 rounded-full"
                                                       />
                                                  </div>
                                             </div>
                                             :

                                             <div className="flex mb-4 cursor-pointer">
                                                  <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                                       <img
                                                            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                                            alt="User Avatar"
                                                            className="w-8 h-8 rounded-full"
                                                       />
                                                  </div>
                                                  <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                                       <div>
                                                       <p className="text-gray-700">  {item.msg}</p>
  <p>{moment(item.time, "YYYYMMDDh:mm:ss a").fromNow()}</p>
                                                            </div>
                                                  </div>
                                             </div>
                                   ))}



                              </div>
                              {/* Chat Input */}
                              <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-22 w-3/4">
                                   <div className="flex items-center">
                                        <input onChange={handleMsgText}
                                             type="text"
                                             placeholder="Type a message..."
                                             className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                                        />
                                        <button onClick={handleSendMsg} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                                             Send
                                        </button>
                                   </div>
                              </footer>
                         </div>
                         :
                         <h1 className='text-4xl text-center'>Please Select a User</h1>
                    }
               </div >
          </>

     )
}

export default Message