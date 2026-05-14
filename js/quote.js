// Utility: Add/remove hidden class
function showOnlySection(sectionId) {
	["auto-fields", "home-fields", "life-fields"].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.classList.add("hidden");
	});
	const show = document.getElementById(sectionId);
	if (show) show.classList.remove("hidden");
}

// Utility: Clear validation errors
function clearErrors(form) {
	form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
	form.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
}

// Utility: Show error
function showError(input, message) {
	input.classList.add('is-invalid');
	let feedback = input.nextElementSibling;
	if (feedback && feedback.classList.contains('invalid-feedback')) {
		feedback.textContent = message;
	}
}

// Utility: Validate ZIP
function validateZipCode(zip) {
	return /^\d{5}$/.test(zip);
}

// DOMContentLoaded: Build dynamic forms and logic
window.addEventListener('DOMContentLoaded', function() {
	// Progress Stepper logic
	function updateProgress(step) {
		const steps = [1, 2, 3];
		steps.forEach(num => {
			document.querySelectorAll('.step-circle.step-' + num).forEach(el => {
				el.classList.remove('active', 'completed');
			});
		});
		for (let i = 1; i < step; i++) {
			document.querySelectorAll('.step-circle.step-' + i).forEach(el => el.classList.add('completed'));
		}
		document.querySelectorAll('.step-circle.step-' + step).forEach(el => el.classList.add('active'));
	}
	// Initial state
	updateProgress(1);
	// Insert hidden class in CSS if not present
	if (!document.querySelector('style#hidden-style')) {
		const style = document.createElement('style');
		style.id = 'hidden-style';
		style.textContent = `.hidden { display: none !important; }`;
		document.head.appendChild(style);
	}

	// Dynamic form fields
	const dynamicFormFields = document.getElementById('dynamicFormFields');
	function renderAutoFields() {
		dynamicFormFields.innerHTML = `
			<div id="auto-fields">
				<div class="mb-3">
					<label for="autoName" class="form-label">Full Name</label>
					<input type="text" class="form-control" id="autoName" name="autoName" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="autoAge" class="form-label">Age</label>
					<input type="number" class="form-control" id="autoAge" name="autoAge" min="16" max="100" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="autoZip" class="form-label">ZIP Code</label>
					<input type="text" class="form-control" id="autoZip" name="autoZip" maxlength="5" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="autoVehicleYear" class="form-label">Vehicle Year</label>
					<input type="number" class="form-control" id="autoVehicleYear" name="autoVehicleYear" min="1990" max="2026" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="autoVehicleMake" class="form-label">Vehicle Make</label>
					<select class="form-select" id="autoVehicleMake" name="autoVehicleMake" required>
						<option value="">Select</option>
						<option value="Toyota">Toyota</option>
						<option value="Honda">Honda</option>
						<option value="Ford">Ford</option>
						<option value="BMW">BMW</option>
						<option value="Tesla">Tesla</option>
						<option value="Other">Other</option>
					</select>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="autoVehicleModel" class="form-label">Vehicle Model</label>
					<input type="text" class="form-control" id="autoVehicleModel" name="autoVehicleModel" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="autoMileage" class="form-label">Annual Mileage</label>
					<select class="form-select" id="autoMileage" name="autoMileage" required>
						<option value="">Select</option>
						<option value="under5">Under 5,000</option>
						<option value="5-10">5,00010,000</option>
						<option value="10-15">10,00115,000</option>
						<option value="15-20">15,00120,000</option>
						<option value="over20">Over 20,000</option>
					</select>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="autoRecord" class="form-label">Driving Record</label>
					<select class="form-select" id="autoRecord" name="autoRecord" required>
						<option value="">Select</option>
						<option value="clean">Clean</option>
						<option value="1ticket">1 Ticket</option>
						<option value="2plus">2+ Tickets</option>
						<option value="accident">Accident in Last 3 Years</option>
					</select>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label class="form-label">Coverage Level</label>
					<div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="autoCoverage" id="autoBasic" value="basic" required>
							<label class="form-check-label" for="autoBasic">Basic</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="autoCoverage" id="autoStandard" value="standard">
							<label class="form-check-label" for="autoStandard">Standard</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="autoCoverage" id="autoPremium" value="premium">
							<label class="form-check-label" for="autoPremium">Premium</label>
						</div>
					</div>
					<div class="invalid-feedback"></div>
				</div>
			</div>`;
	}
	function renderHomeFields() {
		dynamicFormFields.innerHTML = `
			<div id="home-fields">
				<div class="mb-3">
					<label for="homeName" class="form-label">Full Name</label>
					<input type="text" class="form-control" id="homeName" name="homeName" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="homeAge" class="form-label">Age</label>
					<input type="number" class="form-control" id="homeAge" name="homeAge" min="18" max="100" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="homeZip" class="form-label">ZIP Code</label>
					<input type="text" class="form-control" id="homeZip" name="homeZip" maxlength="5" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="homeValue" class="form-label">Home Value ($)</label>
					<input type="number" class="form-control" id="homeValue" name="homeValue" min="50000" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="homeYearBuilt" class="form-label">Year Built</label>
					<input type="number" class="form-control" id="homeYearBuilt" name="homeYearBuilt" min="1900" max="2026" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="homeSqft" class="form-label">Square Footage</label>
					<input type="number" class="form-control" id="homeSqft" name="homeSqft" min="500" max="10000" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="homeConstruction" class="form-label">Construction Type</label>
					<select class="form-select" id="homeConstruction" name="homeConstruction" required>
						<option value="">Select</option>
						<option value="wood">Wood Frame</option>
						<option value="brick">Brick</option>
						<option value="concrete">Concrete</option>
						<option value="steel">Steel</option>
					</select>
					<div class="invalid-feedback"></div>
				</div>
				<div class="form-check mb-2">
					<input class="form-check-input" type="checkbox" id="homeSecurity" name="homeSecurity">
					<label class="form-check-label" for="homeSecurity">Has Security System</label>
				</div>
				<div class="form-check mb-3">
					<input class="form-check-input" type="checkbox" id="homeSprinklers" name="homeSprinklers">
					<label class="form-check-label" for="homeSprinklers">Has Fire Sprinklers</label>
				</div>
				<div class="mb-3">
					<label class="form-label">Coverage Level</label>
					<div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="homeCoverage" id="homeBasic" value="basic" required>
							<label class="form-check-label" for="homeBasic">Basic</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="homeCoverage" id="homeStandard" value="standard">
							<label class="form-check-label" for="homeStandard">Standard</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="homeCoverage" id="homePremium" value="premium">
							<label class="form-check-label" for="homePremium">Premium</label>
						</div>
					</div>
					<div class="invalid-feedback"></div>
				</div>
			</div>`;
	}
	function renderLifeFields() {
		dynamicFormFields.innerHTML = `
			<div id="life-fields">
				<div class="mb-3">
					<label for="lifeName" class="form-label">Full Name</label>
					<input type="text" class="form-control" id="lifeName" name="lifeName" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="lifeAge" class="form-label">Age</label>
					<input type="number" class="form-control" id="lifeAge" name="lifeAge" min="18" max="85" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="lifeZip" class="form-label">ZIP Code</label>
					<input type="text" class="form-control" id="lifeZip" name="lifeZip" maxlength="5" required>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="lifeGender" class="form-label">Gender</label>
					<select class="form-select" id="lifeGender" name="lifeGender" required>
						<option value="">Select</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="nonbinary">Non-binary</option>
					</select>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label class="form-label">Smoker</label>
					<div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="lifeSmoker" id="lifeSmokerYes" value="yes" required>
							<label class="form-check-label" for="lifeSmokerYes">Yes</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="lifeSmoker" id="lifeSmokerNo" value="no">
							<label class="form-check-label" for="lifeSmokerNo">No</label>
						</div>
					</div>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="lifeCoverageAmount" class="form-label">Coverage Amount</label>
					<select class="form-select" id="lifeCoverageAmount" name="lifeCoverageAmount" required>
						<option value="">Select</option>
						<option value="100000">$100,000</option>
						<option value="250000">$250,000</option>
						<option value="500000">$500,000</option>
						<option value="1000000">$1,000,000</option>
					</select>
					<div class="invalid-feedback"></div>
				</div>
				<div class="mb-3">
					<label for="lifeExercise" class="form-label">Exercise Frequency</label>
					<select class="form-select" id="lifeExercise" name="lifeExercise" required>
						<option value="">Select</option>
						<option value="rarely">Rarely</option>
						<option value="1-2">12 times/week</option>
						<option value="3-4">34 times/week</option>
						<option value="5plus">5+ times/week</option>
					</select>
					<div class="invalid-feedback"></div>
				</div>
				<div class="form-check mb-3">
					<input class="form-check-input" type="checkbox" id="lifePreExisting" name="lifePreExisting">
					<label class="form-check-label" for="lifePreExisting">Pre-existing Conditions</label>
				</div>
				<div class="mb-3">
					<label class="form-label">Coverage Level</label>
					<div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="lifeCoverage" id="lifeBasic" value="basic" required>
							<label class="form-check-label" for="lifeBasic">Basic</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="lifeCoverage" id="lifeStandard" value="standard">
							<label class="form-check-label" for="lifeStandard">Standard</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" name="lifeCoverage" id="lifePremium" value="premium">
							<label class="form-check-label" for="lifePremium">Premium</label>
						</div>
					</div>
					<div class="invalid-feedback"></div>
				</div>
			</div>`;
	}

	// Initial render
	renderAutoFields();

	// Insurance type switching
	document.querySelectorAll('input[name="insuranceType"]').forEach(radio => {
		radio.addEventListener('change', function() {
			if (this.value === 'auto') renderAutoFields();
			if (this.value === 'home') renderHomeFields();
			if (this.value === 'life') renderLifeFields();
			clearErrors(document.getElementById('quoteForm'));
			updateProgress(2);
		});
	});

	// Form validation and calculation
	document.getElementById('quoteForm').addEventListener('submit', function(e) {
		e.preventDefault();
		clearErrors(this);
		const type = document.querySelector('input[name="insuranceType"]:checked').value;
		let valid = true;
		let name, age, zip, coverage;
		let breakdown = [];
		updateProgress(2);
		// Validate and collect data for each type
		if (type === 'auto') {
			name = this.autoName;
			age = this.autoAge;
			zip = this.autoZip;
			coverage = this.autoCoverage;
			if (!name.value || name.value.trim().length < 2) { showError(name, 'Enter at least 2 characters.'); valid = false; }
			if (!age.value || age.value < 16 || age.value > 100) { showError(age, 'Age 16-100 required.'); valid = false; }
			if (!validateZipCode(zip.value)) { showError(zip, 'Enter a valid 5-digit ZIP.'); valid = false; }
			if (!this.autoVehicleYear.value || this.autoVehicleYear.value < 1990 || this.autoVehicleYear.value > 2026) { showError(this.autoVehicleYear, 'Year 1990-2026 required.'); valid = false; }
			if (!this.autoVehicleMake.value) { showError(this.autoVehicleMake, 'Select a make.'); valid = false; }
			if (!this.autoVehicleModel.value) { showError(this.autoVehicleModel, 'Enter model.'); valid = false; }
			if (!this.autoMileage.value) { showError(this.autoMileage, 'Select mileage.'); valid = false; }
			if (!this.autoRecord.value) { showError(this.autoRecord, 'Select record.'); valid = false; }
			if (!coverage.value) { showError(coverage.closest('.mb-3'), 'Select coverage.'); valid = false; }
			// If not valid, stop
			if (!valid) {
				updateProgress(2);
				return;
			}
			// Calculate quote
			const base = 75;
			let ageFactor = age.value < 25 ? 1.5 : (age.value <= 65 ? 1.0 : 1.3);
			let vehicleAge = 2026 - this.autoVehicleYear.value;
			let vehicleFactor = vehicleAge < 3 ? 1.3 : (vehicleAge <= 10 ? 1.0 : 0.8);
			let mileageFactor = { 'under5': 0.8, '5-10': 1.0, '10-15': 1.1, '15-20': 1.3, 'over20': 1.5 }[this.autoMileage.value];
			let recordFactor = { 'clean': 1.0, '1ticket': 1.2, '2plus': 1.5, 'accident': 1.8 }[this.autoRecord.value];
			let coverageFactor = { 'basic': 0.8, 'standard': 1.0, 'premium': 1.4 }[coverage.value];
			let monthly = base * ageFactor * vehicleFactor * mileageFactor * recordFactor * coverageFactor;
			breakdown = [
				['Age', age.value, ageFactor + (age.value < 25 ? ' (young driver)' : age.value > 65 ? ' (senior)' : '')],
				['Vehicle Age', vehicleAge + ' years', vehicleFactor],
				['Mileage', this.autoMileage.options[this.autoMileage.selectedIndex].text, mileageFactor],
				['Driving Record', this.autoRecord.options[this.autoRecord.selectedIndex].text, recordFactor],
				['Coverage Level', coverage.value.charAt(0).toUpperCase() + coverage.value.slice(1), coverageFactor]
			];
			updateProgress(3);
			showQuoteResult(name.value, 'Auto Insurance', monthly, breakdown);
		} else if (type === 'home') {
			name = this.homeName;
			age = this.homeAge;
			zip = this.homeZip;
			coverage = this.homeCoverage;
			if (!name.value || name.value.trim().length < 2) { showError(name, 'Enter at least 2 characters.'); valid = false; }
			if (!age.value || age.value < 18 || age.value > 100) { showError(age, 'Age 18-100 required.'); valid = false; }
			if (!validateZipCode(zip.value)) { showError(zip, 'Enter a valid 5-digit ZIP.'); valid = false; }
			if (!this.homeValue.value || this.homeValue.value < 50000) { showError(this.homeValue, 'Min $50,000.'); valid = false; }
			if (!this.homeYearBuilt.value || this.homeYearBuilt.value < 1900 || this.homeYearBuilt.value > 2026) { showError(this.homeYearBuilt, 'Year 1900-2026 required.'); valid = false; }
			if (!this.homeSqft.value || this.homeSqft.value < 500 || this.homeSqft.value > 10000) { showError(this.homeSqft, '500-10,000 sqft.'); valid = false; }
			if (!this.homeConstruction.value) { showError(this.homeConstruction, 'Select type.'); valid = false; }
			if (!coverage.value) { showError(coverage.closest('.mb-3'), 'Select coverage.'); valid = false; }
			if (!valid) {
				updateProgress(2);
				return;
			}
			// Calculate quote
			let base = this.homeValue.value * 0.003 / 12;
			let yearFactor = this.homeYearBuilt.value < 1970 ? 1.4 : (this.homeYearBuilt.value < 2000 ? 1.1 : 1.0);
			let constructionFactor = { 'wood': 1.2, 'brick': 1.0, 'concrete': 0.9, 'steel': 0.85 }[this.homeConstruction.value];
			let sizeFactor = this.homeSqft.value * 0.01;
			let securityFactor = this.homeSecurity.checked ? 0.95 : 1.0;
			let sprinklerFactor = this.homeSprinklers.checked ? 0.92 : 1.0;
			let coverageFactor = { 'basic': 0.8, 'standard': 1.0, 'premium': 1.4 }[coverage.value];
			let monthly = (base * yearFactor * constructionFactor * securityFactor * sprinklerFactor * coverageFactor) + sizeFactor;
			breakdown = [
				['Home Value', '$' + this.homeValue.value, base.toFixed(2)],
				['Year Built', this.homeYearBuilt.value, yearFactor],
				['Construction', this.homeConstruction.options[this.homeConstruction.selectedIndex].text, constructionFactor],
				['Size', this.homeSqft.value + ' sqft', '+' + sizeFactor.toFixed(2)],
				['Security System', this.homeSecurity.checked ? 'Yes' : 'No', securityFactor],
				['Fire Sprinklers', this.homeSprinklers.checked ? 'Yes' : 'No', sprinklerFactor],
				['Coverage Level', coverage.value.charAt(0).toUpperCase() + coverage.value.slice(1), coverageFactor]
			];
			updateProgress(3);
			showQuoteResult(name.value, 'Home Insurance', monthly, breakdown);
		} else if (type === 'life') {
			name = this.lifeName;
			age = this.lifeAge;
			zip = this.lifeZip;
			coverage = this.lifeCoverage;
			if (!name.value || name.value.trim().length < 2) { showError(name, 'Enter at least 2 characters.'); valid = false; }
			if (!age.value || age.value < 18 || age.value > 85) { showError(age, 'Age 18-85 required.'); valid = false; }
			if (!validateZipCode(zip.value)) { showError(zip, 'Enter a valid 5-digit ZIP.'); valid = false; }
			if (!this.lifeGender.value) { showError(this.lifeGender, 'Select gender.'); valid = false; }
			if (!this.lifeSmoker.value) { showError(this.lifeSmoker[0].closest('.mb-3'), 'Select smoker status.'); valid = false; }
			if (!this.lifeCoverageAmount.value) { showError(this.lifeCoverageAmount, 'Select amount.'); valid = false; }
			if (!this.lifeExercise.value) { showError(this.lifeExercise, 'Select frequency.'); valid = false; }
			if (!coverage.value) { showError(coverage.closest('.mb-3'), 'Select coverage.'); valid = false; }
			if (!valid) {
				updateProgress(2);
				return;
			}
			// Calculate quote
			let base = this.lifeCoverageAmount.value * 0.0005 / 12;
			let ageFactor = age.value <= 30 ? 1.0 : (age.value <= 45 ? 1.5 : (age.value <= 60 ? 2.5 : 4.0));
			let smokerFactor = this.lifeSmoker.value === 'yes' ? 2.0 : 1.0;
			let exerciseFactor = { 'rarely': 1.3, '1-2': 1.1, '3-4': 1.0, '5plus': 0.9 }[this.lifeExercise.value];
			let preExistingFactor = this.lifePreExisting.checked ? 1.5 : 1.0;
			let genderFactor = { 'male': 1.1, 'female': 1.0, 'nonbinary': 1.05 }[this.lifeGender.value];
			let coverageFactor = { 'basic': 0.8, 'standard': 1.0, 'premium': 1.4 }[coverage.value];
			let monthly = base * ageFactor * smokerFactor * exerciseFactor * preExistingFactor * genderFactor * coverageFactor;
			breakdown = [
				['Coverage Amount', '$' + this.lifeCoverageAmount.value, base.toFixed(2)],
				['Age', age.value, ageFactor],
				['Smoker', this.lifeSmoker.value === 'yes' ? 'Yes' : 'No', smokerFactor],
				['Exercise', this.lifeExercise.options[this.lifeExercise.selectedIndex].text, exerciseFactor],
				['Pre-existing', this.lifePreExisting.checked ? 'Yes' : 'No', preExistingFactor],
				['Gender', this.lifeGender.options[this.lifeGender.selectedIndex].text, genderFactor],
				['Coverage Level', coverage.value.charAt(0).toUpperCase() + coverage.value.slice(1), coverageFactor]
			];
			updateProgress(3);
			showQuoteResult(name.value, 'Life Insurance', monthly, breakdown);
		}
	});

	// Show quote result
	function showQuoteResult(name, type, monthly, breakdown) {
		const result = document.getElementById('quoteResult');
		result.classList.remove('d-none');
		result.innerHTML = '';
		// Summary card
		const summary = document.createElement('div');
		summary.className = 'card mb-4 shadow-sm';
		summary.innerHTML = `<div class="card-body text-center">
			<h4 class="card-title mb-2">Quote Summary</h4>
			<p class="mb-1"><strong>Name:</strong> <span>${escapeHTML(name)}</span></p>
			<p class="mb-1"><strong>Insurance Type:</strong> <span>${escapeHTML(type)}</span></p>
			<p class="mb-1"><strong>Monthly Premium:</strong> <span class="text-success fw-bold">$${monthly.toFixed(2)}</span></p>
			<p><strong>Annual Premium:</strong> <span class="text-success fw-bold">$${(monthly*12).toFixed(2)}</span></p>
		</div>`;
		result.appendChild(summary);
		// Breakdown table
		const table = document.createElement('table');
		table.className = 'table table-striped';
		table.innerHTML = `<thead><tr><th>Factor</th><th>Your Info</th><th>Impact</th></tr></thead><tbody></tbody>`;
		const tbody = table.querySelector('tbody');
		breakdown.forEach(row => addBreakdownRow(tbody, ...row));
		result.appendChild(table);
		// Get Another Quote button
		const againBtn = document.createElement('button');
		againBtn.className = 'btn btn-outline-warning mt-3 me-2';
		againBtn.textContent = 'Get Another Quote';
		againBtn.onclick = function() {
			document.getElementById('quoteForm').reset();
			result.classList.add('d-none');
			renderAutoFields();
			document.querySelector('input#autoType').checked = true;
		};
		againBtn.onclick = function() {
			document.getElementById('quoteForm').reset();
			result.classList.add('d-none');
			renderAutoFields();
			document.querySelector('input#autoType').checked = true;
			updateProgress(1);
		};
		result.appendChild(againBtn);
		// Save Quote button
		const saveBtn = document.createElement('button');
		saveBtn.className = 'btn btn-warning mt-3 me-2';
		saveBtn.textContent = 'Save Quote';
		saveBtn.onclick = function() {
			// Save quote data to localStorage
			const quoteData = {
				name, type, monthly: monthly.toFixed(2), annual: (monthly*12).toFixed(2), breakdown,
				date: new Date().toLocaleString()
			};
			let quotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
			quotes.push(quoteData);
			localStorage.setItem('savedQuotes', JSON.stringify(quotes));
			renderSavedQuotes();
			alert('Quote saved!');
		};
		result.appendChild(saveBtn);
		// Print Quote button
		const printBtn = document.createElement('button');
		printBtn.className = 'btn btn-outline-secondary mt-3';
		printBtn.textContent = 'Print Quote';
		printBtn.onclick = function() {
			window.print();
		};
		result.appendChild(printBtn);

		// Animate result fade-in
		result.classList.add('quote-fade-in');
		setTimeout(() => result.classList.remove('quote-fade-in'), 1000);

		// Show saved quotes below
		renderSavedQuotes();
	}

	// Saved Quotes Section
	function renderSavedQuotes() {
		let container = document.getElementById('savedQuotesSection');
		if (!container) {
			container = document.createElement('div');
			container.id = 'savedQuotesSection';
			container.className = 'mt-5';
			document.getElementById('quoteResult').after(container);
		}
		let quotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
		if (quotes.length === 0) {
			container.innerHTML = '<h5 class="text-center text-muted">No saved quotes yet.</h5>';
			return;
		}
		container.innerHTML = '<h4 class="mb-3">Saved Quotes</h4>';
		quotes.forEach((q, i) => {
			const card = document.createElement('div');
			card.className = 'card mb-3';
			card.innerHTML = `<div class="card-body">
				<div class="d-flex justify-content-between align-items-center flex-wrap">
					<div>
						<strong>${q.type}</strong> for <strong>${q.name}</strong><br>
						<span class="text-success">$${q.monthly}/mo</span> ($${q.annual}/yr)
						<div class="small text-muted">${q.date}</div>
					</div>
					<button class="btn btn-sm btn-danger ms-2" data-index="${i}">Delete</button>
				</div>
				<div class="mt-2">
					<a href="#" class="show-breakdown small">Show breakdown</a>
					<div class="breakdown-table d-none mt-2"></div>
				</div>
			</div>`;
			// Delete button
			card.querySelector('button[data-index]').onclick = function() {
				quotes.splice(i, 1);
				localStorage.setItem('savedQuotes', JSON.stringify(quotes));
				renderSavedQuotes();
			};
			// Show breakdown
			card.querySelector('.show-breakdown').onclick = function(e) {
				e.preventDefault();
				const table = card.querySelector('.breakdown-table');
				if (table.classList.contains('d-none')) {
					table.classList.remove('d-none');
					table.innerHTML = `<table class="table table-sm table-bordered"><thead><tr><th>Factor</th><th>Your Info</th><th>Impact</th></tr></thead><tbody>${q.breakdown.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`).join('')}</tbody></table>`;
					this.textContent = 'Hide breakdown';
				} else {
					table.classList.add('d-none');
					this.textContent = 'Show breakdown';
				}
			};
			container.appendChild(card);
		});
	}

	// On page load, show saved quotes if any
	window.addEventListener('DOMContentLoaded', renderSavedQuotes);

	// Add breakdown row
	function addBreakdownRow(tbody, factor, userValue, impact) {
		const row = document.createElement('tr');
		row.innerHTML = `<td>${escapeHTML(factor)}</td><td>${escapeHTML(userValue)}</td><td>${escapeHTML(impact)}</td>`;
		tbody.appendChild(row);
	}

	// Escape HTML for safe DOM insertion
	function escapeHTML(str) {
		return String(str).replace(/[&<>'"]/g, function(tag) {
			const charsToReplace = {
				'&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
			};
			return charsToReplace[tag] || tag;
		});
	}
});

// Print-friendly CSS is handled in styles.css 
