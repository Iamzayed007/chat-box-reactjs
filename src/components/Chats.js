import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChatEngine } from 'react-chat-engine';

import useAuth from '../hooks/useAuth'

const Chats = () => {

    const { user,history, logOut}=useAuth()
    const [loading, setLoading]= useState(true)
   
    const getFile= async(url)=>{
        const response = await fetch(url)
        const data = await response.blob()
        return new File([data], "userPhoto.jpg",{type:'image/jpeg'})

    }


    useEffect( ()=>{
        if(!user){
            history.push('/')
            return;
        }
        else{
            axios.get('https://api.chatengine.io/users/me',{

            headers:{
                "project-id" : process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid,
            }
            })
            .then(()=>{
                setLoading(false)
            })
            .catch(()=>{
                let formData = new FormData()
                formData.append('email',user.email)
                formData.append('username',user.email)
                formData.append('secret',user.uid)

                getFile(user.photoURL)
                .then((avatar)=>{
                        formData.append('avatar',avatar,avatar.name)

                        axios.post('https://api.chatengine.io/users',
                        formData,
                        { headers:{
                            "private-key":process.env.REACT_APP_CHAT_ENGINE_KEY
                        }}
                        )
                        .then(()=>{
                            setLoading(false)
                        }).catch((error)=>{console.log(error);} )
                        // .finally(()=> setLoading(false))
                })
            })
        }
    },[user,history])

if(!user|| loading) return 'Loading'

    return (
        <div className="chats-page" >
            <div className="nav-bar">

                <div className="logo-tab">
                    UniChat
                </div>
                <div className="logout-tab">
                    <button className="logout-button" onClick={()=>logOut()}>Logout</button>
                </div>
            </div>

            <ChatEngine
            height="calc(100vh -66px)"
            projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
            userName={user.email}
            userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;