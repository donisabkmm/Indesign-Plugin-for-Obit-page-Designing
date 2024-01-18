 async function flowadsWithPhoto(adobject)
 {
    console.log("flowadsWithPhoto",adobject);
    var groupBox;
    let {app} = require("indesign");
    try
    {
        var content = adobject.content;
        var photo = adobject.photo;
        var name = adobject.name;
        var place = adobject.place;
        fs.readFile(content, 'utf-8').then((data) => {
            if(data)
            {
                const y1 = 1.4;
                const y2 = y1+4;
                const x1 = 0;
                const x2 =x1+2.985;
                var doc = app.activeDocument;
                var ObitBody = doc.paragraphStyles.item("ObitBody");
                var ObitHead = doc.paragraphStyles.item("ObitHead");
                var SubHeadLine = doc.paragraphStyles.item("SubHeadLine");
                var District_Style = doc.paragraphStyles.item("District_Style");
                var ObitPlace = doc.characterStyles.item("ObitPlace");
                var textFrame = doc.textFrames.add();

                textFrame.contents = name;
                textFrame.geometricBounds = [y1, x1,y2, x2];   
                var fname = textFrame.contents;
                fname.appliedParagraphStyle = ObitHead;



                
            } 
            else
            {
                console.log("data not found")
            }
        })
        
    }
    catch (e)
    {
        console.log(e);
    }

 }