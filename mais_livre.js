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

 


