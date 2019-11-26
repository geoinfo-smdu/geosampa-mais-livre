function verifyHeaderElement() {
    return document.evaluate('/html/body/form/div[22]/table/tbody/tr/td[1]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue == null;
}

console.log(verifyHeaderElement());

// Get HTML head element 
var head = document.getElementsByTagName('HEAD')[0];  
// Create new link Element 
var link = document.createElement('link'); 
// set the attributes for link element  
link.rel = 'stylesheet';  
link.type = 'text/css'; 
link.href = chrome.runtime.getURL("css/awesomplete.css");  
// Append link element to HTML head 
head.appendChild(link);  
// Adicionando o searchBox

let url = 'http://geosampa.prefeitura.sp.gov.br/js/Layers.js';
let jsonLayers;
var listaA = [];

fetch(url)
.then(res => res.json())
.then((out) => {
  //console.log('Checkout this JSON! ', out);
  jsonLayers = out;
  jsonLayers.layersMapa.forEach(element => {
    //console.log(element.layerLabel);
    listaA.push(element.layerLabel);
    if (element.subcamadas.length > 0) {
        element.subcamadas.forEach(element => {
            if (element.subcamadas.length > 0) {
                element.subcamadas.forEach(element => {
                    //console.log(element.layerLabel);
                    listaA.push(element.layerLabel); 
                })
            }
            //console.log(element.layerLabel);
            listaA.push(element.layerLabel); 
        })
    }
});
})
.catch(err => { throw err });




var updateHeader = function() {
    if (verifyHeaderElement()) {
        setTimeout(updateHeader, 100);
    } 
    else {
        document.evaluate('/html/body/form/div[22]/table/tbody/tr/td[1]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.src =  chrome.runtime.getURL("images/logo_superior_esquerda.png");
        var divSearch = document.createElement("div");
        var searchBox = document.createElement("input");
        searchBox.style.borderRadius = "5px";
        searchBox.style.boxSizing = "border-box";
        searchBox.style.width = "100%";
        searchBox.style.padding = "8px 12px";
        searchBox.className = "awesomplete";
        searchBox.setAttribute("data-list", "listaCamadas");
        searchBox.setAttribute("id", "searchBox");
        divSearch.appendChild(searchBox);
        document.getElementById("LayersWhiteCamadas").insertAdjacentElement('afterbegin', divSearch);
        var awesomplete = new Awesomplete(searchBox);
        awesomplete.list = listaA;
        document.getElementById('searchBox').addEventListener('awesomplete-close',function(event){
            console.log(event); 
        });
        // criar um autocomplete https://leaverou.github.io/awesomplete/
    }
}

updateHeader();

