import { Icon } from "../Icon";

export const uploadButton = ({loading}: {loading:boolean}) => (
    <div>
        {loading ? <Icon iconName='faSpinner'  /> : <Icon iconName='faPlus' />}
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
)