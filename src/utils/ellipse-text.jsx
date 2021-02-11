import React from 'react';
import { Tooltip } from 'antd';


export const EllipseText = (text) => (
  <Tooltip placement="topLeft" title={text}>
    <div
      style={{
        width: 200,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  </Tooltip>
);
