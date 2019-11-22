function verifyHeaderElement() {
    return document.evaluate('/html/body/form/div[22]/table/tbody/tr/td[1]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue == null;
}

console.log(verifyHeaderElement());

let url = 'http://geosampa.prefeitura.sp.gov.br/js/Layers.js';
let jsonLayers;

fetch(url)
.then(res => res.json())
.then((out) => {
  console.log('Checkout this JSON! ', out);
  jsonLayers = out;
  jsonLayers.layersMapa.forEach(element => {
    console.log(element.layerLabel);
    if (element.subcamadas.length > 0) {
        element.subcamadas.forEach(element => {
            if (element.subcamadas.length > 0) {
                element.subcamadas.forEach(element => {
                    console.log(element.layerLabel); 
                })
            }
            console.log(element.layerLabel); 
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
        document.evaluate('/html/body/form/div[22]/table/tbody/tr/td[1]/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.src =  browser.runtime.getURL("images/logo_superior_esquerda.png");
        // Get HTML head element 
        var head = document.getElementsByTagName('HEAD')[0];  
        // Create new link Element 
        var link = document.createElement('link'); 
        // set the attributes for link element  
        link.rel = 'stylesheet';  
        link.type = 'text/css'; 
        link.href = browser.runtime.getURL("css/awesomplete.css");  
        // Append link element to HTML head 
        head.appendChild(link);  
        // Adicionando o searchBox
        var divSearch = document.createElement("div");
        var searchBox = document.createElement("input");
        searchBox.style.borderRadius = "5px";
        searchBox.style.boxSizing = "border-box";
        searchBox.style.width = "100%";
        searchBox.style.padding = "8px 12px";
        searchBox.className = "awesomplete";
        searchBox.setAttribute("list", "listaCamadas");
        var listaCamadas = document.createElement("datalist");
        listaCamadas.setAttribute("id", "listaCamadas");
        var listaA = ["Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails"];
        function consoleArray(value) {
            console.log(value);
            var optionCamada = document.createElement("option");
            optionCamada.innerText = value;
            listaCamadas.appendChild(optionCamada);
        };
        listaA.forEach(consoleArray);
        //searchBox.setAttribute("data-list", "Ada, Java, JavaScript, Brainfuck, LOLCODE, Node.js, Ruby on Rails");
        divSearch.appendChild(searchBox);
        divSearch.appendChild(listaCamadas);
        document.getElementById("LayersWhiteCamadas").insertAdjacentElement('afterbegin', divSearch);
        // criar um autocomplete https://leaverou.github.io/awesomplete/
    }
}

updateHeader();

