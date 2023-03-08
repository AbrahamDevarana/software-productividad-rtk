import { useNotification } from "./useNotification";


interface NotifyOptions {
    updated?: boolean;
    created?: boolean;
    deleted?: boolean;
    error?: boolean;
    infoMessage?: string;
    errorMessage?: string;
}

const useNotify = ({updated, created, deleted, error, infoMessage = "" } : NotifyOptions ) => {

    if (updated) {
        useNotification({type: 'success', message: infoMessage});
    }

    if (created) {
        useNotification({type: 'success', message: infoMessage});
    }

    if (deleted) {
        useNotification({type: 'success', message: infoMessage});
    }
    
    if (error) {
        useNotification({type: 'error', message: infoMessage});
    }
}

export default useNotify;