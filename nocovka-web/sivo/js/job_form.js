/*function prepareFormDownload(formID)
{
	const form = document.getElementById(formID);
	form.addEventListener("submit", function (e)
	{
		e.preventDefault(); // Prevent the form from submitting traditionally
		const formData = new FormData(form);
		// Convert form data to a JavaScript object
		const formDataObject = {};
		formData.forEach((value, key) => {
			formDataObject[key] = value;
		});

        let lat = 0;
        let lon = 0;

        navigator.geolocation.getCurrentPosition((pos) => {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        });

        formDataObject["gps-lan"] = lat;
        formDataObject["gps-lon"] = lon;
		// Convert the data to JSON
		const jsonData = JSON.stringify(formDataObject);
		// Create a Blob object with the JSON data
		const blob = new Blob([jsonData], { type: "application/json" });
		// Create a download link for the JSON file
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "userInput.json";
		a.click();
	});
}*/

function prepareFormDownload(formID)
{
	const form = document.getElementById(formID);

	form.addEventListener("submit", function (e)
	{
		e.preventDefault();

		const formData = new FormData(form);
		const formDataObject = {};

		formData.forEach((value, key) => {
			formDataObject[key] = value;
		});

		// Wait for GPS permission + result
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const lat = pos.coords.latitude;
				const lon = pos.coords.longitude;

				formDataObject["gps-lat"] = lat;
				formDataObject["gps-lon"] = lon;

				// Now create JSON AFTER GPS is ready
				const jsonData = JSON.stringify(formDataObject, null, 2);
				const blob = new Blob([jsonData], { type: "application/json" });

				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = formDataObject["emp-id"] + ".json";
				a.click();
			},
			(err) => {
				// If user denies location → still proceed
				formDataObject["gps-lat"] = null;
				formDataObject["gps-lon"] = null;

				const jsonData = JSON.stringify(formDataObject, null, 2);
				const blob = new Blob([jsonData], { type: "application/json" });

				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = formDataObject["emp-id"] + ".json";
				a.click();
			}
		);
	});
}