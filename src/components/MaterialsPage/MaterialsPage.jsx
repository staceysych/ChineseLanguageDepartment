import React, { useEffect, useState } from 'react';
import { useHttp } from '../../utils'
import { Link } from '@reach/router';
import { connect } from 'react-redux';

import { ACTIONS } from '../../store/actions/creators';

import './MaterialsPage.scss';

import Label from '../Label';

const isActive = ({ isCurrent }) => {
  return isCurrent
    ? { className: 'MaterialsPage__link MaterialsPage__link_active' }
    : {};
};

const MaterialsPage = ({ children, setPath, path }) => {
  const [pageData, setPageData] = useState({})
  const [materials, setMaterials] = useState([])
  const { request } = useHttp()

  useEffect(() => {
    const requestHandler = async () => {
      try {
        const response = await request(`http://localhost:4000/${path}`)
        if (path === 'study') {
          setPageData(response.page)
          setMaterials(response.materials[0].materials)
        } else if (path === 'science') {
          setPageData(response.page)
          setMaterials(response.materials[0].scienceMaterials)
        }
      } catch (e) {
      }
    }
    requestHandler()
  }, []);

  return (
    <div className="MaterialsPage container page">
      <Label text={pageData.label} />
      <div className="MaterialsPage__layout">
        <ul className="MaterialsPage__nav">
          {materials.map(({ name, path }) => (
            <Link
              className="MaterialsPage__link"
              key={path}
              to={path}
              onClick={() => setPath(path)}
              getProps={isActive}
            >
              <li key={name}>{name}</li>
            </Link>
          ))}
        </ul>
        {children}
      </div>
    </div>
  );
};

export default connect(null, { setPath: ACTIONS.setPath })(MaterialsPage);
