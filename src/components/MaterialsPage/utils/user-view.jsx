import React from 'react';
import { Link } from '@reach/router';
import { Spin } from 'antd';

import Label from '../../Label';

const isActive = ({ isCurrent }) => {
  return isCurrent
    ? { className: 'MaterialsPage__link MaterialsPage__link_active' }
    : {};
};

export const userView = (data, children, onLinkClick) => (
  <>
    <Label text={data.label} />
    <div className="MaterialsPage__layout">
      <ul className="MaterialsPage__nav">
        {data.materials ? (
          data.materials.map(({ name, path }) => (
            <Link
              className="MaterialsPage__link"
              key={path}
              to={path}
              onClick={() => onLinkClick(path)}
              getProps={isActive}
            >
              <li key={name}>{name}</li>
            </Link>
          ))
        ) : (
          <Spin size="large" />
        )}
      </ul>
      <div className="MaterialsBoard">{children}</div>
    </div>
  </>
);
