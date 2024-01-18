// Developed by Donis Abraham
// Developer at Malayala Manorama
// Date 03-11-2023

// Veriable to store data from writePreferencesToFile()

let Email_style=document.getElementById("oddEmailStyle").value;
let Number_style=document.getElementById("oddPageNoStyle").value;
let Year_style=document.getElementById("oddYearStyle").value;
let Month_style=document.getElementById("oddMonthStyle").value;
let Date_style=document.getElementById("oddDateStyle").value;
let Day_style=document.getElementById("oddDayStyle").value;
let Unit_style=document.getElementById("oddUnitStyle").value;
let Edition_style=document.getElementById("oddEditionStyle").value;


let E_EmailY_pos=document.getElementById("EvenEmaily").value;
let E_EmailX_pos=document.getElementById("EvenEmailx").value;
let E_EmailH=document.getElementById("EvenEmailh").value;
let E_EmailW=document.getElementById("EvenEmailw").value;
let o_EmailY_pos=document.getElementById("oddEmaily").value;
let o_EmailX_pos=document.getElementById("oddEmailx").value;
let o_EmailH=document.getElementById("oddEmailh").value;
let o_EmailW=document.getElementById("oddEmailw").value;

let E_UnitY_pos=document.getElementById("EvenUnity").value;
let E_UnitX_pos=document.getElementById("EvenUnitx").value;
let E_UnitH=document.getElementById("EvenUnith").value;
let E_UnitW=document.getElementById("EvenUnitw").value;
let o_UnitY_pos=document.getElementById("oddUnity").value;
let o_UnitX_pos=document.getElementById("oddUnitx").value;
let o_UnitH=document.getElementById("oddUnith").value;
let o_UnitW=document.getElementById("oddUnitw").value;

let E_EditionY_pos=document.getElementById("EvenEditiony").value;
let E_EditionX_pos=document.getElementById("EvenEditionx").value;
let E_EditionH=document.getElementById("EvenEditionh").value;
let E_EditionW=document.getElementById("EvenEditionw").value;
let o_EditionY_pos=document.getElementById("oddEditiony").value;
let o_EditionX_pos=document.getElementById("oddEditionx").value;
let o_EditionH=document.getElementById("oddEditionh").value;
let o_EditionW=document.getElementById("oddEditionw").value;

let E_DateY_pos=document.getElementById("EvenDateY").value;
let E_DateX_pos=document.getElementById("EvenDateX").value;
let E_DateH=document.getElementById("EvenDateH").value;
let E_DateW=document.getElementById("EvenDateW").value;
let o_DateY_pos=document.getElementById("oddDateY").value;
let o_DateX_pos=document.getElementById("oddDateX").value;
let o_DateH=document.getElementById("oddDateH").value;
let o_DateW=document.getElementById("oddDateW").value;

let E_NoY_pos=document.getElementById("EvenPageY").value;
let E_NoX_pos=document.getElementById("EvenPageX").value;
let E_NoH=document.getElementById("EvenPageH").value;
let E_NoW=document.getElementById("EvenPageW").value;
let o_NoY_pos=document.getElementById("oddPageY").value;
let o_NoX_pos=document.getElementById("oddPageX").value;
let o_NoH=document.getElementById("oddPageH").value;
let o_NoW=document.getElementById("oddPageW").value;

// Veriable to store data from readTempPreferencesToJS()


let Read_Email_style;
let Read_Number_style;
let Read_Year_style;
let Read_Month_style;
let Read_Date_style;
let Read_Day_style;
let Read_Unit_style;
let Read_Edition_style;


let Read_E_EmailY_pos;
let Read_E_EmailX_pos;
let Read_E_EmailH;
let Read_E_EmailW;
let Read_o_EmailY_pos;
let Read_o_EmailX_pos;
let Read_o_EmailH;
let Read_o_EmailW;

let Read_E_UnitY_pos;
let Read_E_UnitX_pos;
let Read_E_UnitH;
let Read_E_UnitW;
let Read_o_UnitY_pos;
let Read_o_UnitX_pos;
let Read_o_UnitH;
let Read_o_UnitW;

let Read_E_EditionY_pos;
let Read_E_EditionX_pos;
let Read_E_EditionH;
let Read_E_EditionW;
let Read_o_EditionY_pos;
let Read_o_EditionX_pos;
let Read_o_EditionH;
let Read_o_EditionW;

