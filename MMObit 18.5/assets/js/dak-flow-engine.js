// Developed by Donis Abraham
// Developer at Malayala Manorama
// Date 10-10-2023


// Initialize global variables
let delimited_data = {};
let idList = [];
let includedList = [];
let excludedList = [];
let unit = '';
let media_path = '';
let rtf_path = '';
let final_delimited_path = ""
let delimited_path = ""
let storyLoc = ''
let imageLoc = ''
let selectedTextFrame;
let statusReady = false;
let xpos;
let ypos;


//  Ready selector code pending
function readySelector()
{
    if(statusReady === false)
    {
        document.getElementById("dak-ready").innerHTML = "UnReady"
    }
    else
    {
        document.getElementById("dak-ready").innerHTML = "Ready"
    
    }
}
readySelector()


document.getElementById("dak-ready").addEventListener('click', async function(){
    if(document.getElementById("dak-ready").innerHTML === "UnReady")
    {
        statusReady=true;
        readySelector();
    }
    else
    {
        statusReady=false;
        readySelector();
    }

})

// Read pref.json file load all path to corresponding veriables
const fs = require('fs');
const os = require("os");
const pref_file = os.homedir() + "\\AppData\\Local\\app-pref.json";
fs.readFile(pref_file, 'utf8', (err, data) => {
    if (err) 
    {
    console.log(err);
    return;
    }
    jsondata = JSON.parse(data)
    delimited_path = jsondata.delimited_path;
    rtf_path = jsondata.rtf_path;
    media_path = jsondata.media_path;
});


// Action for import button
document.getElementById("ads-import").addEventListener('click', async function () {
    while (excludedList.length > 0) {
        excludedList.pop()
    }
    document.getElementById("includeAd_list").innerHTML = "";
    document.getElementById("excludeAd_list").innerHTML = "";
    document.getElementById("total_included").innerHTML = "";
    document.getElementById("total_excluded").innerHTML = "";
    document.getElementById("select_all_included").checked = false;
    unit = document.getElementById("Unit").value;
    const edition = document.getElementById("Editon").value;
    if (unit != 0 && edition != 0) {
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
        var search_filename = unit + "[" + day + "." + month + "." + year + "]" + edition + ".json";
        final_delimited_path = delimited_path + "\\" + search_filename
        delimited_json_reader(final_delimited_path);
    } else {
        const { app } = require("indesign");
        const dialog = app.dialogs.add();
        const col = dialog.dialogColumns.add();
        const colText = col.staticTexts.add();
        colText.staticLabel = "Please select a unit and corresponding edition";
        dialog.canCancel = false;
        dialog.show();
        dialog.destroy();
        return;
    }
})


// Function for reading delimited_json file
async function delimited_json_reader(delimited_file) {
    try {
        const fs = require('fs');
        fs.readFile(delimited_file, 'utf8', (err, data) => {
            if (err) 
            {
                const { app } = require("indesign");
                const dialog = app.dialogs.add();
                const col = dialog.dialogColumns.add();
                const colText = col.staticTexts.add();
                colText.staticLabel = err + "!  Please generate delimited file...";
                dialog.canCancel = false;
                dialog.show();
                dialog.destroy();
                return;
            }
            delimited_data = JSON.parse(data)
            while (idList.length > 0) {
                idList.pop()
            }
            while (includedList.length > 0) {
                includedList.pop()
            }
            for (const key in delimited_data) {
                idList.push(delimited_data[key].id);
                includedList.push(delimited_data[key].id);
            }
            includedList_display(includedList); // Calling function for display includedList
            change_innerhtml(); // Calling function for  change value in innerhtml
        });
    } catch (e) {
        console.log(e);
    }
}


// Function to display list in includedAd_box
function includedList_display(list) {
    document.getElementById("includeAd_list").innerHTML = "";
    change_innerhtml(); // Calling function for  change value in innerhtml
    const container = document.querySelector("#includeAd_list");
    const ol = document.createElement("ol");
    for (const item of list) {
        const li = document.createElement("li");
        const checkbox = document.createElement("sp-checkbox");
        checkbox.id = item
        checkbox.className = "sp-checkbox-list-included";
        checkbox.onclick = function () {
            preview_story(checkbox.id);
        };
        checkbox.innerHTML = item
        li.appendChild(checkbox);
        ol.appendChild(li);
    }
    container.appendChild(ol);
}


