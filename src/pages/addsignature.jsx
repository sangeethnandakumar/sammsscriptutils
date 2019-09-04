import React, {Component} from 'react'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PageTitle from "../components/pagetitle";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CodeBlock from "../components/codeblock";
import TextBlock from "../components/textblock";

class AddSignature extends Component {
    state = {
        code:'',
        sql: '',
        table:'',

        name: '',
        url: '',
        module: '',
        text: '',
        imagefield: '',
        datafield: '',
        datefield: ''
    };

    handleNameValue = e => this.setState({name: e.target.value});
    handleURLValue = e => this.setState({url: e.target.value});
    handleModuleValue = e => this.setState({module: e.target.value});
    handleTextValue = e => this.setState({text: e.target.value});
    handleImageFieldValue = e => this.setState({imagefield: e.target.value});
    handleDataFieldValue = e => this.setState({datafield: e.target.value});
    handleDateValue = e => this.setState({datefield: e.target.value});

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

    GenerateScript() {
        let today = new Date().toLocaleDateString();
        let result = `-- SQL Script to add signature field to form
-- Created: `+ this.GetTimeStamp() + `

-- Add Signature Form `+ this.state.name +`
IF not EXISTS (SELECT * FROM [SingnatureForm]
WHERE [Name] = '`+ this.state.name +`'
AND [URL] = '`+ this.state.url +`'
AND [Module] = '`+ this.state.module +`')
BEGIN
INSERT [dbo].[SingnatureForm] ([Name], [URL], [Module], [IsPopup], [CreatedOn])
VALUES ( N'`+ this.state.name +`', N'`+ this.state.url +`', N'`+ this.state.module +`', 0, N'`+ today +`')
END         

IF NOT EXISTS (SELECT * FROM [SigFormDetails]
WHERE [SignatureText] = '`+ this.state.text +`' AND [ImageField]='`+ this.state.imagefield +`' AND [DataField]='`+ this.state.datafield +`' and  FormId in (Select Max(FormId) From [SingnatureForm] where [Name] = '`+ this.state.name +`' and SignatureText = N'`+ this.state.text +`'))
BEGIN
INSERT [dbo].[SigFormDetails] ([FormId], [SignatureText], [CreatedOn], [ImageField], [DataField],[DateFIeld]) VALUES ((Select FormId From [SingnatureForm] where name='`+ this.state.name +`'), N'`+ this.state.text +`', CAST(N'`+ today +`' AS DateTime), N'`+ this.state.imagefield +`', N'`+ this.state.datafield +`',N'`+ this.state.datefield +`')
END

`;
            return(result);
    }

    SaveSQL(text, name, type) {
        let file = new Blob([text], {type: type});
        return URL.createObjectURL(file);
    }

    render() {
        return (
            <Container fixed className={"containerSpacing"}>
                <PageTitle title={"Add Signature Field Generator"}/>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ButtonGroup variant="contained" color="secondary" size="large" aria-label="large contained secondary button group">
                            <Button onClick={this.onBtnGenerate}>Generate Signature Script</Button>
                            <Button onClick={this.onBtnSave}>Save As SQL File</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <TextBlock onChangeValue={this.handleNameValue} Placeholder={"FormName: PreAdmission"}/>
                        <TextBlock onChangeValue={this.handleURLValue} Placeholder={"FormURL: PreAdmission/Index"}/>
                        <TextBlock onChangeValue={this.handleModuleValue} Placeholder={"FormModule: PreAdmission"}/>
                        <TextBlock onChangeValue={this.handleTextValue} Placeholder={"SigText: Patient Signature:"}/>
                        <TextBlock onChangeValue={this.handleImageFieldValue} Placeholder={"SigImageID: sigImageStaffSignature"}/>
                        <TextBlock onChangeValue={this.handleDataFieldValue} Placeholder={"SigDataID: sigImageData"}/>
                        <TextBlock onChangeValue={this.handleDateValue} Placeholder={"SigDateID: PatientSignatureDate"}/>
                    </Grid>
                    <Grid item xs={8}>
                        <CodeBlock code={this.state.sql} lang={"sql"}/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default AddSignature;
