import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import * as iconsSolid from '@fortawesome/free-solid-svg-icons';
import * as iconsRegular from '@fortawesome/free-regular-svg-icons';

interface Props {
    iconName: IconName;
    className?: string;
    onClick?: () => void;
}


const mergedIcons = { ...iconsSolid, ...iconsRegular };
type IconName = keyof typeof mergedIcons;


export const Icon = ({ iconName, className, onClick }: Props) => {
    const icon = mergedIcons[iconName] as IconProp;

    if (!icon) {
        throw new Error(`Icon ${iconName} not found`);
    }

    return (
        <FontAwesomeIcon
            icon={icon}
            className={className}
            onClick={onClick}
        />
    );
};