// Function to display list in excludedAd_box
function excludedList_display(list) {
    document.getElementById("excludeAd_list").innerHTML = "";
    change_innerhtml();

    const container = document.querySelector("#excludeAd_list");
    const ol = document.createElement("ol");
    for (const item of list) {
        const li = document.createElement("li");
        const checkbox = document.createElement("sp-checkbox");

        checkbox.id = item;
        checkbox.innerHTML = item;
        checkbox.className = "sp-checkbox-list-excluded";
        checkbox.onclick = function () {
            preview_story(checkbox.id);
        };

        li.appendChild(checkbox);
        ol.appendChild(li);
    }

    container.appendChild(ol);
}


// Function to change innerhtml value  
function change_innerhtml() {
    document.getElementById("total_included").innerHTML = includedList.length;
    document.getElementById("total_excluded").innerHTML = excludedList.length;
}


// Function to preview selected story
async function preview_story(AdID) {
    clear_all_data();
    const findDataById = (data, id) => {
        for (const key in data) {
            if (data[key].id === id) {
                return data[key].data;
            }
        }
        return null;
    };
    const dataElement = findDataById(delimited_data, AdID);
    // var flowId = dataElement.flow_id;
    // var district = dataElement.district;
    var name = dataElement.name;
    var place = dataElement.place;
    var position = dataElement.position;
    storyLoc = dataElement.story_loc;
    imageLoc = dataElement.image_loc;
    // var col = dataElement.col;
    document.getElementById("story-id").innerHTML = AdID;
    document.getElementById("story-name").innerHTML = name;
    document.getElementById("story-place").innerHTML = place;
    document.getElementById("story-position").innerHTML = position;
    const locsrc = media_path + "\\" + imageLoc;
    const clearsrc = media_path + "\\" + "placeholder.jpeg";
    const data= await fs.readFile(rtf_path + "\\" + storyLoc, 'utf8').then((data) => {
        return data;
    })
    document.getElementById("story-content").innerHTML = data;

    if (imageLoc != 0) {
        // console.log("Found Media File", imageLoc)
        document.getElementById("image").src = `file://${locsrc}`;
    } else {
        // console.log("image null",)
        document.getElementById("image").src = `file://${clearsrc}`;
    }
}


//  Eventlistener to perform a function while excludedAd is clicked
document.getElementById("excludeAd").addEventListener('click', async function () {
    document.getElementById("select_all_included").checked = false;
    document.getElementById("select_all_excluded").checked = false;
    document.getElementById("excludeAd_list").innerHTML = "";
    const sp_checkboxes = document.querySelectorAll('sp-checkbox');

    sp_checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            excludedList.push(checkbox.id);
            includedList = includedList.filter(item => item !== checkbox.id)
        }

    });
    excludedList.sort((x, y) => {
        const lasta = parseInt(x.split("_").pop());
        const lastb = parseInt(y.split("_").pop());

        return lasta - lastb;
    });
    excludedList_display(excludedList);
    includedList_display(includedList);
});


//  Eventlistener to perform a function while includedAd is clicked
document.getElementById("includeAd").addEventListener('click', async function () {
    document.getElementById("select_all_included").checked = false;
    document.getElementById("select_all_excluded").checked = false;
    document.getElementById("includeAd_list").innerHTML = "";
    const sp_checkboxes = document.querySelectorAll('sp-checkbox');

    sp_checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            includedList.push(checkbox.id);
            excludedList = excludedList.filter(item => item !== checkbox.id)
        }

    });
    includedList.sort((x, y) => {
        const lasta = parseInt(x.split("_").pop());
        const lastb = parseInt(y.split("_").pop());

        return lasta - lastb;
    });
    excludedList_display(excludedList);
    includedList_display(includedList);
});


// Eventlistener to perform a function while select_all_included is checked or uncheck
document.getElementById("select_all_included").addEventListener('click', async function () {
    if (document.getElementById("select_all_included").checked) {
        const sp_checkboxes = document.querySelectorAll('.sp-checkbox-list-included');
        sp_checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        })
    } else {
        const sp_checkboxes = document.querySelectorAll('.sp-checkbox-list-included');
        sp_checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        })
    }

});


