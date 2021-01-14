import React from 'react';

export const renderExamMaterials = (path, arr, year) => {
  if (path === 'exam') {
    const filteredArrayByYear = arr.filter((obj) => obj.year === year);
    return (
      <div className="Materials__data">
        <h4>{`Курс ${year}:`}</h4>
        {filteredArrayByYear.map(({url, name, specialization}) => {
          return (
            <p key={name} >
              <a href={url}>{`${name} ${specialization}`}</a>
            </p>
          );
        })}
      </div>
    );
  }
};
