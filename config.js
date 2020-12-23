/**
 * @var api_url
 * @type {string}
 * The URL that points to the main API path. All commands use this primary URL
 */
let api_url = 'https://acs2909.lusciousorange.com/t-api/';


/**
 * API KEYS
 * @type {string}
 * The three API keys for the three segments of the project. You must replace these YOUR KEYS for your respective roles.
 */
let api_key_time_tracking = 'gnzv946-wycn8jpm2tdg15b0-yzm2799';
let api_key_reports = 'mgbpjs4-kc5phz4jb6xf8mt1-vwyf5z4';
let api_key_projects = 'fhz32d6-6j7045p12nz8mct9-mwx4597';

/**
 *
 * @var {string} my_api_key
 * YOUR api key which is used for basic connections. When submitting for the final project, any of the three API keys
 * can be included here, but for any development work, you must use your own API key.
 */
let my_api_key = 'fhz32d6-6j7045p12nz8mct9-mwx4597';

/**
 * @var {int} company_id
 * Your company ID, you must replace this is your value once you know your company ID
 */
let company_id = 32;


/**
 * PROFILE CALL
 * This profile call must remain here as the first thing that happens in the config. It uses your API key to get the
 * profile of who is currently working.
 */
let my_api = new TimeTrackerApi(my_api_key, api_url);
my_api.makeRequest('GET','acs/profile', {}, saveUserID);
my_api = null;



function saveUserID(profile_object)
{
	console.log('----- saveUserID -----', profile_object);
	// INSERT YOUR CODE HERE
	localStorage.setItem('user', profile_object);
}

function convertSecondsToHoursMinutesSeconds(seconds)
{
	console.log('----- convertSecondsToHoursMinutesSeconds -----', seconds);
	// INSERT YOUR CODE HERE

}

function convertTimestampToDateFormat(timestamp)
{
	console.log('----- convertTimestampToDateFormat -----', timestamp);
	// INSERT YOUR CODE HERE

}

function showError(error_details)
{
	console.error('----- showError -----', error_details);
	// INSERT YOUR CODE HERE

}