// Eventlistener to perform a function while select_all_excluded is checked or uncheck
document.getElementById("select_all_excluded").addEventListener('click', async function () {
    if (document.getElementById("select_all_excluded").checked) {
        const sp_checkboxes = document.querySelectorAll('.sp-checkbox-list-excluded');
        sp_checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        })
    } else {
        const sp_checkboxes = document.querySelectorAll('.sp-checkbox-list-excluded');
        sp_checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        })
    }

});

// Function to clear innerHTML in story-preview box
function clear_all_data() {
    const clearsrc = ""
    document.getElementById("story-id").innerHTML = "";
    document.getElementById("story-name").innerHTML = "";
    document.getElementById("story-place").innerHTML = "";
    document.getElementById("story-position").innerHTML = "";
    document.getElementById("story-content").innerHTML = "";
}

let widthCol;
// Eventlistener to perform a function while dak-flow button is clicked
document.getElementById("dak-flow").addEventListener('click', async function () {
    let {app} = require("indesign");
    if(includedList.length>0)
    {
        try {
            selectedTextFrame = app.selection[0];
            
            if (selectedTextFrame!=null) {
                ColYPosupdate(selectedTextFrame);
                widthCol=selectedTextFrame.textFramePreferences.textColumnFixedWidth;
                const flowFrameBounds = selectedTextFrame.geometricBounds;
                ypos=flowFrameBounds[0];
                xpos=flowFrameBounds[1];
                console.log("flowFrameBounds",flowFrameBounds);
                console.log(xpos);
                console.log(ypos);
                const widthInCm = (Math.round(((selectedTextFrame.geometricBounds[3] - selectedTextFrame.geometricBounds[1])/28.346) * 100)/100)
                const heightInCm = (Math.round(((selectedTextFrame.geometricBounds[2] - selectedTextFrame.geometricBounds[0])/28.346) * 100)/100)
                const textColumnCount = selectedTextFrame.textFramePreferences.textColumnCount;
                document.getElementById("confirm-box").show();
                document.getElementById("confirmTxt").innerHTML = "Are you sure! You want flow "+ includedList.length +" ads in select TextFrame...."
                document.getElementById("colTxt").innerHTML = "No of Columns: " + textColumnCount;
                document.getElementById("heightTxt").innerHTML = "TextFrame Height: " + heightInCm + " CM";
                document.getElementById("widthTxt").innerHTML = "TextFrame Width: " + widthInCm + " CM";
              
            } 
            else 
            {
                const dialog = app.dialogs.add();
                const col = dialog.dialogColumns.add();
                const colText = col.staticTexts.add();
                colText.staticLabel = "Please select a TextFrame to flow Obituary Ads";
                dialog.canCancel = false;
                dialog.show();
                dialog.destroy();
                return;
            }
    
        } catch (e) {
            console.log(e);
        }
    }
    else
    {
        const { app } = require("indesign");
        const dialog = app.dialogs.add();
        const col = dialog.dialogColumns.add();
        const colText = col.staticTexts.add();
        colText.staticLabel = "Please select some Ads to flow in the selected TextFrame....";
        dialog.canCancel = false;
        dialog.show();
        dialog.destroy();
        return;
    }

})

                    // <----Indesign Templating  JSEngine---->
                // Functions for Flow Ads in indesign selected Textframes

// Eventlistener to perform a function while flowadsTotextFrame button is clicked
document.getElementById("flowadsTotextFrame").addEventListener('click', async function () {
    document.getElementById("confirm-box").close();
    try
    {
        if(includedList)
        {
            let ads = 0;
            // console.log("list=",includedList)
            //  includedList.forEach( async ads=>{
                while(ads< includedList.length)
                {
                    if (includedList[ads])
                    {

                        await AdBuilder(includedList[ads]);
                    }
                    ads++;
                }
                
        }
        else
            {
                const dialog = app.dialogs.add();
                const col = dialog.dialogColumns.add();
                const colText = col.staticTexts.add();
                colText.staticLabel = "Please check you are selected any delimted file or Ads";
                dialog.canCancel = false;
                dialog.show();
                dialog.destroy();
                return;
            }
    }
    catch(e)
    {
        console.log(e);
    }

    

})

