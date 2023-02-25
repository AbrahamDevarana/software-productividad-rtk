import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUserNinja, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

interface Props {
  iconName: string;
  className?: string;
}

const iconMap: Record<string, IconDefinition> = {
  faUserNinja,
  faUserAstronaut
  // Agrega aquí los demás iconos que necesites
};

function Icon({ iconName, className }: Props) {
  const icon = iconMap[iconName];

  if (!icon) {
    // Si el icono no existe en el mapa, puedes mostrar un icono por defecto o un mensaje de error
    return <div>Icono no encontrado</div>;
  }

  return <FontAwesomeIcon icon={icon} className={className} />;
}

export default Icon;