let Read_E_DateY_pos;
let Read_E_DateX_pos;
let Read_E_DateH;
let Read_E_DateW;
let Read_o_DateY_pos;
let Read_o_DateX_pos;
let Read_o_DateH;
let Read_o_DateW;

let Read_E_NoY_pos;
let Read_E_NoX_pos;
let Read_E_NoH;
let Read_E_NoW;
let Read_o_NoY_pos;
let Read_o_NoX_pos;
let Read_o_NoH;
let Read_o_NoW;


readTempPreferencesToJS();

async function readTempPreferencesToJS() {
    const fs = require('fs');
    const os = require("os");
    const pref_file = os.homedir() + "\\AppData\\Local\\temp-pref.json";
    try {
        fs.readFile(pref_file, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            jsondata = JSON.parse(data);
            console.log("temp pref=", jsondata);
            const Read_Email_Even = jsondata.Even_email_Frame;
            Read_E_EmailY_pos = Read_Email_Even[0];
            Read_E_EmailX_pos = Read_Email_Even[1];
            Read_E_EmailH = Read_Email_Even[2];
            Read_E_EmailW = Read_Email_Even[3];

            const Read_Unit_Even = jsondata.Even_unit_Frame;
            Read_E_UnitY_pos = Read_Unit_Even[0];
            Read_E_UnitX_pos = Read_Unit_Even[1];
            Read_E_UnitH = Read_Unit_Even[2];
            Read_E_UnitW = Read_Unit_Even[3];

            const Read_NO_Even = jsondata.Even_no_Frame;
            Read_E_NoY_pos = Read_NO_Even[0];
            Read_E_NoX_pos = Read_NO_Even[1];
            Read_E_NoH = Read_NO_Even[2];
            Read_E_NoW = Read_NO_Even[3];

            const Read_Date_Even = jsondata.Even_date_Frame;
            Read_E_DateY_pos = Read_Date_Even[0];
            Read_E_DateX_pos = Read_Date_Even[1];
            Read_E_DateH = Read_Date_Even[2];
            Read_E_DateW = Read_Date_Even[3];
            const Read_Edition_Even = jsondata.Even_edition_Frame;
            Read_E_EditionY_pos = Read_Edition_Even[0];
            Read_E_EditionX_pos = Read_Edition_Even[1];
            Read_E_EditionH = Read_Edition_Even[2];
            Read_E_EditionW = Read_Edition_Even[3];

            const Read_Email_Odd = jsondata.Odd_email_Frame;
            Read_o_EmailY_pos = Read_Email_Odd[0];
            Read_o_EmailX_pos = Read_Email_Odd[1];
            Read_o_EmailH = Read_Email_Odd[2];
            Read_o_EmailW = Read_Email_Odd[3];
            Read_Email_style = Read_Email_Odd[4];

            const Read_Unit_odd = jsondata.Odd_unit_Frame;
            Read_o_UnitY_pos = Read_Unit_odd[0];
            Read_o_UnitX_pos = Read_Unit_odd[1];
            Read_o_UnitH = Read_Unit_odd[2];
            Read_o_UnitW = Read_Unit_odd[3];
            Read_Unit_style = Read_Unit_odd[4];

            const Read_NO_Odd = jsondata.Odd_no_Frame;

            Read_o_NoY_pos = Read_NO_Odd[0];
            Read_o_NoX_pos = Read_NO_Odd[1];
            Read_o_NoH = Read_NO_Odd[2];
            Read_o_NoW = Read_NO_Odd[3];
            Read_Number_style = Read_NO_Odd[4];

            const Read_Date_Odd = jsondata.Odd_date_Frame;
            Read_o_DateY_pos = Read_Date_Odd[0];
            Read_o_DateX_pos = Read_Date_Odd[1];
            Read_o_DateH = Read_Date_Odd[2];
            Read_o_DateW = Read_Date_Odd[3];
            Read_Year_style = Read_Date_Odd[4];
            Read_Month_style = Read_Date_Odd[5];
            Read_Date_style = Read_Date_Odd[6];
            Read_Day_style = Read_Date_Odd[7];

            const Read_Edition_Odd = jsondata.Odd_edition_Frame;

            Read_o_EditionY_pos = Read_Edition_Odd[0];
            Read_o_EditionX_pos = Read_Edition_Odd[1];
            Read_o_EditionH = Read_Edition_Odd[2];
            Read_o_EditionW = Read_Edition_Odd[3];
            Read_Edition_style = Read_Edition_Odd[4];


        });
    } catch (e) {
        console.log(e);
    }
}

