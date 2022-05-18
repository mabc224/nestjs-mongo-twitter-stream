import {useEffect, useState} from 'react';
import {socket as socketClient} from "./../services/socket.service";

export const useSocket = () => {
    const [socket] = useState(() => socketClient);

    socket.on('connect', () => {
        console.log('Connect : ', socket.id)
    });

    useEffect(() => {
        return () => {
            if (socket) {
                console.log('Disconnect : ', socket.id)
                socket && socket.removeAllListeners();
                socket && socket.disconnect();
            }
        };
    }, []);
    return [socket];
};

export default useSocket;
