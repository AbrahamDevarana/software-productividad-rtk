import { StatusColors, statusColors } from './utils'

interface StatusItem {
    label: JSX.Element;
    value: string;
}


const generateStatusItems = (statusColors: StatusColors): StatusItem[] => {
    return Object.entries(statusColors).map(([key, value]) => ({
        label: (
            <div className={`px-3 bg-current rounded-sm ${value.gradient} text-center`}>
                <p className={`text-white`}>
                    {value.label}
                </p>
            </div>
        ),
        value: key
    }));
};


export const statusItems = generateStatusItems(statusColors);