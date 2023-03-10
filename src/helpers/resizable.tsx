import { Resizable } from 'react-resizable';// Resizable
import type { ResizeCallbackData } from 'react-resizable';

export const ResizableTitle = (
    props: React.HTMLAttributes<any> & {
      onResize: (e: React.SyntheticEvent<Element>, data: ResizeCallbackData) => void;
      width: number;
    },
  ) => {
    const { onResize, width, ...restProps } = props;
  
    if (!width) {
      return <th {...restProps} />;
    }
  
    return (
      <Resizable
        width={width}
        height={0}
        handle={
          <span
            className="react-resizable-handle"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        }
        onResize={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th {...restProps} />
      </Resizable>
    );
};