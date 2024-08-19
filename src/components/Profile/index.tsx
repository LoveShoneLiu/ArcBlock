import { useState, useEffect } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import api from '../../libs/api';
import CustomInput from '../CustomInput';
import { validationRules } from '../../libs/utils';
import { ProfileType } from '../../libs/declare';
import './index.css';

const originProfile: ProfileType = { // 初始的用户信息
  username: '',
  email: '',
  phone: '',
  id: null,
};
const profileValidateErrorInfo: ProfileType = { // 初始的用户信息校验错误信息
  username: '',
  email: '',
  phone: '',
  id: null,
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType>(originProfile); // 定义用户默认信息
  const [errorInfo, setErrorInfo] = useState<ProfileType>(profileValidateErrorInfo); // 定义用户信息校验错误信息
  const [isEditing, setEditMode] = useState<boolean>(false); // 定义编辑的状态

  // 获取用户信息数据
  const getProfileData = async () => {
    const { data } = await api.get('/api/getData?id=1');
    const {
      code,
      data: res,
      message,
    } = data;
    if (code !== 0) {
      alert(`获取数据失败: ${message}`);
      setProfile(originProfile);
      return;
    }
    setProfile({
      username: res.username,
      email: res.email,
      phone: res.phone,
      id: res.id,
    });
  }

  // 设置用户信息数据
  const setProfileData = async () => {
    const { data } = await api.post('/api/updateData', {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      phone: profile.phone,
    });
    const {
      code,
      data: res,
      message,
    } = data;
    if (code !== 0) {
      alert(`数据设置失败：${message}`);
      return;
    }
    setProfile({
      username: res.username,
      email: res.email,
      phone: res.phone,
      id: res.id,
    });
  }

  // 组件挂载时获取用户信息数据
  useEffect(() => {
    getProfileData();
  }, []);

  // 处理输入框内容变化
  const handleChange = (params: {
    value: string;
    label: string;
  }) => {
    const { label, value } = params;
    console.log('e', label, value);
    setProfile({ ...profile, [label]: value });
  };

  // 校验用户输入内容
  const validateFn = () => {
    let isPass: boolean = true;
    const newErrors: ProfileType = {
      ...profileValidateErrorInfo,
    };
    Object.keys(profile).forEach((key: string) => {
      const value: string = (profile as any)[key];
      if (
        key === 'username'
        && !validationRules.required(value)
      ) {
        newErrors[key] = 'username is required';
        isPass = false;
      } else if (
        key === 'email'
        && (
          !validationRules.required(value)
          || !validationRules.email(value)
        )
      ) {
        newErrors[key] = 'Invalid email address';
        isPass = false;
      } else if (
        key === 'phone'
        && (
          !validationRules.required(value)
          || !validationRules.phone(value)
        )
      ) {
        newErrors[key] = 'Invalid phone';
        isPass = false;
      }
    });
    // console.log('newErrors', newErrors);
    setErrorInfo(newErrors);
    return isPass;
  }

  // 保存用户信息
  const handleSave = () => {
    const isPassResult: boolean = validateFn(); // 输入内容校验
    if (isPassResult) {
      setProfileData();
      editStatusChange(false);
    }

  };

  // 切换编辑状态
  const editStatusChange = (val: boolean) => {
    setEditMode(val);
  };

  return (
    <div className="profile-wrapper">
        <CustomInput
          label="username"
          type="text"
          disabled={!isEditing}
          value={profile.username}
          errorTips={errorInfo.username}
          onChange={handleChange}
        />
        <CustomInput
          label="phone"
          type="text"
          disabled={!isEditing}
          value={profile.phone}
          errorTips={errorInfo.phone}
          onChange={handleChange}
        />
        <CustomInput
          label="email"
          type="email"
          disabled={!isEditing}
          value={profile.email}
          errorTips={errorInfo.email}
          onChange={handleChange}
        />
        <button className="btn" onClick={editStatusChange.bind(this, true)}>Edit</button>
        <button className="btn" onClick={editStatusChange.bind(this, false)}>Cancel</button>
        <button className="btn" onClick={handleSave}>Save</button>
    </div>
  );
};

function ResultComponent(props: any) {
  return (
      <ErrorBoundary>
          <Profile {...props} />
      </ErrorBoundary>
  )
}

export default ResultComponent;