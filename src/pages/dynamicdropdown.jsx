import React, {Component} from 'react'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PageTitle from "../components/pagetitle";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CodeBlock from "../components/codeblock";
import TextBlock from "../components/textblock";

class DynamicDropdown extends Component {
    state = {
        code:'',
        sql: '',
        table:''
    };

    handleCopyValue = e => this.setState({code: e.target.value});
    handleTableValue = e => this.setState({table: e.target.value});

    onBtnGenerate = () => {
        this.setState({
            sql: this.GenerateScript(this.GenerateArray(this.state.code))
        });
    };

    onBtnSave = () => {
        let d = new Date();
        let url = (this.SaveSQL(this.state.sql.replace(/\n/g, "\r\n"), "1_"+d.getDate()+""+(d.getMonth()+1)+""+d.getFullYear()+"_DropdownValues.sql", "sql"));
        let link = document.createElement("a");
        link.download = "1_"+d.getDate()+""+(d.getMonth()+1)+""+d.getFullYear()+"_DropdownValues.sql"
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
        let lines =  copy.split("\n");
        let dropdowns = [];
        let dropdown = [];
        for (let i=0 ; i < lines.length ; i++) {
            if(lines[i] !== "") {
                dropdown.push(lines[i])
                if(i==(lines.length-1)) {
                    dropdowns.push(dropdown);
                    dropdown = [];
                }
            }
            else {
                dropdowns.push(dropdown);
                dropdown = [];
            }
        }
        return dropdowns;
    }

    GenerateScript(objects) {
        let result = `-- SQL Script for adding dynamic dropdown values
-- Created: `+ this.GetTimeStamp() + `

`;
        let sql = "";

        for(let i=0; i<objects.length ; i++)
        {
            let name = objects[i][0];
            let codeA = `-- Dropdown `+ (i+1) +`: `+ name +`
IF NOT EXISTS ( SELECT * FROM [DropDownLists] where [DropDownListName]='`+ name +`')
BEGIN 
      declare @maxid int
      SELECT @maxid=Max(Id) FROM [DropDownLists]       
      -- Dropdown Name
      SET IDENTITY_INSERT [dbo].[DropDownLists] ON 
      INSERT [dbo].[DropDownLists] ([Id], [DropDownListName], [DropdownName], [TabName]) VALUES (@maxid+1, N'`+ name +`', NULL, NULL)
      SET IDENTITY_INSERT [dbo].[DropDownLists] OFF      
      -- Dropdown Keys`;
            let codeB = ``;


            for(let j=1; j<objects[i].length; j++) {
                codeB += `
      INSERT [dbo].[DroDownListItems] ([DropDownListItem], [DropDownListId]) VALUES ( N'`+ objects[i][j] +`', @maxid+1)`;
            }



            let codeC = `
END
GO


`;
            sql+=codeA + codeB + codeC;
        }

        return result + sql;
    }

    SaveSQL(text, name, type) {
        let file = new Blob([text], {type: type});
        return URL.createObjectURL(file);
    }

    render() {
        return (
            <Container fixed className={"containerSpacing"}>
                <PageTitle title={"Dynamic Dropdown Generator"}/>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ButtonGroup variant="contained" color="secondary" size="large" aria-label="large contained secondary button group">
                            <Button onClick={this.onBtnGenerate}>Generate Dropdown Script</Button>
                            <Button onClick={this.onBtnSave}>Save As SQL File</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <TextBlock onChangeValue={this.handleCopyValue} Placeholder={`[ DropDownName1 ]
[Item1]
[Item2]

[DropdownName2]
[Item1]
[Item2]`}/>
                    </Grid>
                    <Grid item xs={8}>
                        <CodeBlock code={this.state.sql} lang={"sql"}/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default DynamicDropdown;
