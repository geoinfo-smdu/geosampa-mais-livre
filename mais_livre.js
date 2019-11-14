setTimeout(function() { 
    document.body.style.border = "5px solid red";
    document.evaluate('/html/body/form/div[22]/table/tbody/tr/td[1]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.src = "seila";
    //document.getElementById("Cabecalho").innerHTML = "<p>teste</p>";
    console.log("seila");
    }, 2000);



 
 


