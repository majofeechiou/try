'use strict';

import ToGeoJSON from "togeojson";
import jquery from "jquery";

(function body () {

    window.onload = function(){
        initMap();
    }

    // Object {ROADMAP: "roadmap", SATELLITE: "satellite", HYBRID: "hybrid", TERRAIN: "terrain"}

    let myLatlng = new google.maps.LatLng( 25.047502948494675, -238.44572067260742 );
    let map;
    let styles = [{
            featureType : 'all',
            stylers: [  
                { hue: "#00d4cf" },
                { saturation: -30 }
            ]
        },{
            featureType : 'water',
            stylers: [  
                { hue: "#00d4cf" },
                { weight: 1 },
                { gamma: 0.3 }
            ]
        },{
            featureType : 'road',
            stylers: [  
                { hue: "#00d4cf" },
                { saturation: 40 },
                { lightness: -20 },
                { gamma: 4 }
            ]
        },{
            featureType : 'transit',
            stylers: [  
                { hue: "#00d4cf" },
                { saturation: 40 },
                { lightness: -20 },
                { gamma: 4 }
            ]
        },{
            featureType : 'poi',
            stylers: [  
                { hue: "#00d4cf" },
                { saturation: -10 }
            ]
        },{
            featureType : 'administrative',
            stylers: [  
                { hue: "#00d4cf" },
                { saturation: -10 }
            ]
        }];

    let dataMap = new google.maps.Data();
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatlng, 
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            styles: styles
        });

    }

    jquery.get('/try/data/water-78mm.kml', function(d){
        var geo = ToGeoJSON.kml(d);
        dataMap.addGeoJson( geo );
        dataMap.setMap( map );

        dataMap.setStyle(function(feature){
            console.log( 78, feature.getProperty('name') );
            return { fillOpacity: 0.6, fillColor: '#83a9df', strokeWeight: 2, strokeColor: '#83a9df', strokeOpacity: 1 };
        });

    });

    jquery.get('/try/data/water-100mm.kml', function(d){
        var geo = ToGeoJSON.kml(d);
        dataMap.addGeoJson( geo );
        dataMap.setMap( map );

        dataMap.setStyle(function(feature){
            console.log( 100, feature.getProperty('name') );
            return { fillOpacity: 0.6, fillColor: '#6399df', strokeWeight: 2, strokeColor: '#6399df', strokeOpacity: 1 };
        });

    });

    jquery.get('/try/data/water-130mm.kml', function(d){
        var geo = ToGeoJSON.kml(d);
        dataMap.addGeoJson( geo );
        dataMap.setMap( map );

        dataMap.setStyle(function(feature){
            console.log( 130, feature.getProperty('name') );
            return { fillOpacity: 0.6, fillColor: '#13397f', strokeWeight: 2, strokeColor: '#13397f', strokeOpacity: 1 };
        });

    });

})();