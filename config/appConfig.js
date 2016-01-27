var config = {
	databaseUrl    : 'localhost:27017/fhtagn',
    environment    : 'dev',
	sessionSecret  : 'topSecret',
	saltWorkFactor : 10,
	helmet : {
        csp: {
            directives : {
                defaultSrc : [
                    'self'
                ],
                scriptSrc  : [
                    'self',
                    'http://code.jquery.com/',
                    'http://maxcdn.bootstrapcdn.com/'
                ],
                styleSrc   : [
                    'self',
                    'http://bootswatch.com/'
                ],
                imgSrc     : [
                    'self'
                ],
                fontSrc    : [
                    'self',
                    'http://bootswatch.com/'
                ]
            },
            reportOnly: false,
            setAllHeaders: false,
            disableAndroid: false
        }
    }
}

module.exports = config;