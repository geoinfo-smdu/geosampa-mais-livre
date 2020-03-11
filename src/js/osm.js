import axios from 'axios'

(function () {
    const panelClass = 'olControlPanel'
    const element = {
        init: classname => document.classname = classname,
        get: () => document.getElementsByClassName(panelClass)[0],
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
        seta: `<svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M12.01 3H0V5H12.01V8L16 4L12.01 0V3Z" fill="white"/></svg>`,
        local: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
    }

    const view = classname => {
        if (!classname) { return }

        const panel = Object.create(element)
        panel.init(classname)

        const olmenu = panel.get()
        const menuItem = panel.create(olmenu, 'div')
        const toggleSearchBox = () => {
            jQuery(`#${menuItem.randomId}`).toggleClass('aberto')
            jQuery('.toggle__span').toggleClass('ativo')
            jQuery('.osm__input').focus()
        }

        panel.render(menuItem.child, `
            <form>
                <div class="osm__group" id="osm__group--search">
                    <label class="osm__label" for="osm__search">Busca locais*</label>
                    <input class="osm__input" id="osm__search type="text" placeholder="exemplos: largo da batata, masp" value></input>
                    <button class="osm__btn" id="osm__buscar">BUSCAR</button>
                    <p>* Busca de textual de locais. Fontes: <a href="https://nominatim.org/">nominatim.org</a> e <a href="https://www.openstreetmap.org/#map=4/-15.07/-64.20">Open Street Map</a></p>
                </div>
                <button title="Buscar no OSM" class="osm__toggle" id="osm__toggle-search">
                    <span class="toggle__span ativo">${icons.seta}</span>
                </button>
            </form>
        `)

        jQuery('#osm__toggle-search').click(() => toggleSearchBox())

        jQuery('#osm__buscar').click(event => {
            event.preventDefault()

            const input = jQuery('.osm__input').val()

            setTimeout(() => {
                toggleSearchBox()
            }, 1000)

            axios.get(`https://nominatim.openstreetmap.org/search?q=${ input },S%C3%A3o%20Paulo,%20SP,%20Brazil&countrycode=br&format=json`)
                .then(res => {
                    if (!res.data.length) {
                        jAlert(`Nenhum local foi encontrado para o termo ${ input } não foi encontrado`, 'Tente novamente')
                    }
                    else {
                        const newCenter = (lon, lat) => {
                            const fromProjection = new OpenLayers.Projection('EPSG:4326')  // OSM
                            const toProjection   = new OpenLayers.Projection('EPSG:31983') // GeoSampa
                            return new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection)
                        }

                        const places =  res.data.map(place => {
                            return {
                                name: place.display_name,
                                center: newCenter(place.lon, place.lat)
                            }
                        })

                        const placesStr = places
                            .map(place => `<li class="osm-list__location"><p>${ place.name }</p><button onClick="(function(){map.setCenter([${ place.center }], 8, true, false);jQuery('#popup_ok').click()})()">${ icons.local }</button></li>`)
                            .join('')

                        jAlert(`<ul class="message__osm-list">${ placesStr }</ul>`, 'Lista de locais', function () { })
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        })
    }

    const osm = (counter = 0) => {
        if (process.env.NODE_ENV === 'development') {
            counter === 1 ?
                console.log(`--- Geosampa mais livre/OSM ---\ntentativas: ${counter}`) :
                console.log(`tentativas: ${counter}`)
        }

        if (counter === 10) {
            throw new Error(`Geosampa mais livre: não foi possível carregar osm/nominatim após ${counter} tentativas. Elemento de classe' ${panelClass}' não foi encontrado nesta página`)
        }

        else if (!document.getElementsByClassName(panelClass)[0]) {
            setTimeout(osm, 1000, counter + 1)
        }

        else {
            view(panelClass)
        }
    }
    osm()
})()