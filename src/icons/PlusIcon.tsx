import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon = ({ color }: { color?: string }) => (
    <Svg viewBox="0 0 24 24" width='26' height='26'>
        <Path fill={color} d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
    </Svg>
)

export default PlusIcon;