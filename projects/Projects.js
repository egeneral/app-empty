
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


	loadProjects()
	{
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE HERE
		this.api.makeRequest('GET', `companies/${this.company_id}/projects`, {}, this.fillProjectsWithResponse.bind(this));
	}

	/**
	\ * Receive the response from the API call and perform the action of filling in the table with the list of projects
	 * @param {*} xhr_response is the response object we get from the api request
	 */
	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		// Code for filling the table goes here
		let projectList = JSON.parse(xhr_response);

		if (projectList.length === 0) 
		{
			console.log('Project is empty');
		} 
		else 
		{
			//let projectTable = document.getElementById('projects_table').getElementsByTagName('tbody')[0];
			//let rowIndex = 0;
			for (const [key, value] of Object.entries(projectList)) {
				this.createProjectRow(value);
			}
		}
	}

	createProjectRow(project)
	{
		console.log('----- createProjectRow -----', project);
		// INSERT YOUR CODE HERE
		console.log(JSON.stringify(project));
		let tableBody = document.getElementById('projects_table')
			.getElementsByTagName('tbody')[0];
		
		let row = tableBody.insertRow();
		row.id = project['project_id'];
		row.insertCell(0).innerHTML = project['project_id'];
		row.insertCell(1).innerHTML = project['title'];
		row.insertCell(2).innerHTML = project['num_entries'];

		let deleteButton = document.createElement('button');
		deleteButton.innerHTML = `<span id=${project['project_id']}>Delete</span>`;
		deleteButton.addEventListener('click', this.handleDelete.bind(this));
		
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

	showEditForm(event)
	{
		console.log('----- showEditForm -----', event);
		// INSERT YOUR CODE HERE


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

	handleDelete(event)
	{
		console.log('----- handleDelete -----', event);
		// INSERT YOUR CODE HERE
		this.api.makeRequest('DELETE', `projects/${event.target.id}`, {}, this.updateFromDelete.bind(this));
	}

	updateFromDelete(xhr_response)
	{
		console.log('----- updateFromDelete -----', xhr_response);
		// INSERT YOUR CODE HERE
		let tableBody = document.getElementById('projects_table').getElementsByTagName('tbody')[0];

		let result = JSON.parse(xhr_response);
		let row = document.getElementById(result.project_id);
		tableBody.deleteRow(row.rowIndex - 1);
	}



}
