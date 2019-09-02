import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";

class TextBlock extends Component {
    state = {
        code: ''
    };

    render() {
        return(
            <TextField fullWidth placeholder={this.props.Placeholder} multiline onChange={this.props.onChangeValue}/>
        );
    }
}

export default TextBlock;