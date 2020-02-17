import axios from 'axios'
(function () {

    const panelid = 'OpenLayers_Control_Panel_581'
    const element = {
        init: id => window.id = id,
        get: () => document.getElementById(window.id),
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
        if (!id) { return }
        const panel = Object.create(element)
        panel.init('OpenLayers_Control_Panel_581')

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

            axios.get(`https://nominatim.openstreetmap.org/search?city=S%C3%A3o%20Paulo&postalcode=01307-000&format=json`)
                .then(res=>console.log(res))

        })
    }

    const osm = () => {
        if (!document.getElementById(panelid)) { setTimeout(osm, 100) }
        else { view(panelid) }
    }
    osm()
})()