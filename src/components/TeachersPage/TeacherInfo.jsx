import React from 'react';
import { connect } from 'react-redux';
import { List, Divider } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';

const TeacherInfo = ({ data, teacherIndex }) => {
  const teacherInfo = data.teachers[teacherIndex];

  return (
    <div className="TeacherInfo page">
      <h2>{teacherInfo.name}</h2>
      <h3>{teacherInfo.position}</h3>
      <h3>{teacherInfo.degree}</h3>
      {teacherInfo.about.split('\n').map((i, key) => {
        return <p key={key}>{i}</p>;
      })}
      <Divider />
      <h2>Публикации</h2>
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
      <Divider />
      <h2>Контакты</h2>
      <div className="TeacherInfo__contacts">
        <p>
          <MailOutlined />
          <a href={`mailto:${teacherInfo.email}`}>{teacherInfo.email}</a>
        </p>
        <p>
          <PhoneOutlined />
          <a href={`tel:${teacherInfo.mobile}`}>{teacherInfo.mobile}</a>
        </p>
        <p>
          <a href={teacherInfo.website}>{teacherInfo.website}</a>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  teacherIndex: state.pages.teacherIndex,
});

export default connect(mapStateToProps, null)(TeacherInfo);
