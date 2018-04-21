# NEO Scan

Displays data for known Near Earth Objects (NEOs)
making their closest approach on any input date.

## NASA NEOWS API
The code which fetches the data from the API
is in `js/main.js`

This API is documented here:

https://api.nasa.gov/#getting-started

To run the app, open `index.html` in your browser

#### Get an API key
If you want to use the app past a few queries,
you will need to get a free API key from NASA

Sign up for a NASA API key here

https://api.nasa.gov/index.html#apply-for-an-api-key

To change the API key open
`js/main.js` and look for the line near
the top that has:


`'api_key' : 'DEMO_KEY'`

Replace DEMO_KEY with your actual API key or your
requests will be automatically rate-limited.


## Obtaining the data
The data used by this tool can be downloaded from here:

https://ssd.jpl.nasa.gov/sbdb_query.cgi

## Contributing
If you would like to add a new feature, change functionality, or use this tool in another project, feel free to fork the repository. If you feel your changes are a good direction for the project, open a pull request with a summary of your changes, and it will be reviewed.

If you find a bug or would like to see features added or changed, please open an issue on the github project.

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

### Tether library

http://tether.io/

### Wikipedia