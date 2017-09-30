
class Repeat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [''],
        };
    }
    handleChange(e, index) {
      const items = [...this.state.items];
      items[index] = e.target.value;
      this.setState({ items });
      this.props.onChange(items);
    }
    handleAddItem(e, index) {
        e.preventDefault();
        const items = [...this.state.items];
        items.splice(index, 0, '');
        this.setState({ items });
    }
    handleRemoveItem(e, index) {
        e.preventDefault();
        if (this.state.items.length === 1) return;
        const items = [...this.state.items];
        items.splice(index, 1);
        this.setState({ items });
    }
    render() {
        const children = React.Children.only(this.props.children);
        const elementItems = this.state.items.map((item, index) => (
            <div key={index}>
                {
                    React.cloneElement(children, {
                        onChange: e => this.handleChange(e, index),
                        value: item,
                    })
                }
                <div>
                    <a href="#" onClick={e => this.handleAddItem(e, index)}>添加</a>
                    <a href="#" onClick={e => this.handleRemoveItem(e, index)}>移除</a>
                </div>
            </div>
        ));
        return <div>{elementItems}</div>;
    }
}

class UserForm extends React.Component {
    handleFieldChange(e) {
        const { name, value } = e.target;
        const formData = {
            ...this.props.value, 
            [name]: value,
        }
        this.props.onChange({
            target: {
                value: formData,
            }
        });
    }
    render() {
        const formData = this.props.value || {};
        return (
            <div>
                <div>
                    <label htmlFor="name">姓名</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={e => this.handleFieldChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="addr">地址</label>
                    <input
                        type="text"
                        name="addr"
                        value={formData.addr || ''}
                        onChange={e => this.handleFieldChange(e)}
                    />
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        demo1: [],
        demo2: [],
      }
    }
    handleChange(key, items) {
      this.setState({
        ...this.state,
        [key]: items,
      })
    }
    render() {
        return (
          <div>
            <Repeat onChange={items => this.handleChange('demo1', items)}>
                <input type="text" />
            </Repeat>
            <div>Result: {JSON.stringify(this.state.demo1)}</div>
            <hr/>
            <Repeat onChange={items => this.handleChange('demo2', items)}>
                <UserForm />
            </Repeat>
            <div>Result: {JSON.stringify(this.state.demo2)}</div>
          </div>
        )
    }
}

ReactDOM.render(<App/>, mountNode)
