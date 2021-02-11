
import React from 'react';
import { Typography } from 'antd';

export const Line = ({ title, text, styles }) => {
  const { Text } = Typography;
  const mode = styles && text !== 'N/A';
  return (
    <>
      <Text strong>{title}</Text>
      {text && (
        <Text type={mode && styles} strong={mode}>
          {text}
        </Text>
      )}
    </>
  );
};

