import React from 'react';
import Dialog from 'qnui/lib/dialog';
import Button from 'qnui/lib/button';
import Field from 'qnui/lib/field';
import AddView from './add'
class FilterView extends React.Component {
    field = new Field(this);
    onGetValue() {
        console.log(this.field.getValue('self'));
    }
    render() {
      const { init, setValue, reset } = this.field
        return (
          <Dialog visible = {this.props.visible}
                    onOk = {this.props.onClose}
                    onCancel = {this.props.onClose}
                    onClose = {this.props.onClose}>
                     <h3>Your one-stop communication tool!</h3>
                     <AddView/>
                     <br/><br/>

                  <Button type="primary" onClick={this.onGetValue.bind(this)}>getValue</Button>
                  <Button type="primary" onClick={() => setValue('self', ['test', 'setValue'])}>setValue</Button>
                  <Button onClick={() => reset()}>reset</Button>
            </Dialog>
        )
    }
}
export default FilterView
