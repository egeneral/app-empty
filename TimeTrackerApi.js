
class TimeTrackerApi {

	/**
	 * Constructor for TimeTrackerApi
	 * @param {string} api_key The API key to be used for this connection
	 * @param {string} base_url The base URL for the API calls
	 */
	constructor(api_key, base_url)
	{
		this.api_key = api_key;
		this.base_url = base_url;

		// INSERT YOUR CODE HERE

		// 1. We need an object of XMLHttpRequest
		this.xhr = new XMLHttpRequest();
	}

	/**
	 * This method is what is called whenever someone using the class wants to make a call to the API. 
	 * This method uses XMLHttpRequest (XHR) to perform the call to the server using 
	 * the proper settings to achieve the result. 
	 * @param {*} method is the HTTP method such as GET, POST
	 * @param {*} path is the what comes after the base URL in the call to the API.
	 * @param {*} parameters are an object of values that are passed for API calls that require additional information being passed.
	 * @param {*} success_handler is a callback function provided by the caller which is to be called if the response is successful.
	 */
	makeRequest(method, path, parameters = {}, success_handler = false)
	{
		console.log('----- makeRequest -----',
			{
				'method' : method,
				'path' : path,
				'handler': success_handler});
		// INSERT YOUR CODE HERE

		this.xhr.open(method, this.base_url+path);
		this.xhr.setRequestHeader('api-key', this.api_key);
		this.xhr.setRequestHeader('Content-type', 'multipart/form-data; charset=utf-8');
		this.xhrRequestHander(this.xhr, parameters, success_handler);
	}

	/**
	 * This is an internal method that is called to handle all XHR requests. 
	 * It must be called whenever an XHR request is loaded. This method must handle all 
	 * requests and react to them accordingly, including errors coming from the API.
	 * If an error_message is detected in the request, it must call  showError(), passing 
	 * in the returned object that contains the error messages. If there was no error, then the 
	 * success_handler must be called and you must pass in the response object as a parameter. 
	 * @param {*} xhr is the actual XMLHttpRequest that occurred. 
	 * @param {*} success_handler is the callback provided in the initial 
	 * request that must be called if the response was successful. 
	 */
	xhrRequestHander(xhr, parameters, success_handler = false)
	{
		console.log('----- xhrRequestHander -----', xhr.responseURL);
		// INSERT YOUR CODE HERE
		
		// open xhr request
		xhr.send(parameters);

		// when the request is successfull it will call the onload method.
		xhr.onload = () => {
			if (xhr.status !== 200) {
				console.log(`Response error: ${xhr.statusText}`);
			} else {
				success_handler(xhr.response);
			}
		}

		// some progress message
		xhr.onprogress = () => {
			
		}

		// would execute if request could not be made.
		xhr.onerror = () => {
			alert(`Could not complete the request! ${xhr.status} - ${xhr.statusText}`);
		}
	}
}