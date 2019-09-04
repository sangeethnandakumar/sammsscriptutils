import React, {Component} from 'react'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PageTitle from "../components/pagetitle";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CodeBlock from "../components/codeblock";
import TextBlock from "../components/textblock";

class DynamicScripts extends Component {
    state = {
        formname:'',
        formtemplateid: '',
        menuorder: 0.0,
        menuentry: '',
        datatableentry: ''
    };

    handleFormNameValue = e => this.setState({formname: e.target.value});
    handleFormTemplateIDValue = e => this.setState({formtemplateid: e.target.value});
    handleMenuOrderValue = e => this.setState({menuorder: e.target.value});

    //MENU ENTRY
    onMenuEntryBtnGenerate = () => {
        this.setState({
            menuentry: this.GenerateMenuEntryScript(this.state.formname, this.state.formtemplateid, this.state.menuorder)
        });
    };

    onMenuEntryBtnSave = () => {
        let d = new Date();
        let url = (this.SaveSQL(this.state.menuentry.replace(/\n/g, "\r\n"), "1_"+d.getDate()+""+(d.getMonth()+1)+""+d.getFullYear()+"_MenuEntryScript.sql", "sql"));
        let link = document.createElement("a");
        link.download = "1_"+d.getDate()+""+(d.getMonth()+1)+""+d.getFullYear()+"_MenuEntryScript.sql";
        link.href = url;
        link.click();
    };

    GenerateMenuEntryScript(form, formtemplateid, order) {
        let result = `-- SQL Script for adding dynamic form menu entry
-- Created: `+ this.GetTimeStamp() + ` 

IF NOT EXISTS (SELECT * FROM  IntakeIntakeFormsMenu WHERE SubmenuName = '`+ form +`' AND [Name] ='Admission') 
INSERT INTO IntakeIntakeFormsMenu (
[Name],
SubmenuID,
SubmenuName,
Controller,
[Action],
IsActive,
UpdatedBy,
CreatedBy,
FormTemplateId,
ProgramName,
SiteId,
IsStartupForm,
PacketTypeID )
VALUES ('Admission', `+ order +`, '`+ form +`', 'dynamicfrom', 'Index', 1, 'Admin', 'Admin', '`+ formtemplateid +`', null, null, null, 1)`;

        return(result);
    }


    //DATA TABLE
    onDataTableBtnGenerate = () => {
        this.setState({
            datatableentry: this.GenerateDataTableScript(this.state.formname, this.state.formtemplateid, this.state.menuorder)
        });
    };

    onDataTableBtnSave = () => {
        let d = new Date();
        let url = (this.SaveSQL(this.state.datatableentry.replace(/\n/g, "\r\n"), "1_"+d.getDate()+""+(d.getMonth()+1)+""+d.getFullYear()+"_DataTableEntryScript.sql", "sql"));
        let link = document.createElement("a");
        link.download = "1_"+d.getDate()+""+(d.getMonth()+1)+""+d.getFullYear()+"_DataTableEntryScript.sql";
        link.href = url;
        link.click();
    };

    GenerateDataTableScript(form, formtemplateid, order) {
        let today = new Date().toLocaleDateString();
        let result = `-- SQL Script for adding datatable entry
-- Created: `+ this.GetTimeStamp() + ` 

IF NOT EXISTS (SELECT * from [tblDataForms] where [FormName] = N'`+ form +`')
INSERT INTO [dbo].[tblDataForms] ( [FormName], [FormURL], [IsDeleted], [CreatedBy], [CreatedOn], [LastUpdatedBy], [LastUpdatedOn], [IsDataForms])
VALUES ( N'`+ form +`', N'DynamicFrom/Index/', N'0', N'SAMMS', CAST(N'`+ today +`' AS Date), N'SAMMS', CAST(N'`+ today +`' AS Date), 1)
GO`;

        return(result);
    }













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




    SaveSQL(text, name, type) {
        let file = new Blob([text], {type: type});
        return URL.createObjectURL(file);
    }

    render() {
        return (
            <Container fixed className={"containerSpacing"}>
                <PageTitle title={"Dynamic Form Scripts"}/>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TextBlock onChangeValue={this.handleFormNameValue} Placeholder={"Form Name"}/>
                        <TextBlock onChangeValue={this.handleFormTemplateIDValue} Placeholder={"Form Template ID"}/>
                        <TextBlock onChangeValue={this.handleMenuOrderValue} Placeholder={"Menu Order"}/>
                    </Grid>
                    <Grid item xs={8}>
                        <ButtonGroup variant="contained" color="secondary" size="large" aria-label="large contained secondary button group">
                            <Button onClick={this.onMenuEntryBtnGenerate}>Generate Menu Entry Script</Button>
                            <Button onClick={this.onMenuEntryBtnSave}>Save As SQL File</Button>
                        </ButtonGroup>
                        <CodeBlock code={this.state.menuentry} lang={"sql"}/>

                        <ButtonGroup variant="contained" color="secondary" size="large" aria-label="large contained secondary button group">
                            <Button onClick={this.onDataTableBtnGenerate}>Generate DataTable Script</Button>
                            <Button onClick={this.onDataTableBtnSave}>Save As SQL File</Button>
                        </ButtonGroup>
                        <CodeBlock code={this.state.datatableentry} lang={"sql"}/>

                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default DynamicScripts;
