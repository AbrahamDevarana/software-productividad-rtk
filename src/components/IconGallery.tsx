import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { icons } from '../helpers/icons';

library.add(...icons);

interface Props {
    onSelect: (icon: IconDefinition) => void;
}

export function IconGallery({ onSelect }: Props) {
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