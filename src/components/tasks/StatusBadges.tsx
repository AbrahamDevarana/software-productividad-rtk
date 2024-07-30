import { StatusColors, statusColors } from './utils'

interface StatusItem {
    label: JSX.Element;
    value: string;
}


const generateStatusItems = (statusColors: StatusColors): StatusItem[] => {
    return Object.entries(statusColors).map(([key, value]) => {
        return {
            label: (
                <div className='flex items-center'>
                    <div className={`h-3 w-3 rounded-full ${value.gradient}`}></div>
                    <div className={`px-3 text-center`}>
                        <p className={`text-${value.colorBase}`}>{value.label}</p>
                    </div>
                </div>
            ),
            value: key
        };
    });
};


export const badgeItems = generateStatusItems(statusColors);