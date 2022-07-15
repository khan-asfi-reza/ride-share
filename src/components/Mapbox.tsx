import MapboxGL, {Point} from "@rnmapbox/maps";
import {MAPBOX} from "@env";
import {
    MapViewProps
} from '@rnmapbox/maps';
import Mapbox from "@components/Mapbox";

MapboxGL.setAccessToken(MAPBOX)

export const defaultStyle = {
    version: 8,
    name: 'Land',
    sources: {
        map: {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            minzoom: 1,
            maxzoom: 19,
        },
    },
    layers: [
        {
            id: 'background',
            type: 'background',
            paint: {
                'background-color': '#f2efea',
            },
        },
        {
            id: 'map',
            type: 'raster',
            source: 'map',
            paint: {
                'raster-fade-duration': 100,
            },
        },
    ],
};

export const MapView = (props: MapViewProps) => {
    return(
        <MapboxGL.MapView styleJSON={JSON.stringify(defaultStyle)} {...props}>
            {props.children}
        </MapboxGL.MapView>
    )
}
export interface PointAnnotationProps {
    id: string;
    title?: string;
    snippet?: string;
    selected?: boolean;
    draggable?: boolean;
    coordinate: GeoJSON.Position;
    anchor?: Point;
    onSelected?: () => void;
    onDeselected?: (e: any) => void;
    onDragStart?: (e: any) => void;
    onDrag?: (e: any) => void;
    onDragEnd?: (e: any) => void;
}



export default MapboxGL;