const PORT = 3001;

import insuranceDemo from './server';

insuranceDemo.listen(PORT, () => {
    console.log(`Insurance Demo Server listening on: ${ PORT }`);
});
