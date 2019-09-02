import React, {Component} from 'react'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PageTitle from "../components/pagetitle";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CodeBlock from "../components/codeblock";
import TextBlock from "../components/textblock";

class AlterColumn extends Component {
    state = {
        code:'',
        sql: '',
        table:''
    };

    handleCopyValue = e => this.setState({code: e.target.value});
    handleTableValue = e => this.setState({table: e.target.value});

    onBtnGenerate = () => {
        this.setState({
            sql: this.GenerateScript(this.state.table, this.GenerateArray(this.state.code))
        });
    };

    onBtnSave = () => {
        let d = new Date();
        let url = (this.SaveSQL(this.state.sql.replace(/\n/g, "\r\n"), "1_"+d.getDate()+""+(d.getMonth()+1)+""+d.getFullYear()+"_"+this.state.table+"ColumnAdd.sql", "sql"));
        let link = document.createElement("a");
        link.download = "1_"+d.getDate()+""+(d.getMonth()+1)+""+d.getFullYear()+"_"+this.state.table+"ColumnAdd.sql"
        link.href = url;
        link.click();
    };

    GetTimeStamp() {
        let myDate = new Date();
        let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];
        let date = myDate.getDate();
        let month = monthsList[myDate.getMonth()];
        let year = myDate.getFullYear();
        let day = daysList[myDate.getDay()];
        let today = `${date} ${month} ${year}, ${day}`;
        let amOrPm;
        let twelveHours = function (){
            if(myDate.getHours() > 12)
            {
                amOrPm = 'PM';
                let twentyFourHourTime = myDate.getHours();
                let conversion = twentyFourHourTime - 12;
                return `${conversion}`

            }else {
                amOrPm = 'AM';
                return `${myDate.getHours()}`}
        };
        let hours = twelveHours();
        let minutes = myDate.getMinutes();
        let currentTime = `${hours}:${minutes} ${amOrPm}`;
        return(today + ' ' + currentTime);
    }

    GenerateArray(copy) {
        return copy.split("\n");
    }

    GenerateScript(table, columns) {
        let result = `-- SQL Script to create columns in table: ` + table + `
-- Created: `+ this.GetTimeStamp() + `

`;
        for(let i=0; i < columns.length; i++) {
            let col = columns[i].replace(/	.*/,'');
            let type = columns[i].split(/\s+/).slice(1,2);
            if(col==="") continue;
            if(type==="") continue;
            let data = `
-- Column `+ (i+1) + `: ` + col +`
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='`+ table +`' AND COLUMN_NAME='`+ col +`')
    BEGIN
        ALTER TABLE [dbo].[`+ table +`]
        ADD `+ col +`  `+ type +`
    END  
`;
            result+=data;
            }
            return(result);
    }

    SaveSQL(text, name, type) {
        let file = new Blob([text], {type: type});
        return URL.createObjectURL(file);
    }

    render() {
        return (
            <Container fixed className={"containerSpacing"}>
                <PageTitle title={"Add Column Script Generator"}/>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ButtonGroup variant="contained" color="secondary" size="large" aria-label="large contained secondary button group">
                            <Button onClick={this.onBtnGenerate}>Generate Column Script</Button>
                            <Button onClick={this.onBtnSave}>Save As SQL File</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <TextBlock onChangeValue={this.handleTableValue} Placeholder={"Table Name"}/>
                        <TextBlock onChangeValue={this.handleCopyValue} Placeholder={"Copy column design from SQL Server Design"}/>
                    </Grid>
                    <Grid item xs={8}>
                        <CodeBlock code={this.state.sql} lang={"sql"}/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default AlterColumn;
