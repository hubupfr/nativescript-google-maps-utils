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
}
exports.setupMarkerCluster = setupMarkerCluster;
function setupHeatmap(mapView, positions, config) {
    if (config === void 0) { config = null; }
    debug('setupHeatmap');
    return config;
}
exports.setupHeatmap = setupHeatmap;
//# sourceMappingURL=index.ios.js.map