
const api = new TimeTrackerApi(api_key_projects, api_url);


// INSERT YOUR CODE HERE

/**
 * Create an instance of the Projects class passing in our
 * API key read from the config file
 */
let projects = new Projects(api, company_id);
api.makeRequest('GET', `companies/${company_id}/users`, {}, (result) => { console.log(`Result: ${JSON.stringify(result)}`)});
//projects.loadProjects();

