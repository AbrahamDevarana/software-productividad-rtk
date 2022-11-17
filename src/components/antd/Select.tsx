import { Select } from 'antd'

interface Props {
    mode?: 'multiple' | 'tags' | undefined,
    placeholder: string,
    options: any[],
    defaultValue?: any[] | string | number,
    inputName: string,
    value: any,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}



export const AntdSelect = ( {mode = undefined, placeholder, options, defaultValue, inputName, value, onBlur, setFieldValue}: Props ) => {

    const filterOption = (inputValue: any, option: any) => {
        return option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    }

    return (
        <Select
            bordered={false}
            mode={mode}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => filterOption(input, option)}
            style={{ display: 'block', borderRadius: "5px", cursor: "pointer", borderBlockEnd: "1px solid #52525233" }}
            defaultValue={ mode === "multiple" ? defaultValue? defaultValue : { value: defaultValue} : 0 }
            value={value}
            onBlur={onBlur}
            onChange={ e => setFieldValue(inputName, e) 
            }
        >
            <Select.Option value={0} disabled={true} >{placeholder}</Select.Option>
            {
                options.map((option:any) => (
                    <Select.Option key={option.id} value={option.id}>{option.nombre}</Select.Option>
                ))
            }
        </Select>
    )
}
