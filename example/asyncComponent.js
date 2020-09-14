import React from 'react';
import loadjs from 'loadjs';
import { getDefaultValue } from './utils/helper';

export default class AsyncComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { type } = this.props;

    loadjs([`static/${type.toLowerCase()}/index.js`, `static/${type.toLowerCase()}/config.js`], {
      returnPromise: true,
    })
      .then(() => {
        this.comp = window[`_${type}`];
        this.config = window[`_${type}_config`];

        this.setState({
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <div>加载中...</div>;
    }
    const Comp = this.comp;
    const props = getDefaultValue(this.config);
    console.log(props);

    return <Comp {...props.attr} />;
  }
}
