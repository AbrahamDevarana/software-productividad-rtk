import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import * as icons from '@fortawesome/free-solid-svg-icons';

interface Props {
    iconName: IconName;
    className?: string;
    onClick?: () => void;
}

type IconName = keyof typeof icons;

export const Icon = ({ iconName, className, onClick }: Props) => {
    const icon = icons[iconName] as IconProp;

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




