import React  from 'react';

interface MyComponentProps {
  children?: any;
}

interface MyComponentState {
  [key: string | number | symbol]: any;
}
class ErrorBoundary extends React.Component<MyComponentProps, MyComponentState> {
    override state = {
        hasError: false
    };
  
    static getDerivedStateFromError(error: any) { // 更新 state 使下一次渲染能够显示降级后的 UI
        console.log('error', error);
        return { hasError: true };
    }
  
    override componentDidCatch(error: any, errorInfo: any) {
        // TODO: 错误上报
        console.log('error', JSON.stringify(error));
        console.log('errorInfo', JSON.stringify(errorInfo));
    }
  
    override render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return <div>error</div>;
        }
    
        return this.props.children; 
    }
}
export default ErrorBoundary;
  