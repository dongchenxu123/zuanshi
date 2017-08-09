import React from 'react';
import Button from 'qnui/lib/button';
class AddView extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func, // Field 从组件拿最新值
        value: React.PropTypes.array,   // Feild 给组件设置新值
    }

    constructor(props) {
        super(props);

        this.state = {
            value: typeof props.value === 'undefined' ? [] : props.value
        };
    }

    // 用到了state的需要接受props传过来的value，以更新组件
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: typeof nextProps.value === 'undefined' ? '' : nextProps.value
            });
        }
    }

    onClick = () => {
        let value = this.state.value.concat([]);
        var _this = this
        value.push('new');

        this.setState({
            value
        });
        this.props.onChange(value);
    }

    render() {
        return (<div className="self">
            {this.state.value.map((v, i) => {
                return <span key={i} >{v}</span>;
            })}
            <Button onClick={this.onClick.bind(this)}>Add</Button>
        </div>);
    }
}
export default AddView
