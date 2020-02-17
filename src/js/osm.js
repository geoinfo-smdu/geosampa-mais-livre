(function () {

    const panelid = 'OpenLayers_Control_Panel_581'

    const element = {
        init: id => this.id = id,
        get: () => document.getElementById(this.id),
        create: (node, el) => {
            let child = document.createElement(el)
            node.appendChild(child)
            child.setAttribute("class", `osm olControlPanel__custom-item`)
            return child
        },
        render: (node, template) => {
            if (!node) return
            node.innerHTML = template
        },
        onclick: (query, callback) => {
            document.querySelector(query).addEventListener('click', callback)
        }
    }

    const view = id => {
        const panel = Object.create(element)
        panel.init(id)

        const olmenu = panel.get()
        const menuItem = panel.create(olmenu, 'form')

        panel.render(menuItem, `
            <label for="osm__cep">CEP</label>
            <input id="osm__cep" / type="text"></input>
            <button class="osm__buscar" id="osm__buscar">buscar por cep</button>
        `)

        panel.onclick('#osm__buscar', event => {
            event.preventDefault()
            map.setCenter([7391311.26420, 324625.01921353], 4, true, false)

            fetch(`https://nominatim.openstreetmap.org/search?city=S%C3%A3o%20Paulo&postalcode=01307-000&format=json`)
                .then(res => res.json())
                .then(res => console.log(res))
        })
    }

    const osm = () => {
        if (!document.getElementById(panelid)) { setTimeout(osm, 100) }
        else { view(panelid) }
    }
    osm()
})()