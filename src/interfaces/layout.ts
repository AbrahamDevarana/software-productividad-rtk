import { ReactElement } from "react";

export interface LayoutLoginProps {
    children: ReactElement | ReactElement[];
}

export interface LayoutNavbarProps{
    setSettingVisible: (settingVisible: boolean) => void;
}


export interface LayoutSidebar{
    active: boolean;
}