<?php
// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Plugin strings are defined here.
 *
 * @package     tiny_corrections
 * @category    string
 * @copyright   2024 Nicolas Alexandropoulos <nicolas.alexandropoulos@unil.ch>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$string['pluginname'] = 'Tiny corrections';
$string['button_addcorrection'] = 'Add correction';
$string['button_removecorrection'] = 'Remove correction';
$string['settings'] = 'Inline text corrections settings';
$string['corrtypes'] = 'Correction types';
$string['corrtypes_desc'] = 'Please enter one correction type per line, in the form "abbreviation = description".<br><strong>Warning:</strong> each abbreviation must be unique!';
$string['corrtypes_default'] = '
a = plurialization
c = conjugation
d = determinant
g = grammar/syntax
m = missing word(s)
o = orthograph
p = preposition
t = tense
v = vocabulary
... = punctuation
? = other
';
$string['addcomment'] = 'Add';
$string['corrtype'] = 'Correction type';
$string['corrtext'] = 'Comment';
$string['dialogtitle'] = 'Add/modify a correction';
$string['fulltexttitle'] = 'Text with correction marks';
$string['addmark'] = 'Add a correction mark';
$string['removemark'] = 'Remove this correction mark';
$string['displayfulltext'] = 'Display text with correction marks';
$string['privacy:metadata'] = 'The tiny_corrections plugin does not store any personal data.';
$string['corrections:canmarkup'] = 'Use markup';