// Eventlistener to perform a function while NoAdFlow button is clicked
document.getElementById("NoAdFlow").addEventListener('click', function () {
    document.getElementById("confirm-box").close();
})


let ads_id;
let ads_photo;
let ads_name;
let ads_place;
let ads_position;
let adsobject={};


// Function AdSelector helps to select Ads Content that we want to flow in indesign selected frame 
async function AdBuilder(AdsID) {

    const findDataById = (data, id) => {
        for (const key in data) {
            if (data[key].id === id) {
                return data[key].data;
            }
        }
        return null;
    };
 
    const dataElement = findDataById(delimited_data, AdsID);
    ads_id= AdsID;
    ads_name = dataElement.name;
    ads_place = dataElement.place;
    ads_position = dataElement.position;
    ads_col = dataElement.col;
    ads_photo = media_path + "\\" + dataElement.image_loc;
    const rtf_locT = rtf_path + "\\" + dataElement.story_loc
    const ads_FrameContent= await fs.readFile(rtf_locT, 'utf8').then((data) => {
        return data;
    })
    adsobject={
        "AdsID":ads_id,
        "name":ads_name,
        "place":ads_place,
        "photo":ads_photo,
        "content":ads_FrameContent,
        "position":ads_position,
        "col":ads_col
    }

    console.log(typeof(ads_photo))
    if(dataElement.image_loc!=0)
        {
            flowadsWithPhoto(adsobject)
        }
        else
        {
            flowadsWithOutPhoto(adsobject)
        }
 }

 async function flowadsWithPhoto(adobject)
{
    try
    {
        
        var headline = adobject.name;
        var place = adobject.place;
        var rtfFile = adobject.content;
        var finalads = "<*>"+headline+"</*>"+"\r"+"<**>"+place+": "+"</**>"+"<***>"+rtfFile+"</***>"
        var MediaPath = adobject.photo;
        var adsID = adobject.AdsID;
        var col = adobject.col;
        let {app,FitOptions,AutoSizingTypeEnum  } = require("indesign");
        do
        {
            let grpbox;
            try
            {
                var doc = app.activeDocument;
                var IDSNImgFrame= doc.rectangles.add();
                IDSNImgFrame.geometricBounds =  [80,-600,100,-708];
                IDSNImgFrame.place(MediaPath);
                var ImgBounds = IDSNImgFrame.geometricBounds;
                ImgBounds[3]= ImgBounds[1] + widthCol;
                ImgBounds[2]= ImgBounds[0] + 68.0315;
                IDSNImgFrame.geometricBounds =  ImgBounds;
                IDSNImgFrame.fit(FitOptions.CONTENT_TO_FRAME);
                IDSNadFrame = doc.textFrames.add();
                IDSNadFrame.geometricBounds= [IDSNImgFrame.geometricBounds[2], IDSNImgFrame.geometricBounds[1], 150, (IDSNImgFrame.geometricBounds[1]+widthCol-.2)]
                IDSNadFrame.contents= finalads.toString();
                IDSNadFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;           
                applyStyleToAdText(IDSNadFrame.parentStory);
                var IDSNadFrameBounds = IDSNadFrame.geometricBounds;
                console.log(IDSNadFrameBounds);
                console.log(ImgBounds)
                var cx=ImgBounds[2]-IDSNadFrameBounds[0];
                console.log(cx)
                IDSNadFrameBounds[0]=IDSNadFrameBounds[0]+cx;
                IDSNadFrameBounds[2]=IDSNadFrameBounds[2]+cx;
                console.log(IDSNadFrameBounds[2]);
                IDSNadFrame.geometricBounds = IDSNadFrameBounds;
                var grparray = new Array;
                grparray.push(IDSNImgFrame);
                grparray.push(IDSNadFrame);
                grpbox =  doc.groups.add(grparray);
                grpbox.label = "OBIT:"+ adsID;
                adFlowColWise(grpbox,col)
            }
            catch (e)
            {
                console.log(e);
            }
        }    
        while(false);
    } 
    catch (e)
    {
        console.log(e);
    }

 }
 async function flowadsWithOutPhoto(adobject)
 {
    try
    {
        var headline = adobject.name;
        var place = adobject.place;
        var rtfFile = adobject.content;
        var finalads = "<*>"+headline+"</*>"+"\r"+"<**>"+place+": "+"</**>"+"<***>"+rtfFile+"</***>"
        var adsID = adobject.AdsID;
        var col = adobject.col;
        let {app,AutoSizingTypeEnum  } = require("indesign");
        do
        {
            let IDSNadFrame;
            try
            {
                var doc = app.activeDocument;
                IDSNadFrame = doc.textFrames.add();
                IDSNadFrame.geometricBounds=[5,-600,30,(-600 + widthCol)]
                IDSNadFrame.contents= finalads.toString();
                IDSNadFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;       
                applyStyleToAdText(IDSNadFrame.parentStory);    
                IDSNadFrame.label = "OBIT:"+ adsID;
                adFlowColWise(IDSNadFrame,col)
            }
            catch (e)
            {
                console.log(e);
            }
        }    
        while(false);
    } 
    catch (e)
    {
        console.log(e);
    }
 }

