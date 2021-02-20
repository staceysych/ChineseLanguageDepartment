import React from 'react';
import { Tooltip } from 'antd';

export const EllipseText = (text) => (
  <Tooltip placement="topLeft" title={text} key={text}>
    <div
      key={text}
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
