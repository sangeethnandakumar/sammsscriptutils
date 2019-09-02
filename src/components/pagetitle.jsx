import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";

class PageTitle extends Component {
    render() {
        return(
            <Typography variant="h2" gutterBottom>
                {this.props.title}
            </Typography>
        );
    }
}

export default PageTitle;