import React from 'react';
import { connect } from 'react-redux';
import { List, Divider } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';

import { CONSTANTS } from '../../constants';

const TeacherInfo = ({ data, teacherIndex }) => {
  const teacherInfo = data.teachers[teacherIndex];

  return (
    <div className="TeacherInfo page">
      <h2>{teacherInfo.name}</h2>
      <h3>{teacherInfo.position}</h3>
      <h3>{teacherInfo.degree}</h3>
      {teacherInfo.about.split('\n').map((i) => {
        return <p key={i}>{i}</p>;
      })}
      <Divider />
      <h2>{CONSTANTS.PUBLICATIONS}</h2>
      {teacherInfo.publications && (
        <List
          itemLayout="horizontal"
          dataSource={teacherInfo.publications}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<a href={item.url} target="_blank">{item.title}</a>}
                description={item.published}
              />
            </List.Item>
          )}
        />
      )}
      <Divider />
      <h2>{CONSTANTS.CONTACTS}</h2>
      <div className="TeacherInfo__contacts">
        {teacherInfo.contacts.email && (
          <p>
            <MailOutlined />
            <a href={`mailto:${teacherInfo.contacts.email}`}>
              {teacherInfo.contacts.email}
            </a>
          </p>
        )}
        {teacherInfo.contacts.mobile && (
          <p>
            <PhoneOutlined />
            <a href={`tel:${teacherInfo.contacts.mobile}`}>
              {teacherInfo.contacts.mobile}
            </a>
          </p>
        )}
        {teacherInfo.contacts.website && (
          <p>
            <a href={teacherInfo.contacts.website}>
              {teacherInfo.contacts.website}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  teacherIndex: state.pages.teacherIndex,
});

export default connect(mapStateToProps, null)(TeacherInfo);
