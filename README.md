# neo-scan

Connects to NASA NEOWS API and displays info about nearby Near Earth Objects in the browser.

The code which fetches the data from the API
is in js/main.js

This API is documented here:

https://api.nasa.gov/#getting-started


## Get an API key

Sign up for a NASA API key here

https://api.nasa.gov/index.html#apply-for-an-api-key

To change the API key open
`js/main.js` and look for the line near
the top that has:


`'api_key' : 'DEMO_KEY'`

Replace DEMO_KEY with your actual API key or your
requests will be automatically rate-limited.

If you want the data this tool uses you can download it here

https://ssd.jpl.nasa.gov/?sb_elem

## Thanks to 

### NASA NeoWS API

https://api.nasa.gov/api.html#NeoWS

### HTML5 Boilerplate

https://html5boilerplate.com/

### Tablesorter library

https://mottie.github.io/tablesorter/docs/

### Bootstrap 4

https://getbootstrap.com/

### jQuery

### Wikipedia