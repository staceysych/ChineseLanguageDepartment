import React, { useEffect, useState } from 'react';

import { filterData, useHttp } from '../../utils';
import {
  renderStudyMaterials,
  renderScienceMaterials,
  isStudyPage,
  isSciencePage,
} from './Materials.utils';

import { CONSTANTS } from '../../constants';

const Materials = ({ path, page }) => {
  const { request } = useHttp()
  const [materials, setMaterials] = useState({})
  const pathName = window.location.pathname.split('/')[1]

  useEffect(() => {
    const requestHandler = async () => {


      try {
        const response = await request(`http://localhost:4000/${pathName}`)
        if (pathName === 'study') {
          setMaterials(filterData(response.materials[0].materials, 'path', path))
        } else if (pathName === 'science') {
          setMaterials(filterData(response.materials[0].scienceMaterials, 'path', path))
        }
      } catch (e) {
        console.log(e);
      }
    }
    requestHandler()
  }, []);


  return (
    <div>
      <div className="Materials">
        {isStudyPage(page) && materials
          ? CONSTANTS.UNI_YEARS.map((year, index) =>
            renderStudyMaterials(path, materials.docs, year, index)
          )
          : null}
        {isSciencePage(page) && materials ? renderScienceMaterials(path, materials.docs) : null}
      </div>
    </div>
  );
};

export default Materials;
