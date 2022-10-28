import { notification } from "antd";
type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
    type: NotificationType;
    message: string;
}

export const useNotification = ({type, message}:NotificationProps) => {
       notification[type]({
        message: message,
        placement: 'bottomRight',
        duration: 2,
    });
}
