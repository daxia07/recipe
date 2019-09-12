import _ from "lodash";

const app = require('express');
let words = ['sky', 'wood', 'forest', 'falcon',
    'pear', 'ocean', 'universe'];

let fel = _.first(words);
let lel = _.last(words);

console.log(lel);
console.log(fel);