// Action for save_button in admin preference panel
document.getElementById('temp-prefSave-btn').addEventListener("click", async function () {
    document.getElementById('admin-panel-form').style.display = 'none';
    const preferences = {
        "Odd_email_Frame": [o_EmailY_pos, o_EmailX_pos, o_EmailH, o_EmailW, Email_style],
        "Odd_no_Frame": [o_NoY_pos, o_NoX_pos, o_NoH, o_NoW, Number_style],
        "Odd_date_Frame": [o_DateY_pos, o_DateX_pos, o_DateH, o_DateW, Year_style, Month_style, Date_style, Day_style],
        "Odd_unit_Frame": [o_UnitY_pos, o_UnitX_pos, o_UnitH, o_UnitW, Unit_style],
        "Odd_edition_Frame": [o_EditionY_pos, o_EditionX_pos, o_EditionH, o_EditionW, Edition_style],
        "Even_email_Frame": [E_EmailY_pos, E_EmailX_pos, E_EmailH, E_EmailW],
        "Even_no_Frame": [E_NoY_pos, E_NoX_pos, E_NoH, E_NoW],
        "Even_date_Frame": [E_DateY_pos, E_DateX_pos, E_DateH, E_DateW],
        "Even_unit_Frame": [E_UnitY_pos, E_UnitX_pos, E_UnitH, E_UnitW],
        "Even_edition_Frame": [E_EditionY_pos, E_EditionX_pos, E_EditionH, E_EditionW]
    };
    writePreferencesToFile()

    async function writePreferencesToFile() {
        const fs = require('fs');
        const os = require("os");
        const appDataFolder = os.homedir() + "\\AppData\\Local\\temp-pref.json";
        console.log(appDataFolder)
        try {
            fs.writeFile(appDataFolder, JSON.stringify(preferences), {encoding: "utf-8"});
        } catch (e) {
            console.log(e);
        }
    }
});

// Read pref.json file load all path to corresponding veriables
var currentDate = new Date();
var numberOfDaysToAdd = 1;
currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1;
var day = currentDate.getDate();
if (month < 10) {
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}

// var search_filename = unit + "[" + day + "." + month + "." + year + "]" + edition + ".json";
const mlDay = {
    0: "ഞായർ",
    1: "തിങ്കൾ",
    2: "ചൊവ്വ",
    3: "ബുധൻ",
    4: "വ്യാഴം",
    5: "വെള്ളി",
    6: "ശനി",
}[currentDate.getDay()];
const mlMonth = {
    0: "ജനുവരി",
    1: "ഫെബ്രുവരി",
    2: "മാർച്ച്",
    3: "ഏപ്രിൽ",
    4: "മെയ്",
    5: "ജൂൺ",
    6: "ജൂലൈ",
    7: "ആഗസ്റ്റ്",
    8: "സെപ്റ്റംബർ",
    9: "ഒക്‌ടോബർ",
    10: "നവംബർ",
    11: "ഡിസംബർ"
}[currentDate.getMonth()];
let date = year + " " + mlMonth + " " + day + " " + mlDay
document.getElementById("C-date").value = date;
let temp_email;
let template_loc;
let odd_temp_filename;
let even_temp_filename;
fs.readFile(pref_file, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    jsondata = JSON.parse(data);
    temp_email = jsondata.email;
    template_loc = jsondata.template_path
    odd_temp_filename = jsondata.odd_temp;
    even_temp_filename = jsondata.even_temp;

});
document.getElementById("New-btn").addEventListener('click', function () {
    if (document.getElementById("C-edition").value != 0 && document.getElementById("C-Unit").value != 0) {
        if (document.getElementById("C-pageno").value != 0) {
            if (document.getElementById("C-pager").value != 0) {
                let unit = document.getElementById("C-Unit").value;
                let edition = document.getElementById("C-edition").value;
                let pageno = document.getElementById("C-pageno").value;
                let pager = document.getElementById("C-pager").value;
                let email = temp_email.replace("<p>", unit.toLowerCase());
                document.getElementById("createFile-form").style.display = 'none';

                console.log(pager)
                if (pager === "1") {
                    oddTemplateBuilder(pageno, unit, edition, year, mlMonth, day, mlDay, email)
                }
                if (pager === "2") {
                    evenTemplateBuilder(pageno, unit, edition, year, mlMonth, day, mlDay, email)
                }
                console.log("email", email);
                console.log("template", template_loc);
            } else {
                const {app} = require("indesign");
                const dialog = app.dialogs.add();
                const col = dialog.dialogColumns.add();
                const colText = col.staticTexts.add();
                colText.staticLabel = "Please Select the Page!";
                dialog.canCancel = false;
                dialog.show();
                dialog.destroy();
                return;
            }
        } else {
            const {app} = require("indesign");
            const dialog = app.dialogs.add();
            const col = dialog.dialogColumns.add();
            const colText = col.staticTexts.add();
            colText.staticLabel = "Please Insert Page Number!";
            dialog.canCancel = false;
            dialog.show();
            dialog.destroy();
            return;
        }

    } else {
        const {app} = require("indesign");
        const dialog = app.dialogs.add();
        const col = dialog.dialogColumns.add();
        const colText = col.staticTexts.add();
        colText.staticLabel = "Unit or Edition is not Selected! Please Check...";
        dialog.canCancel = false;
        dialog.show();
        dialog.destroy();
        return;
    }
});