function applyStyleToAdText(theStory)
{
    let {app} = require("indesign");

    const doc = app.activeDocument;
    try{
        var contents = theStory.contents;

        var index= contents.indexOf ("<*>", 0);
        var index1= contents.indexOf("</*>",0);
        var index2= contents.indexOf ("<**>", 0);
        var index3= contents.indexOf ("</**>", 0);
        var index4= contents.indexOf ("<***>", 0);
        var index5= contents.indexOf ("</***>", 0);

 
     

        if(index2 >= 0)
        {
            var lstPara = theStory.characters.item(index2).paragraphs.item(0);
            lstPara.appliedParagraphStyle = doc.paragraphStyles.itemByName("ObitBody");
            if(index2 >= 0 && index3 >= 0)
        {

            for(var cnt =index2; cnt < index3; cnt++){

                var ch = theStory.characters.item(cnt);
				ch.appliedCharacterStyle = doc.characterStyles.itemByName("ObitPlace");

			}
        }
        }
        
        if(index >= 0 && index1>=0)
        {
            for(var cnt =index; cnt < index1; cnt++){

                var thePara = theStory.characters.item(cnt).paragraphs.item(0);
                thePara.appliedParagraphStyle = doc.paragraphStyles.itemByName("ObitHead");

			}
            
        }
        if(index4 >= 0)
        {
            var cont5 = theStory.characters.itemByRange(index5,index5+5);
            cont5.remove();

            var cont4 = theStory.characters.itemByRange(index4,index4+4);
            cont4.remove();
        }

        if(index2 >= 0)
        {
            var cont3 = theStory.characters.itemByRange(index3,index3+4);
            cont3.remove();

            var cont2 = theStory.characters.itemByRange(index2,index2+3);
            cont2.remove();
        }

        if(index >= 0)
        {
            var cont1 = theStory.characters.itemByRange(index1,index1+3);
            cont1.remove();

            var cont = theStory.characters.itemByRange(index,index+2);
            cont.remove();
        }
    }
    catch(e)
    {
        //alert(e);
        console.log(e)
    }
}
let FlowCol0Y;
let FlowCol1Y;
let FlowCol2Y;
let FlowCol3Y;
let FlowCol4Y;
let FlowCol5Y;
let FlowCol6Y;
let FlowCol7Y;
let FlowCol8Y;
let FlowCol9Y;
async function ColYPosupdate(selectedFrame)
{
    const FlowFrameBounds = selectedFrame.geometricBounds;
    FlowCol0Y = FlowFrameBounds[0];
    FlowCol1Y = FlowFrameBounds[0];
    FlowCol2Y = FlowFrameBounds[0];
    FlowCol3Y = FlowFrameBounds[0];
    FlowCol4Y = FlowFrameBounds[0];
    FlowCol5Y = FlowFrameBounds[0];
    FlowCol6Y = FlowFrameBounds[0];
    FlowCol7Y = FlowFrameBounds[0];
    FlowCol8Y = FlowFrameBounds[0];
    FlowCol9Y = FlowFrameBounds[0];
    console.log("FCDfsDF",FlowCol0Y,FlowCol1Y,FlowCol9Y)
}




