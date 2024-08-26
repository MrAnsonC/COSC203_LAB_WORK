const express = require('express');
const birds = require('./nzbird.json');
const router = express.Router();

/* we will code each individual route handler here */
router.get('/random', (request, response) => {
    const randomIndex = Math.floor(Math.random() * 53);

    const data = birds[randomIndex];

    response.send(data);
});

router.get('/', (request, response) => {
    response.send(birds);
})

router.get('/sorted', (request, response) => {
    let category = request.query.category;
    let reverse = request.query.reverse === 'true';

    const data = birds.sort((a, b) => {
        if (reverse) {
            return b[category].localeCompare(a[category]);
        } else {
            return a[category].localeCompare(b[category]);
        }
    });

    response.send(data);
});


router.get('/penguins', (request, response) => {
    const data = birds.filter(
      (b) => b.common_name.toLowerCase().includes('penguin')
    );

    response.send(data);
})

router.get('/names', (request, response) => {
    const data = birds.map(
      (b) => b.common_name
    );

    response.send(data);
})

router.get('/filter', (request, response) => {
    let results = birds;

    const status = request.query.status;

    if (status !== undefined) {
        results = results.filter(
          (b) => b.status === status
        );
    }

    response.send(results);
})

router.get('/family', (request, response) => {
    let results = birds;

    const family = request.query.family;

    if (family !== undefined) {
        results = results.filter(
          (b) => b.family === family
        );
    }

    response.send(results);
})


// export the router last
module.exports = router;