import SockJS from "sockjs-client";
import Stomp  from 'stompjs';

export function connectWebSocket(username, role, setReservationsNum, setNavbarChanged){
    const socket = new SockJS('http://localhost:8090/wsocket');
    const stompClient = Stomp.over(socket);
    if(role === 'ADMIN'){
        stompClient.connect({}, ()=>{
            stompClient.subscribe('/topic/reservations', (data)=>{ 
                const num = JSON.parse(data.body).body;
                setReservationsNum(num);
                try{
                    setNavbarChanged(prev=>!prev);
                }
                catch(error){
                    console.log('not present');
                }
            });
        });
    }
    else if(role ==='STUDENT'){
        stompClient.connect({}, ()=>{
            stompClient.subscribe(`/user/${username}/private`, (data)=>{ 
                const num = JSON.parse(data.body).body;
                setReservationsNum(num);
            });
        });
    }
    return ()=>{
        if(stompClient.connected)
            stompClient.disconnect();
    }
}