import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faUserAstronaut,
    faUserNinja,
    faUserSecret,        
} from "@fortawesome/free-solid-svg-icons";


interface Props {
    onSelect: (icon: IconDefinition) => void;
}

library.add(faUserAstronaut, faUserNinja, faUserSecret);


export function IconGallery({onSelect}: Props){
    const icons: IconDefinition[] = [
        faUserAstronaut,
        faUserNinja,
        faUserSecret,
    ];

    return (
        <div className="icon-gallery">
            {icons.map((icon, index) => (
                <FontAwesomeIcon
                    className='text-white text-3xl'
                    key={index}
                    icon={icon}
                    onClick={() => onSelect(icon)}
                />
            ))}
        </div>
    );
}