async function oddTemplateBuilder(pageno, unit, edition, year, mlMonth, day, mlDay, email) {
    const {localFileSystem} = require('uxp').storage;
    const {app} = require('indesign');
    const new_doc = await localFileSystem.getEntryWithUrl(template_loc + "\\" + odd_temp_filename);
    if (new_doc) {
        const doc = app.open(new_doc);
        const EmailFrame = doc.textFrames.add();
        const UnitFrame = doc.textFrames.add();
        const EditionFrame = doc.textFrames.add();
        const DateFrame = doc.textFrames.add();
        const NOFrame = doc.textFrames.add();
        EmailFrame.geometricBounds = [Read_o_EmailY_pos, Read_o_EmailX_pos, Read_o_EmailY_pos + Read_o_EmailH, Read_o_EmailX_pos + Read_o_EmailW];
        EmailFrame.contents = "<*>"+"email:" + "\r" + email;
        await EmailStyler(Read_Email_style,EmailFrame.parentStory);

        UnitFrame.geometricBounds = [Read_o_UnitY_pos, Read_o_UnitX_pos, Read_o_UnitY_pos + Read_o_UnitH, Read_o_UnitX_pos + Read_o_UnitW];
        UnitFrame.contents = "<*>"+unit+"</*>";
        await FunStyler(Read_Unit_style,UnitFrame.parentStory);
        DateFrame.geometricBounds = [Read_o_DateY_pos, Read_o_DateX_pos, Read_o_DateY_pos + Read_o_DateH, Read_o_DateX_pos + Read_o_DateW];
        DateFrame.contents = "<Y>"+year+"</Y>"+" "+"<m>"+mlMonth+"</m>"+" "+"<D>"+day+"</D>"+" "+"<d>"+mlDay+"</d>";
        await date_styler( Read_Year_style, Read_Month_style, Read_Date_style, Read_Day_style,DateFrame.parentStory);

        NOFrame.geometricBounds = [Read_o_NoY_pos, Read_o_NoX_pos, Read_o_NoY_pos + Read_o_NoH, Read_o_NoX_pos + Read_o_NoW];
        NOFrame.contents = "<*>"+pageno+"</*>";
        await FunStyler(Read_Number_style,NOFrame.parentStory);

        if (edition === "2") {
            EditionFrame.geometricBounds = [Read_o_EditionY_pos, Read_o_EditionX_pos, Read_o_EditionY_pos + Read_o_EditionH, Read_o_EditionX_pos + Read_o_EditionW];
            EditionFrame.contents = "<*>"+"**"+"</*>";
            await FunStyler(Read_Edition_style,EditionFrame.parentStory);

        } else if (edition === "3") {
            EditionFrame.geometricBounds = [Read_o_EditionY_pos, Read_o_EditionX_pos, Read_o_EditionY_pos + Read_o_EditionH, Read_o_EditionX_pos + Read_o_EditionW];
            EditionFrame.contents = "<*>"+"***"+"</*>";
            await FunStyler(Read_Edition_style,EditionFrame.parentStory);

        } else if (edition === "4") {
            EditionFrame.geometricBounds = [Read_o_EditionY_pos, Read_o_EditionX_pos, Read_o_EditionY_pos + Read_o_EditionH, Read_o_EditionX_pos + Read_o_EditionW];
            EditionFrame.contents = "<*>"+"****"+"</*>";
            await FunStyler(Read_Edition_style,EditionFrame.parentStory);


        } else if (edition === "5") {
            EditionFrame.geometricBounds = [Read_o_EditionY_pos, Read_o_EditionX_pos, Read_o_EditionY_pos + Read_o_EditionH, Read_o_EditionX_pos + Read_o_EditionW];
            EditionFrame.contents = "<*>"+"*****"+"</*>";
            await FunStyler(Read_Edition_style,EditionFrame.parentStory);


        } else {
            return;
        }
    } else {
        console.log("Template is not found!")
    }
}

