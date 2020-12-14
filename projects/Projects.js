
class Projects {

	/**
	 * Projects Constructor
	 * @param {TimeTrackerApi} api
	 * @param {int} company_id
	 */
	constructor(api, company_id)
	{
		this.project_form = undefined;

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE HERE
		 this.loadProjects();
	}

	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////

	/**
	 * Calls the TimeTrackerApi and retrieves all projects for the Company
	 * 
	 */
	loadProjects()
	{
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE HERE
		this.api.makeRequest(
			'GET',
			`companies/${this.company_id}/projects`, 
			{}, 
			this.fillProjectsWithResponse.bind(this)
		);
	}

	/**
	 * Receive the response from the API call and perform the action of filling in the table with the list of projects
	 * @param {*} xhr_response is the response object we get from the api request
	 */
	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		// Code for filling the table goes here
		let projectList = JSON.parse(xhr_response);

		// There are no projects retrieved, exit the function
		// TODO: Apply styling on the page if the project list is empty
		if (projectList.length === 0) 
			return;
		
		// Iterate through the projectList and create a new row in the table
		for (const [key, value] of Object.entries(projectList)) {
			this.createProjectRow(value);
		}
	}

	/**
	 * Creates a new in the Projects Table
	 * @param {*} project is the object to be rendered in the row
	 */
	createProjectRow(project)
	{
		console.log('----- createProjectRow -----', project);
		// INSERT YOUR CODE HERE

		// Get a reference to the Projects Table
		let tableBody = document.getElementById('projects_table')
			.getElementsByTagName('tbody')[0];
		
		// Create a new row in the table and insert cell
		// information from the project parameter
		let row = tableBody.insertRow();
		row.id = project['project_id'];

		// When this row is clicked, the showEditForm
		// function will be called to handle the event
		row.onclick = this.showEditForm;

		row.insertCell(0).innerText = project['project_id'];
		row.insertCell(1).innerText = project['title'];
		row.insertCell(2).innerText = project['num_entries'];

		// The last column is a delete button. Here we dynamically
		// create a new Button element and set its' properties
		// and attributes, as well as the event handler
		let deleteButton = document.createElement('button');
		deleteButton.setAttribute('id', `btn-del-${project['project_id']}`);
		deleteButton.setAttribute('data-id', project['project_id']);
		deleteButton.innerText = 'Delete';
		deleteButton.addEventListener('click', this.handleDelete.bind(this));
		
		// Add the newly created button to the last column of the row
		row.insertCell(3).appendChild(deleteButton);
	}

	/////////////////////////////////////////////
	//`
	// FORMS
	//
	/////////////////////////////////////////////

	showCreateForm(event)
	{
		console.log('----- showCreateForm -----', event);
		// INSERT YOUR CODE HERE
	}

	/**
	 * Update the form values to the current object selected by
	 * the click event on the row.
	 * @param {*} event 
	 */
	showEditForm(event)
	{
		console.log('----- showEditForm -----', event);
		// INSERT YOUR CODE HERE
		
		// get the row parent element of the selected table cell
		let row = event.target.parentNode;
		// get the form
		let form = document.forms[0];

		// update the form elements based on the value
		// of the event target which is the clicked row
		form.elements[0].value = event.target.innerText;
		form.elements[1].id = row.id;
		
	}

	hideForm()
	{
		console.log('----- hideForm -----');
		// INSERT YOUR CODE HERE

	}

	handleFormSubmit(event)
	{
		console.log('----- handleFormSubmit -----', event);
		// INSERT YOUR CODE HERE

	}

	/////////////////////////////////////////////
	//
	// CREATE / EDIT
	//
	/////////////////////////////////////////////

	createNewProject(xhr_response)
	{
		console.log('----- createNewProject -----', xhr_response);
		// INSERT YOUR CODE HERE
	}

	updateProject(xhr_response)
	{
		console.log('----- updateProject -----', xhr_response);
		// INSERT YOUR CODE HERE
	}

	/////////////////////////////////////////////
	//
	// DELETE
	//
	/////////////////////////////////////////////

	/**
	 * Handles button click events for each record on the Projects table
	 * @param {*} event is the event parameter passed when an event is triggered
	 */
	handleDelete(event)
	{
		console.log('----- handleDelete -----', event);
		// INSERT YOUR CODE HERE

		// Get the button that fired the event, grab dataset information
		// and disable it to prevent double clicks.
		let button = event.target;
		let projectId = button.dataset.id;
		button.disabled = true;

		// Send a Delete request to the API to remove the current row in the table
		this.api.makeRequest(
			'DELETE', 
			`projects/${projectId}`, 
			{}, 
			this.updateFromDelete.bind(this)
		);
	}

	/**
	 * Updates the HTML structure of the table after a Project is deleted
	 * @param {*} xhr_response is the response from the API
	 */
	updateFromDelete(xhr_response)
	{
		console.log('----- updateFromDelete -----', xhr_response);
		// INSERT YOUR CODE HERE

		// Get a reference to the Projects table's tbody element
		let tableBody = document.getElementById('projects_table').getElementsByTagName('tbody')[0];

		// Parse the response from the API call and get
		// the project id that was just deleted. 
		let result = JSON.parse(xhr_response);

		// The project_id is the element ID for the row we deleted.
		let row = document.getElementById(result.project_id);
		// Remove the row from the table
		tableBody.deleteRow(row.rowIndex - 1);
	}
}
