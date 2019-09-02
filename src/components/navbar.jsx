import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const data = {
    appName: "Script Utils",
    appVersion: "1.0",
    appDeveloper: "Sangeeth Nandakumar"
}

class NavBar extends Component {

    render() {
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            {data.appName} v{data.appVersion} |
                            <Typography variant="caption" display="inline" gutterBottom>
                                &nbsp;&nbsp;Developed By: {data.appDeveloper}
                            </Typography>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default NavBar;