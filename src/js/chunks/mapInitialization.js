import mapboxgl from 'mapbox-gl';
import mapData from './mapData';

// DON'T FORGET TO ADD YOUR STYLES FOR THE #map ELEMENT, OTHERWISE IT MIGHT NOT SHOW ON THE PAGE

mapboxgl.accessToken = 'pk.eyJ1IjoidmFuamF6ZWxpIiwiYSI6ImNsd3N6c2l0azAxdGkya3NhMGh5cWk1ZDQifQ.eAXJdLuDiY3unyXiYZQGeg';
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/vanjazeli/clwt0k7yd012l01qx8rwkf55n',
	center: [-99, 40],
	zoom: 4.2,
	projection: 'mercator',
	dragPan: false,
	dragRotate: false,
	scrollZoom: false,
	boxZoom: false,
	doubleClickZoom: false,
	touchZoomRotate: false,
	keyboard: false,
});

map.on('load', () => {
	mapData.regions.forEach(({ name, geoJson }) => {
		map.addSource(name, {
			type: 'geojson',
			data: geoJson,
		});

		map.addLayer({
			id: `${name}-layer`,
			type: 'fill',
			source: name,
			layout: {},
			paint: {
				'fill-color': '#088',
				'fill-opacity': 0.5,
			},
		});

		map.addLayer({
			id: `${name}-outline`,
			type: 'line',
			source: name,
			layout: {},
			paint: {
				'line-color': '#000',
				'line-width': 2,
			},
		});

		map.on('mousemove', `${name}-layer`, () => {
			map.getCanvas().style.cursor = 'pointer';
		});

		map.on('mouseleave', `${name}-layer`, () => {
			map.getCanvas().style.cursor = '';
		});

		map.on('mousemove', `${name}-layer`, (e) => {
			if (e.features.length > 0) {
				map.setPaintProperty(`${name}-layer`, 'fill-opacity', 1);
			}
		});

		map.on('mouseleave', `${name}-layer`, () => {
			map.setPaintProperty(`${name}-layer`, 'fill-opacity', 0.5);
		});

		map.on('click', `${name}-layer`, () => {
			alert(`This function is going to open the popup for the ${name}-layer popup.`);
		});
	});
});
