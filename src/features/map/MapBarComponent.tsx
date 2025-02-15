
import React, { useRef, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import mapboxgl, { Map } from 'mapbox-gl';
import { addFillExtrusionLayer, removeAllLayersAndSources } from './MapUtil';
import { Slider, Stack } from '@mui/material';
import triangleImage from './triangle.png';
import trapezoidImage from './trapezoid.png';
import { RainObservatoryLegend } from './consts'
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'

import {
  LogoImg,
  LegendContents
} from './style';

const MapBarComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<string>("0:00");
  const mapboxToken = 'pk.eyJ1Ijoic2h1aGVpa296dSIsImEiOiJjbHd5ZWFsNTgxYXFsMmpzYWdyZDlzbnp3In0.IOnweJMuRgEiaqfO47TeWw';

  const hukaya = [
    { "type": "Feature", "properties": { "ryuuiki_No": "H-1-1" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 136.27653, 35.73707 ], [ 136.27851, 35.74419 ], [ 136.28338, 35.74923 ], [ 136.28999, 35.75421 ], [ 136.29669, 35.75382 ], [ 136.30597, 35.75573 ], [ 136.32009, 35.75561 ], [ 136.32082, 35.75255 ], [ 136.32532, 35.74779 ], [ 136.32661, 35.74208 ], [ 136.32659, 35.73709 ], [ 136.32818, 35.73483 ], [ 136.32686, 35.73091 ], [ 136.32407, 35.72795 ], [ 136.32232, 35.72534 ], [ 136.32202, 35.7232 ], [ 136.32492, 35.7207 ], [ 136.32345, 35.71821 ], [ 136.31894, 35.71763 ], [ 136.31341, 35.71326 ], [ 136.31285, 35.71018 ], [ 136.3116, 35.70707 ], [ 136.31137, 35.70688 ], [ 136.30863, 35.70454 ], [ 136.30672, 35.70376 ], [ 136.30467, 35.70138 ], [ 136.30265, 35.69801 ], [ 136.29949, 35.69585 ], [ 136.29357, 35.69286 ], [ 136.28944, 35.69845 ], [ 136.28644, 35.70483 ], [ 136.2839, 35.70617 ], [ 136.28243, 35.70938 ], [ 136.28068, 35.71362 ], [ 136.27807, 35.71757 ], [ 136.27713, 35.71979 ], [ 136.27841, 35.72578 ], [ 136.27967, 35.72779 ], [ 136.28087, 35.73045 ], [ 136.28085, 35.7334 ], [ 136.27653, 35.73707 ] ] ] ] } },
    { "type": "Feature", "properties": { "ryuuiki_No": "H-1-2" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 136.27653, 35.73707 ], [ 136.28085, 35.7334 ], [ 136.28087, 35.73045 ], [ 136.27967, 35.72779 ], [ 136.27841, 35.72578 ], [ 136.27713, 35.71979 ], [ 136.27807, 35.71757 ], [ 136.28068, 35.71362 ], [ 136.28243, 35.70938 ], [ 136.2839, 35.70617 ], [ 136.28644, 35.70483 ], [ 136.28944, 35.69845 ], [ 136.29357, 35.69286 ], [ 136.29362, 35.68835 ], [ 136.29617, 35.6862 ], [ 136.29914, 35.68245 ], [ 136.29964, 35.67996 ], [ 136.29556, 35.67747 ], [ 136.29175, 35.67404 ], [ 136.29101, 35.67 ], [ 136.28692, 35.66686 ], [ 136.28285, 35.6664 ], [ 136.27986, 35.66718 ], [ 136.27688, 35.66831 ], [ 136.27318, 35.67046 ], [ 136.26787, 35.6738 ], [ 136.26467, 35.6744 ], [ 136.26001, 35.67447 ], [ 136.25461, 35.67705 ], [ 136.25393, 35.68991 ], [ 136.25507, 35.69259 ], [ 136.25631, 35.6962 ], [ 136.25602, 35.70082 ], [ 136.25367, 35.7052 ], [ 136.25389, 35.71015 ], [ 136.25523, 35.7136 ], [ 136.26372, 35.72575 ], [ 136.26663, 35.73356 ], [ 136.26792, 35.7356 ], [ 136.27035, 35.73683 ], [ 136.27653, 35.73707 ] ] ] ] } },
    { "type": "Feature", "properties": { "ryuuiki_No": "H-2-1" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 136.28999, 35.75421 ], [ 136.28338, 35.74923 ], [ 136.27851, 35.74419 ], [ 136.27653, 35.73707 ], [ 136.27035, 35.73683 ], [ 136.26792, 35.7356 ], [ 136.26663, 35.73356 ], [ 136.26486, 35.72881 ], [ 136.25891, 35.72967 ], [ 136.25105, 35.73163 ], [ 136.24898, 35.73393 ], [ 136.24988, 35.73829 ], [ 136.25123, 35.74155 ], [ 136.25243, 35.74773 ], [ 136.25289, 35.74966 ], [ 136.25172, 35.75596 ], [ 136.25143, 35.75814 ], [ 136.25188, 35.76007 ], [ 136.25292, 35.76201 ], [ 136.25253, 35.76445 ], [ 136.25287, 35.76655 ], [ 136.25442, 35.76661 ], [ 136.26244, 35.76598 ], [ 136.26846, 35.76709 ], [ 136.27359, 35.76729 ], [ 136.27571, 35.76734 ], [ 136.2767, 35.76438 ], [ 136.27698, 35.7605 ], [ 136.28351, 35.76005 ], [ 136.28574, 35.75915 ], [ 136.28587, 35.75564 ], [ 136.28765, 35.75467 ], [ 136.28999, 35.75421 ] ] ] ] } },
    { "type": "Feature", "properties": { "ryuuiki_No": "H-2-2" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 136.26877, 35.82508 ], [ 136.2746, 35.82542 ], [ 136.27974, 35.82421 ], [ 136.28318, 35.82402 ], [ 136.28841, 35.8232 ], [ 136.29304, 35.82582 ], [ 136.29967, 35.82696 ], [ 136.3003, 35.82981 ], [ 136.30319, 35.8314 ], [ 136.30864, 35.82643 ], [ 136.31267, 35.82625 ], [ 136.31421, 35.82457 ], [ 136.31502, 35.82188 ], [ 136.31654, 35.81979 ], [ 136.31976, 35.82052 ], [ 136.32628, 35.82571 ], [ 136.33297, 35.82275 ], [ 136.33686, 35.82389 ], [ 136.34144, 35.82434 ], [ 136.34551, 35.8213 ], [ 136.34696, 35.81927 ], [ 136.34906, 35.81748 ], [ 136.35059, 35.81493 ], [ 136.34875, 35.81083 ], [ 136.34947, 35.80875 ], [ 136.35339, 35.80559 ], [ 136.35433, 35.80274 ], [ 136.35231, 35.79959 ], [ 136.35277, 35.79645 ], [ 136.35603, 35.7921 ], [ 136.35644, 35.78705 ], [ 136.3474, 35.77889 ], [ 136.34142, 35.77764 ], [ 136.33286, 35.77868 ], [ 136.32894, 35.77709 ], [ 136.32406, 35.76879 ], [ 136.32197, 35.76131 ], [ 136.32154, 35.75779 ], [ 136.3214, 35.75758 ], [ 136.32009, 35.75561 ], [ 136.30597, 35.75573 ], [ 136.29669, 35.75382 ], [ 136.28999, 35.75421 ], [ 136.28765, 35.75467 ], [ 136.28587, 35.75564 ], [ 136.28574, 35.75915 ], [ 136.28351, 35.76005 ], [ 136.27698, 35.7605 ], [ 136.2767, 35.76438 ], [ 136.27571, 35.76734 ], [ 136.27359, 35.76729 ], [ 136.26846, 35.76709 ], [ 136.26244, 35.76598 ], [ 136.25442, 35.76661 ], [ 136.25287, 35.76655 ], [ 136.25253, 35.76445 ], [ 136.25292, 35.76201 ], [ 136.25188, 35.76007 ], [ 136.25143, 35.75814 ], [ 136.25172, 35.75596 ], [ 136.25289, 35.74966 ], [ 136.25243, 35.74773 ], [ 136.25123, 35.74155 ], [ 136.24988, 35.73829 ], [ 136.24898, 35.73393 ], [ 136.25105, 35.73163 ], [ 136.25891, 35.72967 ], [ 136.26486, 35.72881 ], [ 136.26372, 35.72575 ], [ 136.25523, 35.7136 ], [ 136.25389, 35.71015 ], [ 136.25367, 35.7052 ], [ 136.25602, 35.70082 ], [ 136.25631, 35.6962 ], [ 136.25507, 35.69259 ], [ 136.25393, 35.68991 ], [ 136.25461, 35.67705 ], [ 136.24668, 35.67665 ], [ 136.2438, 35.67808 ], [ 136.2402, 35.68078 ], [ 136.23682, 35.68431 ], [ 136.23435, 35.68516 ], [ 136.23146, 35.6839 ], [ 136.22853, 35.684 ], [ 136.22313, 35.68636 ], [ 136.21777, 35.68712 ], [ 136.21479, 35.68612 ], [ 136.21291, 35.68606 ], [ 136.20914, 35.69033 ], [ 136.2043, 35.69068 ], [ 136.2007, 35.69186 ], [ 136.19931, 35.69302 ], [ 136.19916, 35.69564 ], [ 136.19608, 35.70203 ], [ 136.1896, 35.70531 ], [ 136.18528, 35.70549 ], [ 136.18157, 35.70491 ], [ 136.17648, 35.70593 ], [ 136.17262, 35.70507 ], [ 136.17096, 35.70559 ], [ 136.169, 35.7045 ], [ 136.16827, 35.70064 ], [ 136.1621, 35.70149 ], [ 136.1587, 35.70267 ], [ 136.15169, 35.69949 ], [ 136.14644, 35.70476 ], [ 136.15067, 35.70688 ], [ 136.15161, 35.70939 ], [ 136.15171, 35.70965 ], [ 136.15007, 35.71385 ], [ 136.14462, 35.71815 ], [ 136.13555, 35.72441 ], [ 136.13526, 35.72762 ], [ 136.13425, 35.73249 ], [ 136.13528, 35.73653 ], [ 136.13514, 35.74039 ], [ 136.13208, 35.74335 ], [ 136.12728, 35.74723 ], [ 136.12394, 35.75127 ], [ 136.11862, 35.7552 ], [ 136.11856, 35.75983 ], [ 136.11456, 35.76702 ], [ 136.11522, 35.76862 ], [ 136.11675, 35.7688 ], [ 136.11733, 35.77017 ], [ 136.11685, 35.77341 ], [ 136.11974, 35.77515 ], [ 136.12277, 35.77798 ], [ 136.12507, 35.77877 ], [ 136.12898, 35.77913 ], [ 136.13321, 35.78248 ], [ 136.13713, 35.78298 ], [ 136.14322, 35.78621 ], [ 136.15014, 35.78985 ], [ 136.15508, 35.7877 ], [ 136.15982, 35.78682 ], [ 136.16734, 35.78387 ], [ 136.17692, 35.77747 ], [ 136.18403, 35.77889 ], [ 136.18899, 35.78098 ], [ 136.19581, 35.78752 ], [ 136.20211, 35.79179 ], [ 136.21407, 35.78837 ], [ 136.21674, 35.78866 ], [ 136.21829, 35.79193 ], [ 136.22047, 35.79445 ], [ 136.22099, 35.79638 ], [ 136.21672, 35.79879 ], [ 136.21564, 35.80093 ], [ 136.21758, 35.80396 ], [ 136.22214, 35.80487 ], [ 136.22741, 35.80477 ], [ 136.2336, 35.80626 ], [ 136.24422, 35.806 ], [ 136.25245, 35.80492 ], [ 136.26164, 35.80545 ], [ 136.26598, 35.80645 ], [ 136.26774, 35.80847 ], [ 136.26826, 35.81115 ], [ 136.26972, 35.81535 ], [ 136.26932, 35.81846 ], [ 136.26877, 35.82508 ] ] ] ] } },
    { "type": "Feature", "properties": { "ryuuiki_No": "H-4-1" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 136.12463, 35.86437 ], [ 136.12163, 35.86068 ], [ 136.12068, 35.84765 ], [ 136.11848, 35.84848 ], [ 136.1156, 35.8484 ], [ 136.11317, 35.84738 ], [ 136.10868, 35.84539 ], [ 136.10457, 35.84455 ], [ 136.10197, 35.84631 ], [ 136.09991, 35.84674 ], [ 136.09659, 35.84609 ], [ 136.08546, 35.84566 ], [ 136.08072, 35.84961 ], [ 136.07969, 35.85137 ], [ 136.07578, 35.85717 ], [ 136.07299, 35.85919 ], [ 136.07165, 35.86104 ], [ 136.07168, 35.86151 ], [ 136.07207, 35.86717 ], [ 136.06615, 35.87029 ], [ 136.05178, 35.8719 ], [ 136.04769, 35.87475 ], [ 136.03675, 35.88063 ], [ 136.04293, 35.88082 ], [ 136.04644, 35.88234 ], [ 136.04975, 35.88427 ], [ 136.05256, 35.8874 ], [ 136.05759, 35.88729 ], [ 136.0624, 35.8848 ], [ 136.07132, 35.88484 ], [ 136.07473, 35.88568 ], [ 136.08082, 35.88971 ], [ 136.08537, 35.89433 ], [ 136.09334, 35.89396 ], [ 136.10078, 35.89516 ], [ 136.10257, 35.89685 ], [ 136.10733, 35.89491 ], [ 136.11254, 35.89515 ], [ 136.11387, 35.89212 ], [ 136.11164, 35.89067 ], [ 136.11193, 35.8868 ], [ 136.11014, 35.88438 ], [ 136.11058, 35.88087 ], [ 136.11355, 35.87663 ], [ 136.1244, 35.87165 ], [ 136.12499, 35.86935 ], [ 136.12499, 35.86645 ], [ 136.12463, 35.86437 ] ] ] ] } },
    { "type": "Feature", "properties": { "ryuuiki_No": "H-4-2" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 136.08537, 35.89433 ], [ 136.08424, 35.90542 ], [ 136.08869, 35.91145 ], [ 136.09225, 35.9147 ], [ 136.10707, 35.91363 ], [ 136.10934, 35.91451 ], [ 136.11647, 35.91371 ], [ 136.11926, 35.91673 ], [ 136.12443, 35.91816 ], [ 136.12837, 35.92218 ], [ 136.13112, 35.92765 ], [ 136.1361, 35.928 ], [ 136.14655, 35.92284 ], [ 136.14943, 35.91972 ], [ 136.15956, 35.91913 ], [ 136.16431, 35.92223 ], [ 136.16865, 35.92734 ], [ 136.17051, 35.93222 ], [ 136.17136, 35.93549 ], [ 136.17013, 35.94381 ], [ 136.17211, 35.94853 ], [ 136.17593, 35.94327 ], [ 136.17723, 35.93531 ], [ 136.17799, 35.92779 ], [ 136.17725, 35.91998 ], [ 136.1762, 35.91402 ], [ 136.17475, 35.90923 ], [ 136.17453, 35.90782 ], [ 136.17591, 35.90319 ], [ 136.17598, 35.90105 ], [ 136.17436, 35.89648 ], [ 136.17333, 35.88994 ], [ 136.17179, 35.88626 ], [ 136.16871, 35.88152 ], [ 136.16484, 35.87843 ], [ 136.15622, 35.87643 ], [ 136.13845, 35.87163 ], [ 136.12463, 35.86437 ], [ 136.12499, 35.86645 ], [ 136.12499, 35.86935 ], [ 136.1244, 35.87165 ], [ 136.11355, 35.87663 ], [ 136.11058, 35.88087 ], [ 136.11014, 35.88438 ], [ 136.11193, 35.8868 ], [ 136.11164, 35.89067 ], [ 136.11387, 35.89212 ], [ 136.11254, 35.89515 ], [ 136.10733, 35.89491 ], [ 136.10257, 35.89685 ], [ 136.10078, 35.89516 ], [ 136.09334, 35.89396 ], [ 136.08537, 35.89433 ] ] ] ] } },
    { "type": "Feature", "properties": { "ryuuiki_No": "H-3" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 136.26877, 35.82508 ], [ 136.26932, 35.81846 ], [ 136.26972, 35.81535 ], [ 136.26826, 35.81115 ], [ 136.26774, 35.80847 ], [ 136.26598, 35.80645 ], [ 136.26164, 35.80545 ], [ 136.25245, 35.80492 ], [ 136.24422, 35.806 ], [ 136.2336, 35.80626 ], [ 136.22741, 35.80477 ], [ 136.22214, 35.80487 ], [ 136.21758, 35.80396 ], [ 136.21564, 35.80093 ], [ 136.21672, 35.79879 ], [ 136.22099, 35.79638 ], [ 136.22047, 35.79445 ], [ 136.21829, 35.79193 ], [ 136.21674, 35.78866 ], [ 136.21407, 35.78837 ], [ 136.20211, 35.79179 ], [ 136.19581, 35.78752 ], [ 136.18899, 35.78098 ], [ 136.18403, 35.77889 ], [ 136.17692, 35.77747 ], [ 136.16734, 35.78387 ], [ 136.15982, 35.78682 ], [ 136.15508, 35.7877 ], [ 136.15014, 35.78985 ], [ 136.1509, 35.79516 ], [ 136.14857, 35.79801 ], [ 136.14434, 35.79873 ], [ 136.14065, 35.80389 ], [ 136.14042, 35.80857 ], [ 136.13775, 35.81118 ], [ 136.1359, 35.81706 ], [ 136.13179, 35.82504 ], [ 136.13241, 35.83034 ], [ 136.13015, 35.83555 ], [ 136.13058, 35.84252 ], [ 136.12965, 35.84437 ], [ 136.12718, 35.84639 ], [ 136.12264, 35.84673 ], [ 136.12068, 35.84765 ], [ 136.12163, 35.86068 ], [ 136.12463, 35.86437 ], [ 136.13845, 35.87163 ], [ 136.15622, 35.87643 ], [ 136.16484, 35.87843 ], [ 136.16871, 35.88152 ], [ 136.17179, 35.88626 ], [ 136.17333, 35.88994 ], [ 136.17436, 35.89648 ], [ 136.17598, 35.90105 ], [ 136.17591, 35.90319 ], [ 136.17453, 35.90782 ], [ 136.17705, 35.90681 ], [ 136.1811, 35.90555 ], [ 136.18307, 35.90401 ], [ 136.18365, 35.90187 ], [ 136.18451, 35.89084 ], [ 136.18337, 35.87526 ], [ 136.19273, 35.87218 ], [ 136.19551, 35.87066 ], [ 136.20532, 35.86163 ], [ 136.22231, 35.86027 ], [ 136.23047, 35.85598 ], [ 136.23319, 35.85515 ], [ 136.24351, 35.84771 ], [ 136.24891, 35.84768 ], [ 136.25166, 35.84497 ], [ 136.25697, 35.84381 ], [ 136.2607, 35.83904 ], [ 136.26039, 35.83259 ], [ 136.25965, 35.82596 ], [ 136.26125, 35.8258 ], [ 136.26877, 35.82508 ] ] ] ] } },
    { "type": "Feature", "properties": { "ryuuiki_No": "H-6" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 136.31595, 35.90876 ], [ 136.31215, 35.90471 ], [ 136.31183, 35.90236 ], [ 136.31037, 35.89875 ], [ 136.31127, 35.89517 ], [ 136.31272, 35.89328 ], [ 136.31219, 35.88875 ], [ 136.30773, 35.88422 ], [ 136.30665, 35.88024 ], [ 136.30616, 35.87843 ], [ 136.30388, 35.87592 ], [ 136.30005, 35.87316 ], [ 136.29436, 35.86922 ], [ 136.28981, 35.8678 ], [ 136.28774, 35.86596 ], [ 136.27764, 35.86784 ], [ 136.27224, 35.85785 ], [ 136.26581, 35.84955 ], [ 136.25909, 35.84536 ], [ 136.25697, 35.84381 ], [ 136.25166, 35.84497 ], [ 136.24891, 35.84768 ], [ 136.24351, 35.84771 ], [ 136.23319, 35.85515 ], [ 136.23047, 35.85598 ], [ 136.22231, 35.86027 ], [ 136.20532, 35.86163 ], [ 136.19551, 35.87066 ], [ 136.19273, 35.87218 ], [ 136.18337, 35.87526 ], [ 136.18451, 35.89084 ], [ 136.18365, 35.90187 ], [ 136.18307, 35.90401 ], [ 136.1811, 35.90555 ], [ 136.17705, 35.90681 ], [ 136.17453, 35.90782 ], [ 136.17475, 35.90923 ], [ 136.1762, 35.91402 ], [ 136.17725, 35.91998 ], [ 136.17799, 35.92779 ], [ 136.17723, 35.93531 ], [ 136.1793, 35.93623 ], [ 136.18117, 35.938 ], [ 136.18366, 35.94488 ], [ 136.18275, 35.94891 ], [ 136.18637, 35.95252 ], [ 136.18701, 35.96025 ], [ 136.18167, 35.97109 ], [ 136.18396, 35.97781 ], [ 136.18583, 35.9852 ], [ 136.19255, 35.9869 ], [ 136.20607, 35.9792 ], [ 136.20824, 35.97852 ], [ 136.2133, 35.97877 ], [ 136.2212, 35.98965 ], [ 136.22807, 35.9913 ], [ 136.23246, 35.99271 ], [ 136.23875, 35.98481 ], [ 136.25134, 35.98356 ], [ 136.25608, 35.9817 ], [ 136.26414, 35.9811 ], [ 136.2765, 35.97713 ], [ 136.27702, 35.97404 ], [ 136.28122, 35.97413 ], [ 136.28432, 35.97508 ], [ 136.28797, 35.97501 ], [ 136.29572, 35.97442 ], [ 136.30555, 35.96584 ], [ 136.31256, 35.96605 ], [ 136.31256, 35.96605 ], [ 136.31286, 35.96606 ], [ 136.3152, 35.96748 ], [ 136.31901, 35.9654 ], [ 136.31892, 35.96386 ], [ 136.31869, 35.95958 ], [ 136.32496, 35.95766 ], [ 136.32478, 35.95632 ], [ 136.32374, 35.95423 ], [ 136.32771, 35.95224 ], [ 136.33184, 35.95317 ], [ 136.33801, 35.95257 ], [ 136.33881, 35.95079 ], [ 136.33206, 35.94463 ], [ 136.3323, 35.94286 ], [ 136.33475, 35.94064 ], [ 136.33474, 35.93811 ], [ 136.3345, 35.93304 ], [ 136.33521, 35.92987 ], [ 136.33452, 35.92702 ], [ 136.32623, 35.92226 ], [ 136.31777, 35.92212 ], [ 136.31414, 35.92035 ], [ 136.31066, 35.91639 ], [ 136.31216, 35.91465 ], [ 136.31567, 35.91396 ], [ 136.31595, 35.90876 ] ] ] ] } },
    { "type": "Feature", "properties": { "ryuuiki_No": "H-7-2" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 136.09021, 36.01475 ], [ 136.07903, 36.01528 ], [ 136.07646, 36.0187 ], [ 136.07564, 36.0261 ], [ 136.07141, 36.03341 ], [ 136.06738, 36.03686 ], [ 136.0677, 36.04819 ], [ 136.07608, 36.05012 ], [ 136.07894, 36.0516 ], [ 136.08715, 36.05583 ], [ 136.10495, 36.06236 ], [ 136.11054, 36.06513 ], [ 136.11593, 36.06857 ], [ 136.11738, 36.07226 ], [ 136.12452, 36.07326 ], [ 136.13267, 36.0732 ], [ 136.13756, 36.07054 ], [ 136.15577, 36.07272 ], [ 136.16008, 36.07641 ], [ 136.1743, 36.07874 ], [ 136.18074, 36.08292 ], [ 136.18244, 36.07689 ], [ 136.18665, 36.07089 ], [ 136.19325, 36.06514 ], [ 136.19926, 36.06291 ], [ 136.2076, 36.06318 ], [ 136.21761, 36.0517 ], [ 136.22946, 36.05122 ], [ 136.23248, 36.04925 ], [ 136.23633, 36.04764 ], [ 136.23939, 36.04591 ], [ 136.24151, 36.04365 ], [ 136.24456, 36.03723 ], [ 136.24921, 36.03115 ], [ 136.2313, 36.03066 ], [ 136.22085, 36.03086 ], [ 136.21547, 36.03256 ], [ 136.20656, 36.0332 ], [ 136.20077, 36.03438 ], [ 136.1984, 36.03339 ], [ 136.19147, 36.03252 ], [ 136.18596, 36.03304 ], [ 136.17888, 36.04102 ], [ 136.1736, 36.0448 ], [ 136.17111, 36.05261 ], [ 136.16691, 36.05209 ], [ 136.16699, 36.04524 ], [ 136.16492, 36.04272 ], [ 136.16243, 36.04054 ], [ 136.15777, 36.03794 ], [ 136.14527, 36.03727 ], [ 136.14517, 36.03727 ], [ 136.14101, 36.03536 ], [ 136.13612, 36.03409 ], [ 136.13497, 36.02909 ], [ 136.12754, 36.02185 ], [ 136.12681, 36.01799 ], [ 136.12877, 36.01462 ], [ 136.12556, 36.01085 ], [ 136.1206, 36.01094 ], [ 136.11795, 36.00934 ], [ 136.11697, 36.0059 ], [ 136.11552, 36.00489 ], [ 136.10306, 36.00464 ], [ 136.09888, 36.00886 ], [ 136.09423, 36.01029 ], [ 136.09021, 36.01475 ] ] ] ] } },
    { "type": "Feature", "properties": { "ryuuiki_No": "H-7-1" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 136.2765, 35.97713 ], [ 136.26414, 35.9811 ], [ 136.25608, 35.9817 ], [ 136.25134, 35.98356 ], [ 136.23875, 35.98481 ], [ 136.23246, 35.99271 ], [ 136.22807, 35.9913 ], [ 136.2212, 35.98965 ], [ 136.2133, 35.97877 ], [ 136.20824, 35.97852 ], [ 136.20607, 35.9792 ], [ 136.19255, 35.9869 ], [ 136.18583, 35.9852 ], [ 136.18396, 35.97781 ], [ 136.18167, 35.97109 ], [ 136.18701, 35.96025 ], [ 136.18637, 35.95252 ], [ 136.18275, 35.94891 ], [ 136.18366, 35.94488 ], [ 136.18117, 35.938 ], [ 136.1793, 35.93623 ], [ 136.17723, 35.93531 ], [ 136.17593, 35.94327 ], [ 136.17211, 35.94853 ], [ 136.17318, 35.95397 ], [ 136.16953, 35.95979 ], [ 136.17051, 35.96483 ], [ 136.16751, 35.96942 ], [ 136.16631, 35.97626 ], [ 136.16333, 35.98017 ], [ 136.1616, 35.98607 ], [ 136.15774, 35.99027 ], [ 136.1585, 35.99604 ], [ 136.14284, 35.98561 ], [ 136.13318, 35.98336 ], [ 136.13216, 35.98075 ], [ 136.12732, 35.97648 ], [ 136.12528, 35.97981 ], [ 136.11919, 35.98387 ], [ 136.11547, 35.98453 ], [ 136.11552, 36.00489 ], [ 136.11697, 36.0059 ], [ 136.11795, 36.00934 ], [ 136.1206, 36.01094 ], [ 136.12556, 36.01085 ], [ 136.12877, 36.01462 ], [ 136.12681, 36.01799 ], [ 136.12754, 36.02185 ], [ 136.13497, 36.02909 ], [ 136.13612, 36.03409 ], [ 136.14101, 36.03536 ], [ 136.14517, 36.03727 ], [ 136.14527, 36.03727 ], [ 136.15777, 36.03794 ], [ 136.16243, 36.04054 ], [ 136.16492, 36.04272 ], [ 136.16699, 36.04524 ], [ 136.16691, 36.05209 ], [ 136.17111, 36.05261 ], [ 136.1736, 36.0448 ], [ 136.17888, 36.04102 ], [ 136.18596, 36.03304 ], [ 136.19147, 36.03252 ], [ 136.1984, 36.03339 ], [ 136.20077, 36.03438 ], [ 136.20656, 36.0332 ], [ 136.21547, 36.03256 ], [ 136.22085, 36.03086 ], [ 136.2313, 36.03066 ], [ 136.24921, 36.03115 ], [ 136.25816, 36.02595 ], [ 136.27091, 36.02486 ], [ 136.27567, 36.0241 ], [ 136.2799, 36.02153 ], [ 136.28062, 36.02109 ], [ 136.28267, 36.02034 ], [ 136.28705, 36.02 ], [ 136.29056, 36.0201 ], [ 136.29288, 36.01553 ], [ 136.29381, 36.01142 ], [ 136.29352, 36.00982 ], [ 136.29249, 36.00834 ], [ 136.28529, 36.00046 ], [ 136.27884, 35.99382 ], [ 136.27764, 35.98691 ], [ 136.27566, 35.98218 ], [ 136.2765, 35.97713 ] ] ] ] } },
    { "type": "Feature", "properties": { "ryuuiki_No": "H-5" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 136.17211, 35.94853 ], [ 136.17013, 35.94381 ], [ 136.17136, 35.93549 ], [ 136.17051, 35.93222 ], [ 136.16865, 35.92734 ], [ 136.16431, 35.92223 ], [ 136.15956, 35.91913 ], [ 136.14943, 35.91972 ], [ 136.14655, 35.92284 ], [ 136.1361, 35.928 ], [ 136.13112, 35.92765 ], [ 136.12837, 35.92218 ], [ 136.12443, 35.91816 ], [ 136.11926, 35.91673 ], [ 136.11647, 35.91371 ], [ 136.10934, 35.91451 ], [ 136.10707, 35.91363 ], [ 136.09225, 35.9147 ], [ 136.08869, 35.91145 ], [ 136.08424, 35.90542 ], [ 136.08537, 35.89433 ], [ 136.08082, 35.88971 ], [ 136.07473, 35.88568 ], [ 136.07132, 35.88484 ], [ 136.0624, 35.8848 ], [ 136.05759, 35.88729 ], [ 136.05256, 35.8874 ], [ 136.04975, 35.88427 ], [ 136.04644, 35.88234 ], [ 136.04293, 35.88082 ], [ 136.03675, 35.88063 ], [ 136.03439, 35.88064 ], [ 136.03137, 35.87915 ], [ 136.0241, 35.87929 ], [ 136.02084, 35.88167 ], [ 136.02103, 35.89419 ], [ 136.02095, 35.89629 ], [ 136.02384, 35.89948 ], [ 136.0258, 35.90502 ], [ 136.01949, 35.90525 ], [ 136.01868, 35.9109 ], [ 136.01641, 35.91242 ], [ 136.01352, 35.91452 ], [ 136.01207, 35.91788 ], [ 136.01517, 35.92544 ], [ 136.01125, 35.92939 ], [ 136.01038, 35.93144 ], [ 136.01621, 35.93182 ], [ 136.01724, 35.93938 ], [ 136.02065, 35.94459 ], [ 136.02035, 35.9482 ], [ 136.01435, 35.94866 ], [ 136.01425, 35.95526 ], [ 136.01177, 35.95845 ], [ 136.01187, 35.96215 ], [ 136.01495, 35.96802 ], [ 136.022, 35.97517 ], [ 136.02044, 35.97632 ], [ 136.01942, 35.98365 ], [ 136.02345, 35.98584 ], [ 136.02542, 35.99029 ], [ 136.02914, 35.9939 ], [ 136.03679, 35.99919 ], [ 136.04517, 36.00305 ], [ 136.04899, 36.00851 ], [ 136.05169, 36.01136 ], [ 136.05334, 36.01556 ], [ 136.05739, 36.03496 ], [ 136.06392, 36.04529 ], [ 136.0677, 36.04819 ], [ 136.06738, 36.03686 ], [ 136.07141, 36.03341 ], [ 136.07564, 36.0261 ], [ 136.07646, 36.0187 ], [ 136.07903, 36.01528 ], [ 136.09021, 36.01475 ], [ 136.09423, 36.01029 ], [ 136.09888, 36.00886 ], [ 136.10306, 36.00464 ], [ 136.11552, 36.00489 ], [ 136.11547, 35.98453 ], [ 136.11919, 35.98387 ], [ 136.12528, 35.97981 ], [ 136.12732, 35.97648 ], [ 136.13216, 35.98075 ], [ 136.13318, 35.98336 ], [ 136.14284, 35.98561 ], [ 136.1585, 35.99604 ], [ 136.15774, 35.99027 ], [ 136.1616, 35.98607 ], [ 136.16333, 35.98017 ], [ 136.16631, 35.97626 ], [ 136.16751, 35.96942 ], [ 136.17051, 35.96483 ], [ 136.16953, 35.95979 ], [ 136.17318, 35.95397 ], [ 136.17211, 35.94853 ] ] ] ] } }
  ]

  const precipitationData = [
    {"年月日":"2004\/7\/17","時刻":"23:00","流域全体（深谷上流域）":0.0,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
    {"年月日":"2004\/7\/18","時刻":"0:00","流域全体（深谷上流域）":0.7,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.06,"H-3":0.01,"H-4-1":0.04,"H-4-2":0.0,"H-5":2.53,"H-6":0.24,"H-7-1":0.4,"H-7-2":1.39},
    {"年月日":"2004\/7\/18","時刻":"1:00","流域全体（深谷上流域）":5.43,"H-1-1":1.0,"H-1-2":1.0,"H-2-1":1.0,"H-2-2":1.11,"H-3":1.81,"H-4-1":2.23,"H-4-2":5.54,"H-5":4.28,"H-6":11.19,"H-7-1":5.06,"H-7-2":5.44},
    {"年月日":"2004\/7\/18","時刻":"2:00","流域全体（深谷上流域）":1.17,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.24,"H-5":0.33,"H-6":1.57,"H-7-1":1.69,"H-7-2":null},
    {"年月日":"2004\/7\/18","時刻":"3:00","流域全体（深谷上流域）":0.87,"H-1-1":0.99,"H-1-2":1.0,"H-2-1":0.75,"H-2-2":0.22,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.41,"H-6":1.05,"H-7-1":1.51,"H-7-2":null},
    {"年月日":"2004\/7\/18","時刻":"4:00","流域全体（深谷上流域）":4.92,"H-1-1":3.98,"H-1-2":4.0,"H-2-1":3.49,"H-2-2":6.09,"H-3":3.28,"H-4-1":0.03,"H-4-2":0.03,"H-5":1.69,"H-6":2.17,"H-7-1":5.21,"H-7-2":1.58},
    {"年月日":"2004\/7\/18","時刻":"5:00","流域全体（深谷上流域）":19.63,"H-1-1":18.81,"H-1-2":19.0,"H-2-1":14.67,"H-2-2":7.91,"H-3":3.72,"H-4-1":4.43,"H-4-2":22.15,"H-5":27.64,"H-6":32.72,"H-7-1":16.99,"H-7-2":14.32},
    {"年月日":"2004\/7\/18","時刻":"6:00","流域全体（深谷上流域）":15.18,"H-1-1":0.02,"H-1-2":0.0,"H-2-1":0.51,"H-2-2":1.07,"H-3":0.52,"H-4-1":0.01,"H-4-2":0.0,"H-5":0.9,"H-6":7.78,"H-7-1":33.07,"H-7-2":28.23},
    {"年月日":"2004\/7\/18","時刻":"7:00","流域全体（深谷上流域）":16.28,"H-1-1":1.01,"H-1-2":1.0,"H-2-1":1.25,"H-2-2":2.75,"H-3":2.54,"H-4-1":2.19,"H-4-2":5.12,"H-5":10.68,"H-6":16.74,"H-7-1":23.5,"H-7-2":24.32},
    {"年月日":"2004\/7\/18","時刻":"8:00","流域全体（深谷上流域）":29.33,"H-1-1":5.07,"H-1-2":5.0,"H-2-1":6.53,"H-2-2":10.9,"H-3":12.9,"H-4-1":14.04,"H-4-2":15.43,"H-5":18.06,"H-6":30.94,"H-7-1":49.18,"H-7-2":48.16},
    {"年月日":"2004\/7\/18","時刻":"9:00","流域全体（深谷上流域）":43.63,"H-1-1":8.3,"H-1-2":8.0,"H-2-1":14.88,"H-2-2":21.47,"H-3":27.37,"H-4-1":30.28,"H-4-2":33.99,"H-5":52.96,"H-6":60.52,"H-7-1":58.27,"H-7-2":47.53},
    {"年月日":"2004\/7\/18","時刻":"10:00","流域全体（深谷上流域）":33.67,"H-1-1":29.03,"H-1-2":29.0,"H-2-1":29.76,"H-2-2":36.84,"H-3":28.59,"H-4-1":19.3,"H-4-2":39.37,"H-5":17.75,"H-6":42.64,"H-7-1":26.71,"H-7-2":5.95},
    {"年月日":"2004\/7\/18","時刻":"11:00","流域全体（深谷上流域）":7.5,"H-1-1":26.11,"H-1-2":26.0,"H-2-1":28.55,"H-2-2":24.81,"H-3":15.84,"H-4-1":6.62,"H-4-2":1.71,"H-5":0.4,"H-6":1.35,"H-7-1":0.52,"H-7-2":0.18},
    {"年月日":"2004\/7\/18","時刻":"12:00","流域全体（深谷上流域）":1.85,"H-1-1":0.02,"H-1-2":0.0,"H-2-1":0.51,"H-2-2":0.67,"H-3":0.92,"H-4-1":0.94,"H-4-2":0.22,"H-5":0.65,"H-6":2.09,"H-7-1":1.69,"H-7-2":0.86},
    {"年月日":"2004\/7\/18","時刻":"13:00","流域全体（深谷上流域）":2.3,"H-1-1":4.02,"H-1-2":4.0,"H-2-1":4.51,"H-2-2":6.41,"H-3":3.62,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":1.55,"H-7-1":0.0,"H-7-2":0.0},
    {"年月日":"2004\/7\/18","時刻":"14:00","流域全体（深谷上流域）":0.53,"H-1-1":0.02,"H-1-2":0.0,"H-2-1":0.51,"H-2-2":0.67,"H-3":0.44,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.05,"H-7-1":0.0,"H-7-2":0.0},
    {"年月日":"2004\/7\/18","時刻":"15:00","流域全体（深谷上流域）":0.54,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
    {"年月日":"2004\/7\/18","時刻":"16:00","流域全体（深谷上流域）":0.29,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
    {"年月日":"2004\/7\/18","時刻":"17:00","流域全体（深谷上流域）":0.13,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
    {"年月日":"2004\/7\/18","時刻":"18:00","流域全体（深谷上流域）":0.33,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
    {"年月日":"2004\/7\/18","時刻":"19:00","流域全体（深谷上流域）":0.14,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
    {"年月日":"2004\/7\/18","時刻":"20:00","流域全体（深谷上流域）":0.04,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
    {"年月日":"2004\/7\/18","時刻":"21:00","流域全体（深谷上流域）":0.0,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0},
    {"年月日":"2004\/7\/18","時刻":"22:00","流域全体（深谷上流域）":0.0,"H-1-1":0.0,"H-1-2":0.0,"H-2-1":0.0,"H-2-2":0.0,"H-3":0.0,"H-4-1":0.0,"H-4-2":0.0,"H-5":0.0,"H-6":0.0,"H-7-1":0.0,"H-7-2":0.0}
  ];

  useEffect(() => {
    if (map.current) return;

    const initialize = async () => {
      mapboxgl.accessToken = mapboxToken;
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/shuheikozu/clyy70dzo00a201r5d0bl14bx',
        center: [136.16932, 35.81040],
        zoom: 9.5,
        pitch: 45,
        bearing: -17.6,
      });

      map.current.on('load', async () => {
        try {
          const response = await fetch('/九頭竜ダム地点_修正.json');
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          
          const geojson = await response.json();
          console.log(geojson.features)
          map.current!.addSource('geojson-points-main', {
            type: 'geojson',
            data: geojson,
          });
      
          map.current!.loadImage(trapezoidImage, (error, image) => {
            if (error || !image) return console.error('Failed to load image:', error);
      
            map.current!.addImage('custom-marker', image);
            map.current!.addLayer({
              id: 'geojson-points-main',
              type: 'symbol',
              source: 'geojson-points-main',
              layout: {
                'icon-image': 'custom-marker',
                'icon-size': 0.05,
              },
            });
            let popup: mapboxgl.Popup | null = null;

            map.current!.on('mouseenter', 'geojson-points-main', (e) => {
              if (e.features && e.features.length > 0) {
                const feature = e.features[0];
                const coordinates = feature.geometry.coordinates.slice();
                const { 観測所名称 } = feature.properties;
      
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
                  .setLngLat(coordinates)
                  .setHTML(`<strong>${観測所名称}</strong>`)
                  .addTo(map.current!);
              }
      
              map.current!.getCanvas().style.cursor = 'pointer';
            });
      
            map.current!.on('mouseleave', 'geojson-points-main', () => {
              if (popup) {
                popup.remove();
                popup = null;
              }
      
              map.current!.getCanvas().style.cursor = '';
            });
          });
        } catch (error) {
          console.error('エラーです:', error);
        }

        try {
          const response = await fetch('/九頭竜治水基準点.json');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const geojson = await response.json();
          map.current!.addSource('geojson-points-water', {
            type: 'geojson',
            data: geojson,
          });
      
          map.current!.loadImage(triangleImage, (error, image) => {
            if (error || !image) return console.error('Failed to load image:', error);
      
            map.current!.addImage('custom-water', image);
            map.current!.addLayer({
              id: 'geojson-points-water',
              type: 'symbol',
              source: 'geojson-points-water',
              layout: {
                'icon-image': 'custom-water',
                'icon-size': 0.05,
              },
            });
            let popup: mapboxgl.Popup | null = null;
  
            map.current!.on('mouseenter', 'geojson-points-water', (e) => {
              if (e.features && e.features.length > 0) {
                const feature = e.features[0];
                const coordinates = feature.geometry.coordinates.slice();
                const { 観測所名称 } = feature.properties;
      
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
      
                popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
                  .setLngLat(coordinates)
                  .setHTML(`<strong>${観測所名称}</strong>`)
                  .addTo(map.current!);
              }
      
              map.current!.getCanvas().style.cursor = 'pointer';
            });
      
            map.current!.on('mouseleave', 'geojson-points-water', () => {
              if (popup) {
                popup.remove();
                popup = null;
              }
      
              map.current!.getCanvas().style.cursor = '';
            });
          });
        } catch (error) {
          console.error('エラーです:', error);
        }
        updateMapLayers(selectedTime);
      });
    }
    initialize();
  }, []);

  interface PrecipitationData {
    年月日: string;
    時刻: string;
    "流域全体（深谷上流域）": number;
    "H-1-1": number;
    "H-1-2": number;
    "H-2-1": number;
    "H-2-2": number;
    "H-3": number;
    "H-4-1": number;
    "H-4-2": number;
    "H-5": number;
    "H-6": number;
    "H-7-1": number;
    "H-7-2": number;
  }

  const updateMapLayers = async (time: string) => {
    
    const timeData = precipitationData.find(data => data["時刻"] === time);
    hukaya.forEach((feature: any) => {
      const layerId = `geojson-layer-${feature.properties.ryuuiki_No}`;
      if (timeData) {
        const ryuuikiNoKey = feature.properties.ryuuiki_No as keyof PrecipitationData;

        const height = timeData[ryuuikiNoKey] as number;
        
        if (height === 0) {
          if (map.current!.getLayer(`${layerId}-fill`)) {
            map.current!.removeLayer(`${layerId}-fill`);
          }
          if (map.current!.getLayer(`${layerId}-line`)) {
            map.current!.removeLayer(`${layerId}-line`);
          }
          if (map.current!.getSource(layerId)) {
            map.current!.removeSource(layerId);
          }
          return;
        }

        if(height > 80){
          addFillExtrusionLayer(map.current!, layerId, feature, height, '#c7408e')
        } else if(height > 50){
          addFillExtrusionLayer(map.current!, layerId, feature, height, '#ff5e40')
        } else if(height > 30){
          addFillExtrusionLayer(map.current!, layerId, feature, height, '#ffb340')
        } else if(height > 20){
          addFillExtrusionLayer(map.current!, layerId, feature, height, '#fff840')
        } else if(height > 10){
          addFillExtrusionLayer(map.current!, layerId, feature, height, '#4071ff')
        } else if(height > 5){
          addFillExtrusionLayer(map.current!, layerId, feature, height, '#59a9ff')
        } else if(height !== 0){
          addFillExtrusionLayer(map.current!, layerId, feature, height, '#b8deff')
        }
      }
    });
  };

  const TimeSlider = ({ onTimeChange }: { onTimeChange: (time: string) => void }) => {
    const [time, setTime] = useState(0);
  
    const handleSliderChange = (event: any, newValue: number | number[]) => {
      const Time = `${Math.floor(newValue as number)}:00`
      setTime(newValue as number);
      const formattedTime = formatTime(newValue as number);
      onTimeChange(Time);
      updateMapLayers(formattedTime)
    };
  
    const formatTime = (value: number) => {
      return `${Math.floor(value)}:00`;
    };
  
    return (
      <Slider
        value={time}
        min={0}
        max={23}
        step={1}
        marks
        valueLabelDisplay="auto"
        valueLabelFormat={formatTime}
        onChange={handleSliderChange}
      />
    );
  };

  const handleTimeChange = (time: string) => {
    console.log("Selected Time: ", time);
  };

  const homeLink = () => {
    navigate('/')
  }

  const IconContents = styled('div')({
    position: 'absolute',
    bottom: '50px',
    textAlign: 'center',
    width: '80%',
    margin: '10% 10% 0 10%',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '10px',
    border: '1px solid gray',
    zIndex: '1000',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  });

  return (
    <div style={{ display: 'flex'}}>
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css' rel='stylesheet' />
      <div ref={mapContainer} style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <LogoImg src={logo} alt="Logo" onClick={homeLink}/>
        <LegendContents>
          <Stack direction={'column'}>
            {
              RainObservatoryLegend.colors !== undefined && RainObservatoryLegend.colors.map((c, index) => {
                return (
                  <Stack key={index} height={18} alignItems={'center'}
                    sx={{
                      fontSize: 11,
                      px: 1,
                      backgroundColor: c.color,
                      color: '#ffffff',
                      textShadow: '1px 1px 1px rgba(30, 30, 30, 1), 1px 1px 2px rgba(30, 30, 30, 0.8), -1px 0px 1px rgba(30, 30, 30, 0.6)',
                      fontWeight: 'bold'
                    }}>
                    {c.value}
                  </Stack>
                )
              })
            }
          </Stack>
        </LegendContents>
        <IconContents>
          <TimeSlider onTimeChange={handleTimeChange} />
        </IconContents>
      </div>
    </div>
  );
}

export default MapBarComponent;
