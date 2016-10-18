var utils = require("utils/utils");
var LatLng = com.google.android.gms.maps.model.LatLng;
var PolylineOptions = com.google.android.gms.maps.model.PolylineOptions;
var LatLngBounds = com.google.android.gms.maps.model.LatLngBounds;
var CameraUpdateFactory = com.google.android.gms.maps.CameraUpdateFactory;
var ClusterItem = com.google.maps.android.clustering.ClusterItem;
var ClusterManager = com.google.maps.android.clustering.ClusterManager;
var DefaultClusterRenderer = com.google.maps.android.clustering.view.DefaultClusterRenderer;
var HeatmapTileProvider = com.google.maps.android.heatmaps.HeatmapTileProvider;
var TileOverlayOptions = com.google.android.gms.maps.model.TileOverlayOptions;
var SphericalUtil = com.google.maps.android.SphericalUtil;
var debugNull = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
};
function debugDefault() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    args = args.map(function (value) {
        if (typeof value === 'object' && value) {
            try {
                value = JSON.stringify(value);
            }
            catch (e) {
                value = value.toString();
            }
        }
        return value;
    });
    args.unshift('nativescript-socket.io');
    console.log.apply(console, args);
}
var debug = debugNull;
function enableDebug(debugFn) {
    if (debugFn === void 0) { debugFn = debugDefault; }
    debug = debugFn;
}
exports.enableDebug = enableDebug;
function disableDebug() {
    debug = debugNull;
}
exports.disableDebug = disableDebug;
function setupMarkerCluster(mapView, markers, options) {
    debug('setupMarkerCluster');
    var clusterManager = new ClusterManager(utils.ad.getApplicationContext(), mapView.gMap);
    mapView.gMap.setOnCameraIdleListener(clusterManager);
    markers.forEach(function (marker) {
        clusterManager.addItem(new ClusterItem({
            rotation: marker.rotation,
            getPosition: function () {
                return marker.position.android;
            }
        }));
    });
    clusterManager.cluster();
}
exports.setupMarkerCluster = setupMarkerCluster;
function setupHeatmap(mapView, positions, config) {
    if (config === void 0) { config = null; }
    debug('setupHeatmap');
    var list = new java.util.ArrayList();
    positions.forEach(function (position) {
        list.add(position.android);
    });
    if (config) {
        config.overlay.clearTileCache();
        config.provider.setData(list);
    }
    else {
        config = {};
        config.provider = new HeatmapTileProvider.Builder()
            .data(list)
            .build();
        config.overlay = mapView.gMap.addTileOverlay(new TileOverlayOptions().tileProvider(config.provider));
    }
    return config;
}
exports.setupHeatmap = setupHeatmap;
function computeHeading(from, to) {
    var fromLatLng = new com.google.android.gms.maps.model.LatLng(from.lat, from.lng);
    var toLatLng = new com.google.android.gms.maps.model.LatLng(to.lat, to.lng);
    return SphericalUtil.computeHeading(fromLatLng, toLatLng);
}
exports.computeHeading = computeHeading;
function interpolate(from, to, fraction) {
    var fromLatLng = new com.google.android.gms.maps.model.LatLng(from.lat, from.lng);
    var toLatLng = new com.google.android.gms.maps.model.LatLng(to.lat, to.lng);
    return SphericalUtil.interpolate(fromLatLng, toLatLng, fraction);
}
exports.interpolate = interpolate;
//# sourceMappingURL=index.android.js.map