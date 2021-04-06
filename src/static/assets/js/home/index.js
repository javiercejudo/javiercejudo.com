// @ts-nocheck

import {
  h,
  render,
  Component,
} from '../../../../../node_modules/preact/dist/preact.module.js';

import htm from '../../../../../node_modules/htm/dist/htm.module.js';

const html = htm.bind(h);

class App extends Component {
  // Add `name` to the initial state
  state = {value: '', name: 'world'};

  onInput = ev => {
    this.setState({value: ev.target.value});
  };

  // Add a submit handler that updates the `name` with the latest input value
  onSubmit = ev => {
    // Prevent default browser behavior (aka don't submit the form here)
    ev.preventDefault();

    this.setState({name: this.state.value});
  };

  render() {
    return html`
      <div>
        <h1>Hello, ${this.state.name}!</h1>
        <form onSubmit=${this.onSubmit}>
          <input
            type="text"
            value=${this.state.value}
            onInput=${this.onInput}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    `;
  }
}

render(html`<${App} />`, document.getElementById('root'));
