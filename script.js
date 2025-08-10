// ===== Cached DOM elements =====
const typeSelect = document.getElementById("type-select");
const calculateBtn = document.getElementById("calculate-btn");
const pointsContainer = document.getElementById("points-container");
const resultContainer = document.getElementById("result");

// ===== Config =====
const DEFAULT_SCORE = 7;
const CLASS_CHECKBOX = "rating-point-checkbox";
const CLASS_SCORE = "rating-point-input";
const CLASS_WEIGHT = "weight-point-input";

const animePoints = [
	{ label: "Story", weight: 3 },
	{ label: "Characters", weight: 2 },
	{ label: "Animation Quality", weight: 2 },
	{ label: "Sound / Music / Voice Acting", weight: 1.5 },
	{ label: "Enjoyment", weight: 1.5 },
	{ label: "Originality", weight: 1 },
	{ label: "Themes", weight: 1 },
	{ label: "Rewatchability", weight: 1 },
	{ label: "Pacing", weight: 1 },
];

const mangaPoints = [
	{ label: "Story", weight: 3 },
	{ label: "Characters", weight: 2 },
	{ label: "Art Quality", weight: 2 },
	{ label: "Enjoyment", weight: 1.5 },
	{ label: "Originality", weight: 1 },
	{ label: "Themes", weight: 1 },
	{ label: "Re-readability", weight: 1 },
];

// ===== Functions =====
const getPointsForType = (type) =>
	type === "anime" ? animePoints : mangaPoints;

const renderPoints = (pointsArray) => {
	pointsContainer.innerHTML = pointsArray
		.map(
			({ label, weight }) => `
		<div class="rating-point">
			<div class="checkbox-container">
				<input type="checkbox" class="${CLASS_CHECKBOX}" id="${label}" checked>
				<label for="${label}" class="rating-point-label">${label}</label>
			</div>
			<input type="number" class="${CLASS_SCORE}" value="${DEFAULT_SCORE}" min="0" max="10" step="0.1">
			<input type="number" class="${CLASS_WEIGHT}" value="${weight}" min="0" max="10" step="0.1">
		</div>
	`
		)
		.join("");
};

const calculateWeightedAverage = (points) => {
	let totalWeight = 0,
		weightedSum = 0;
	points.forEach((point) => {
		const checkbox = point.querySelector(`.${CLASS_CHECKBOX}`);
		if (!checkbox.checked) return;

		const score =
			parseFloat(point.querySelector(`.${CLASS_SCORE}`).value) || 0;
		const weight =
			parseFloat(point.querySelector(`.${CLASS_WEIGHT}`).value) || 0;

		totalWeight += weight;
		weightedSum += score * weight;
	});
	return totalWeight ? weightedSum / totalWeight : 0;
};

const calculateRating = () => {
	const points = Array.from(
		pointsContainer.querySelectorAll(".rating-point")
	);
	const weightedAverage = calculateWeightedAverage(points).toFixed(2);
	resultContainer.textContent = `Weighted Average: ${weightedAverage}`;
};

// ===== Event Listeners =====
typeSelect.addEventListener("change", () => {
	renderPoints(getPointsForType(typeSelect.value));
	calculateRating(); // auto-update result on type change
});

calculateBtn.addEventListener("click", calculateRating);

// Optional live updates:
pointsContainer.addEventListener("input", calculateRating);

// ===== Initial render =====
renderPoints(animePoints);
calculateRating();