async function evenTemplateBuilder(pageno, unit, edition, year, mlMonth, day, mlDay, email) {
    console.log(pageno, unit, edition, year, mlMonth, day, mlDay, email)
    const {localFileSystem} = require('uxp').storage;
    const {app} = require('indesign');
    const new_doc = await localFileSystem.getEntryWithUrl(template_loc + "\\" + even_temp_filename);
    console.log("<Y>"+year+"</Y>"+"\t"+"<m>"+month+"</m>"+"\t"+"<D>"+date+"</D>"+"\t"+"<d>"+day+"</d>");
    if (new_doc) {
        const doc = app.open(new_doc);
        const EmailFrame = doc.textFrames.add();
        const UnitFrame = doc.textFrames.add();
        const EditionFrame = doc.textFrames.add();
        const DateFrame = doc.textFrames.add();
        const NOFrame = doc.textFrames.add();
        EmailFrame.geometricBounds = [Read_E_EmailY_pos, Read_E_EmailX_pos, Read_E_EmailY_pos + Read_E_EmailH, Read_E_EmailX_pos + Read_E_EmailW];
        EmailFrame.contents = "<*>"+"email:" + "\r" + email;
        await EmailStyler(Read_Email_style,EmailFrame.parentStory);



        UnitFrame.geometricBounds = [Read_E_UnitY_pos, Read_E_UnitX_pos, Read_E_UnitY_pos + Read_E_UnitH, Read_E_UnitX_pos + Read_E_UnitW];
        UnitFrame.contents = "<*>"+unit+"</*>";
        await FunStyler(Read_Unit_style,UnitFrame.parentStory);

        DateFrame.geometricBounds = [Read_E_DateY_pos, Read_E_DateX_pos, Read_E_DateY_pos + Read_E_DateH, Read_E_DateX_pos + Read_E_DateW];
        DateFrame.contents = "<Y>"+year+"</Y>"+" "+"<m>"+mlMonth+"</m>"+" "+"<D>"+day+"</D>"+" "+"<d>"+mlDay+"</d>";
        await date_styler( Read_Year_style, Read_Month_style, Read_Date_style, Read_Day_style,DateFrame.parentStory);


        NOFrame.geometricBounds = [Read_E_NoY_pos, Read_E_NoX_pos, Read_E_NoY_pos + Read_E_NoH, Read_E_NoX_pos + Read_E_NoW];
        NOFrame.contents = "<*>"+pageno+"</*>";
        await FunStyler(Read_Number_style,NOFrame.parentStory);


        if (edition === "2") {
            EditionFrame.geometricBounds = [Read_E_EditionY_pos, Read_E_EditionX_pos, Read_E_EditionY_pos + Read_E_EditionH, Read_E_EditionX_pos + Read_E_EditionW];
            EditionFrame.contents = "<*>"+"**"+"</*>";
            await FunStyler(Read_Edition_style,EditionFrame.parentStory);


        } else if (edition === "3") {
            EditionFrame.geometricBounds = [Read_E_EditionY_pos, Read_E_EditionX_pos, Read_E_EditionY_pos + Read_E_EditionH, Read_E_EditionX_pos + Read_E_EditionW];
            EditionFrame.contents = "<*>"+"***"+"</*>";
            await FunStyler(Read_Edition_style,EditionFrame.parentStory);


        } else if (edition === "4") {
            EditionFrame.geometricBounds = [Read_E_EditionY_pos, Read_E_EditionX_pos, Read_E_EditionY_pos + Read_E_EditionH, Read_E_EditionX_pos + Read_E_EditionW];
            EditionFrame.contents = "<*>"+"****"+"</*>";
            await FunStyler(Read_Edition_style,EditionFrame.parentStory);


        } else if (edition === "5") {
            EditionFrame.geometricBounds = [Read_E_EditionY_pos, Read_E_EditionX_pos, Read_E_EditionY_pos + Read_E_EditionH, Read_E_EditionX_pos + Read_E_EditionW];
            EditionFrame.contents = "<*>"+"*****"+"</*>";
            await FunStyler(Read_Edition_style,EditionFrame.parentStory);


        } else {
            return;
        }

    } else {
        console.log("Template is not found!")
    }

}

