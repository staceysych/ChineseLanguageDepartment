import React from 'react';

import { Tag } from 'antd';

import { EllipseText, generateRandomId } from '../../../utils';

export const generateMaterial = (docs, year) => (
  <>
    {docs
      .filter((obj) => obj.year === year)
      .map((obj) => {
        return (
          <React.Fragment key={generateRandomId()}>
            <a className="TableView__link" href={obj.url} target="_blank">
              {EllipseText(obj.name)}
            </a>
            {obj.specialization && <Tag color="#f50">{obj.specialization}</Tag>}
          </React.Fragment>
        );
      })}
  </>
);
