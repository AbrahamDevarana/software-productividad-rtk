// Resizable
import type { ResizeCallbackData } from 'react-resizable';

import type { ColumnsType } from 'antd/es/table';
import { ResizableTitle } from '../helpers/resizable';

export const useResizable = ( columns: ColumnsType<any>, setColums: React.Dispatch<React.SetStateAction<ColumnsType<any>>>) => {

    const handleResize: Function = (index: number) => (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
        const newColumns = [...columns];
        newColumns[index] = {
            ...newColumns[index],
            width: size.width,
        };
    setColums(newColumns);
};

    const mergeColumns: ColumnsType<any> = columns.map((col, index) => ({
        ...col,
        onHeaderCell: (column: ColumnsType<any>[number]) => ({
            width: column.width,
            onResize: handleResize(index) as React.ReactEventHandler<any>,
        }),
    }));

    return {
        mergeColumns,
        ResizableTitle,
    };

}