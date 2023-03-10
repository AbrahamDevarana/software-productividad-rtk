import { ReactElement } from "react";

export interface LayoutLoginProps {
    children: ReactElement | ReactElement[];
}

export interface LayoutNavbarProps{
    setSettingVisible: (settingVisible: boolean) => void;
    navbarClass: string;
}


export interface LayoutSidebar{
    active: boolean;
}