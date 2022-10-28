import { ReactElement } from "react";

export interface LayoutLoginProps {
    children: ReactElement | ReactElement[];
}

export interface LayoutNavbarProps{
    active: boolean;
    isActive: (active: boolean) => void;
    settingVisible: boolean;
    setSettingVisible: (settingVisible: boolean) => void;
}


export interface LayoutSidebar{
    active: boolean;
}

