function verifyHeaderElement() {
    return document.evaluate('/html/body/form/div[22]/table/tbody/tr/td[1]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue == null;
}

console.log(verifyHeaderElement());

var updateHeader = function() {
    if (verifyHeaderElement()) {
        setTimeout(updateHeader, 100);
    } 
    else {
        document.evaluate('/html/body/form/div[22]/table/tbody/tr/td[1]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.src =  browser.runtime.getURL("images/logo_superior_esquerda.png");
    }
}

updateHeader();