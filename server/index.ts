const express = require('express');

const PORT = 3001;
const insuranceDemo = express();

insuranceDemo.listen(PORT, () => {
    console.log(`Insurance Demo Server listening on: ${ PORT }`);
});
