/* setTimeout(function() { 
    document.body.style.border = "5px solid red";
    document.evaluate('/html/body/form/div[22]/table/tbody/tr/td[1]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.src = "seila";
    //document.getElementById("Cabecalho").innerHTML = "<p>teste</p>";
    console.log("seila");
    }, 2000); */

function verifyHeaderElement() {
    return document.evaluate('/html/body/form/div[22]/table/tbody/tr/td[1]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue == null;
}

console.log(verifyHeaderElement());

var updateHeader = function() {
    console.log('seila');
    if (verifyHeaderElement()) {
        setTimeout(updateHeader, 100);
    } 
    else {
        console.log('passou!!!');
    }
}

updateHeader();

//setInterval(function(){console.log('seila');}, 2500); 

/*
while (document.evaluate('/html/body/form/div[22]/table/tbody/tr/td[1]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue !== null) {
    //document.body.style.border = "5px solid red";
    setTimeout(
        function() {
            console.log('100');
        },
        100);
    );
};
*/
 


