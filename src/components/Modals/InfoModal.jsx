import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';

import './Modals.scss';

import Button from '../Button';

import { ACTIONS } from '../../store/actions/creators';

const InfoModal = ({ isModalOpen, setModalOpen, teacherIndex, data }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  const teacherInfo = data.teachers[teacherIndex];

  return isModalOpen ? (
    <div className="Modal">
      <div className="Modal__layout">
        <div className="Modal__header">
          {teacherInfo.name}
          <Button className="Modal__btn" text="Х" fn={closeModal} />
        </div>
        <div className="Modal__description">
          <p>{teacherInfo.about}</p>
          {teacherInfo.publications ? (
            <List
              itemLayout="horizontal"
              dataSource={teacherInfo.publications}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.published}
                  />
                </List.Item>
              )}
            />
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  isModalOpen: state.pages.isModalOpen,
  teacherIndex: state.pages.teacherIndex,
});

export default connect(mapStateToProps, {
  setModalOpen: ACTIONS.setModalOpen,
})(InfoModal);
