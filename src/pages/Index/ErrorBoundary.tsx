import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };
  componentDidMount() {
    console.log(this.props);
  }
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  render() {
    if (this.state.error) return 1;
    return this.props.children;
  }
}

export default ErrorBoundary;
