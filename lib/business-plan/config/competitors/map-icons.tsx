import L from "leaflet";

export const greenIcon = new L.Icon({
	iconUrl: "/icons/map-pin-green.svg",
	iconSize: [30, 40],
	iconAnchor: [15, 40],
	popupAnchor: [0, -40],
});

export const redIcon = new L.Icon({
	iconUrl: "/icons/map-pin-red.svg",
	iconSize: [30, 40],
	iconAnchor: [15, 40],
	popupAnchor: [0, -40],
});