async function date_styler(Read_Year_style, Read_Month_style, Read_Date_style, Read_Day_style,data)
{
    let {app} = require("indesign");

    const doc = app.activeDocument;
    try{
        var contents = data.contents;
        var index0= contents.indexOf ("<Y>", 0);
        var index1= contents.indexOf("</Y>",0);
        var index2= contents.indexOf ("<m>", 0);
        var index3= contents.indexOf ("</m>", 0);
        var index4= contents.indexOf ("<D>", 0);
        var index5= contents.indexOf ("</D>", 0);
        var index6= contents.indexOf ("<d>", 0);
        var index7= contents.indexOf ("</d>", 0);
        if(index0 >= 0 && index1>=0)
        {
            for(var cnt =index0; cnt < index1; cnt++){

                var dataYear = data.characters.item(cnt);
                console.log("data Found year")
                dataYear.appliedCharacterStyle = doc.characterStyles.itemByName(Read_Year_style);
			}
            
        }
        if(index2 >= 0 && index3>=0)
        {
            for(var cnt =index2; cnt < index3; cnt++){

                var dataMonth = data.characters.item(cnt);
                console.log("data Found month")
                dataMonth.appliedCharacterStyle = doc.characterStyles.itemByName( Read_Month_style);

			}
            
        }
        if(index4 >= 0 && index5>=0)
        {
            for(var cnt =index4; cnt < index5; cnt++){

                var dataDate = data.characters.item(cnt);
                console.log("data Found Date")

                dataDate.appliedCharacterStyle = doc.characterStyles.itemByName( Read_Date_style);

			}
            
        }
        if(index6 >= 0 && index7>=0)
        {
            for(var cnt =index6; cnt < index7; cnt++){

                var dataDay = data.characters.item(cnt);
                console.log("data Found day")
                dataDay.appliedCharacterStyle = doc.characterStyles.itemByName(Read_Day_style);
			}
            
        }


        if(index6 >= 0)
        {
            var cont7 = data.characters.itemByRange(index7,index7+3);
            cont7.remove();

            var cont6 = data.characters.itemByRange(index6,index6+2);
            cont6.remove();
        }
        if(index4 >= 0)
        {
            var cont5 = data.characters.itemByRange(index5,index5+3);
            cont5.remove();

            var cont4 = data.characters.itemByRange(index4,index4+2);
            cont4.remove();
        }
        if(index2 >= 0)
        {
            var cont3 = data.characters.itemByRange(index3,index3+3);
            cont3.remove();

            var cont2 = data.characters.itemByRange(index2,index2+2);
            cont2.remove();
        }

        if(index0 >= 0)
        {
            var cont1 = data.characters.itemByRange(index1,index1+3);
            cont1.remove();

            var cont = data.characters.itemByRange(index0,index0+2);
            cont.remove();
        }

}
catch (e)
{
    console.log("error",e)
}
}


async function FunStyler(Style,data)
{

    let {app} = require("indesign");

    const doc = app.activeDocument;
    try{
        var contents = data.contents;
        var index0= contents.indexOf ("<*>", 0);
        var index1= contents.indexOf("</*>",0);
        if(index0 >= 0 && index1>=0)
        {
            for(var cnt =index0; cnt < index1; cnt++){

                var F_data = data.characters.item(cnt);
                console.log("data Found year")
                F_data.appliedCharacterStyle = doc.characterStyles.itemByName(Style);
			}
            
        }
        if(index0 >= 0)
        {
            var cont1 = data.characters.itemByRange(index1,index1+3);
            cont1.remove();

            var cont = data.characters.itemByRange(index0,index0+2);
            cont.remove();
        }

    }
    catch (e)
    {
        console.log("error",e);
    }
}



async function EmailStyler(Style,data)
{

    let {app} = require("indesign");

    const doc = app.activeDocument;
    try{
        var contents = data.contents;
        var index0= contents.indexOf ("<*>", 0);
        if(index0 >= 0)
        {
            var lstPara = data.characters.item(index0).paragraphs.item(0);
            lstPara.appliedParagraphStyle = doc.paragraphStyles.itemByName(Style);
        }
        if(index0 >= 0)
        {
            var cont1 = data.characters.itemByRange(index0,index0+2);
            cont1.remove();

        }

    }
    catch (e)
    {
        console.log("error",e);
    }
}