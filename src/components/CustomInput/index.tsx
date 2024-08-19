import React from 'react';
import './index.css';

/**
 * 自定义输入组件
 * @param props 组件的属性，包括disabled, type, label, value, errorTips, onChange
 */
const customInput = (props: {
  disabled?: boolean; // 是否禁用输入框
  type: string; // 输入框的类型，例如text, password等
  label: string; // 输入框的标签
  value: string; // 输入框的值
  errorTips: string; // 错误提示信息
  onChange: (ev: any) => void; // 输入框值变化时的回调函数
}) => {
  const {
    type,
    label,
    value,
    errorTips,
    onChange,
    disabled,
  } = props;

  // 处理输入框值变化的函数
  const handlerChange = (ev: any) => {
    onChange({
      value: ev.target.value, // 新的输入值
      label, // 输入框的标签
    });
  }
  return (
    <div className="custom-input-wrapper">
      <div className="custom-input-main">
        <span className="custom-input-label">
            { `${label}: ` }
          </span>
          <input
            disabled={disabled} // 设置输入框是否禁用
            type={type} // 设置输入框的类型
            value={value} // 设置输入框的值
            onChange={handlerChange} // 绑定输入框值变化的处理函数
          />
      </div>
      <div className="custom-input-error-tips">{errorTips}</div>
    </div>
  );
};

// 使用React.memo优化组件，避免不必要的重新渲染
export default React.memo(customInput);