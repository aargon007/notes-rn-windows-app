import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = ({ color, style }: { color?: string; style?: any }) => (
    <Svg viewBox="0 0 32 32" width='22' height='25'>
        <Path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m28 27l-7.5-7.5M5 13a9 9 0 1 0 18 0a9 9 0 0 0-18 0" />
    </Svg>
)

export default SearchIcon;


