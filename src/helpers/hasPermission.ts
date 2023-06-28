import { PermisoProps } from "@/interfaces";


export const hasPermission = (regla: string, permisos:PermisoProps[]) => {
    const permisosUsuario = permisos?.map((permiso) => {
        return permiso.permisos;
    })

    const permisosUsuarioSet = new Set(permisosUsuario);
    const reglasSet = new Set([regla]);

    const intersection = new Set([...reglasSet].filter(x => permisosUsuarioSet.has(x)));

    if (intersection.size > 0) {
        return true;
    }else{
        return false;
    }
}


export const hasGroupPermission = (reglas: string[], permisos: PermisoProps[]) => {


    const permisosUsuario = permisos?.map((permiso) => {
        return permiso.permisos;
    })

    const permisosUsuarioSet = new Set(permisosUsuario);
    const reglasSet = new Set(reglas);

    const intersection = new Set([...reglasSet].filter(x => permisosUsuarioSet.has(x)));
    
    if (intersection.size > 0) {
        return true;
    }else{
        return false;
    }
}