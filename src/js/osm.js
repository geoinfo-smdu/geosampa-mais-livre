import axios from 'axios'
import MaskInput from 'mask-input'

(function () {
    const panelid = 'OpenLayers_Control_Panel_581'
    const element = {
        init: id => document.id = id,
        get: () => document.getElementById(document.id),
        create: (node, el) => {
            let child = document.createElement(el)
            const randomId = `osm__${Math.floor(Math.random() * 9999) + 1}`

            node.appendChild(child)
            child.setAttribute("class", `osm olControlPanel__custom-item`)
            child.setAttribute("id", randomId)

            return { child, randomId }
        },
        render: (node, template) => {
            if (!node) return
            node.innerHTML = template
        }
    }
    const icons = {
        seta: `
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path d="M12.01 3H0V5H12.01V8L16 4L12.01 0V3Z" fill="white"/>
            </svg>
        `
    }

    const view = id => {
        if (!id) { return }
        const panel = Object.create(element)
        panel.init(panelid)

        const olmenu = panel.get()
        const menuItem = panel.create(olmenu, 'div')

        panel.render(menuItem.child, `
            <form>
                <div class="osm__group" id="osm__group--cep">
                    <label class="osm__label" for="osm__cep">CEP</label>
                    <input class="osm__input" id="osm__cep type="number" value></input>
                    <button class="osm__btn" id="osm__buscar">BUSCAR</button>
                </div>
                <button title="Buscar por CEP" class="osm__toggle" id="osm__toggle-cep">
                    <span class="toggle__span ativo">${icons.seta}</span>
                </button>
            </form>
        `)

        jQuery('#osm__toggle-cep').click(() => {
            jQuery(`#${menuItem.randomId}`).toggleClass('aberto')
            jQuery('.toggle__span').toggleClass('ativo')

            new MaskInput(document.querySelector('.osm__input'), {
                mask: '00000-000',
                alwaysShowMask: true,
                maskChar: '0'
            })
            document.querySelector('.osm__input').focus()
        })

        jQuery('#osm__buscar').click(event => {
            event.preventDefault()

            const cep = jQuery('.osm__input').val()
            // map.setCenter([7391311.26420, 324625.01921353], 8, true, false)
            axios.get(`https://nominatim.openstreetmap.org/search?city=S%C3%A3o%20Paulo&postalcode=${cep}&format=json`)
                .then(res => {
                    console.log(res.data)
                    const lat = res.data[0].lat
                    const lon = res.data[0].lon
                    map.setCenter([lat, lon], 8, true, false)
                })
                .catch(err => {
                    console.error(err)
                })
        })

    }

    const osm = () => {
        if (!document.getElementById(panelid)) { setTimeout(osm, 100) }
        else { view(panelid) }
    }
    osm()
})()