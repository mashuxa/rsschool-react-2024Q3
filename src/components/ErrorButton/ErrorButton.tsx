import { Component } from 'react';

class ErrorButton extends Component<object, object> {
  throwError = (): void => {
    this.setState(() => {
      throw new Error('Fake error');
    });
  };

  render() {
    return (
      <button onClick={this.throwError} className="mt-4 px-4 py-2 bg-slate-500 hover:bg-red-500 text-white rounded-md">
        Throw error
      </button>
    );
  }
}

export default ErrorButton;