function XAxisGenerator(n,xpos,x1pos) {
    const XposList = []; 
    XposList[0] = xpos;
    XposList[1] = x1pos;

    for (let i = 2; i < n; i++) {
        const result=XposList[i-1]+x1pos;
        XposList.push(result);
    }

    return XposList; 
}





async function adFlowColWise(adsGrpFile,col)
{

var grpbox = adsGrpFile;
let {app} = require("indesign");
let doc = app.activeDocument;
let FlowFrame = doc.selection[0]; 
const colwidth=FlowFrame.textFramePreferences.textColumnFixedWidth;
const colGutter = FlowFrame.textFramePreferences.textColumnGutter;
let ColCount = FlowFrame.textFramePreferences.textColumnCount;
const x1pos = colwidth+colGutter;
const Flowbounds = grpbox.geometricBounds;
const grpbox_h = Flowbounds[2]-Flowbounds[0];
const XposList = XAxisGenerator(ColCount,xpos,x1pos);
if(col==="1")
{
let PlaceX1=XposList[0];
let PlaceY1=FlowCol0Y;
let PlaceY2 = PlaceY1+grpbox_h;
grpbox.move([PlaceX1,PlaceY1]);
FlowCol0Y=PlaceY2+3;
}
else if(col==="2")
{
    let PlaceX1=XposList[1];
    let PlaceY1=FlowCol1Y;
    let PlaceY2 = PlaceY1+grpbox_h;
    grpbox.move([PlaceX1,PlaceY1]);
    FlowCol1Y=PlaceY2+3;
}
else if(col==="3")
{
    let PlaceX1=XposList[2];
    let PlaceY1=FlowCol2Y;
    let PlaceY2 = PlaceY1+grpbox_h;
    grpbox.move([PlaceX1,PlaceY1]);
    FlowCol2Y=PlaceY2+3;
}
else if(col==="4")
{
    let PlaceX1=XposList[3];
    let PlaceY1=FlowCol3Y;
    let PlaceY2 = PlaceY1+grpbox_h;
    grpbox.move([PlaceX1,PlaceY1]);
    FlowCol3Y=PlaceY2+3;
}
else if(col==="5")
{
    let PlaceX1=XposList[4];
    let PlaceY1=FlowCol4Y;
    let PlaceY2 = PlaceY1+grpbox_h;
    grpbox.move([PlaceX1,PlaceY1]);
    FlowCol4Y=PlaceY2+3;
}
else if(col==="6")
{
    let PlaceX1=XposList[5];
    let PlaceY1=FlowCol5Y;
    let PlaceY2 = PlaceY1+grpbox_h;
    grpbox.move([PlaceX1,PlaceY1]);
    FlowCol5Y=PlaceY2+3;
}
else if(col==="7")
{
    let PlaceX1=XposList[6];
    let PlaceY1=FlowCol6Y;
    let PlaceY2 = PlaceY1+grpbox_h;
    grpbox.move([PlaceX1,PlaceY1]);
    FlowCol6Y=PlaceY2+3;
}
else if(col==="8")
{
    let PlaceX1=XposList[7];
    let PlaceY1=FlowCol7Y;
    let PlaceY2 = PlaceY1+grpbox_h;
    grpbox.move([PlaceX1,PlaceY1]);
    FlowCol7Y=PlaceY2+3;
}
else if(col=="9")
{
    let PlaceX1=XposList[8];
    let PlaceY1=FlowCol8Y;
    let PlaceY2 = PlaceY1+grpbox_h;
    grpbox.move([PlaceX1,PlaceY1]);
    FlowCol8Y=PlaceY2+3;
}
else if(col=="10")
{
    let PlaceX1=XposList[9];
    let PlaceY1=FlowCol9Y;
    let PlaceY2 = PlaceY1+grpbox_h;
    grpbox.move([PlaceX1,PlaceY1]);
    FlowCol9Y=PlaceY2+3;
}
else 
{
    return 0;
}

}