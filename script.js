if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("service-worker.js")
		.then(() => console.log("Service Worker Registered"))
		.catch((err) => console.error("SW registration failed:", err));
}

// ===== Cached DOM elements =====
const typeSelect = document.getElementById("type-select");
const pointsContainer = document.getElementById("points-container");
const resultContainer = document.getElementById("result");
const stats = document.getElementById("stats");
const beyondTheWordsContainer = document.getElementById("beyond-the-words");
const understandingPointsContainer = document.getElementById(
	"understanding-points"
);

// ===== Config =====
const DEFAULT_SCORE = 7;
const CLASS_CHECKBOX = "rating-point-checkbox";
const CLASS_SCORE = "rating-point-input";
const CLASS_WEIGHT = "weight-point-input";

// --- Rating Scale Descriptions ---
const ratingScaleDescriptions = [
	{
		value: 10,
		label: "Masterpiece",
		description:
			"Truly exceptional, among the very best of all time. Strong in every category, with deep, powerful themes, and singular artistic vision. It resonates deeply and leaves a lasting impact.",
	},
	{
		value: 9.5,
		label: "Near Masterpiece",
		description:
			"Almost a masterpiece. Superb in nearly every aspect, with only minor, negligible flaws. It provides an outstanding and memorable experience.",
	},
	{
		value: 9,
		label: "Excellent",
		description:
			"Superb characters and story with very strong themes. It may have a couple minor flaws, but is otherwise head and shoulders above almost everything else. Highly notable and stands out.",
	},
	{
		value: 8.5,
		label: "Great",
		description:
			"Consistently great, with very few noticeable flaws. It offers an extremely enjoyable and well-executed experience, highly recommended.",
	},
	{
		value: 8,
		label: "Very Good",
		description:
			"A strong pick, above average for its genre. It has a stronger execution than many other series and starts to distinguish itself from the pack. Provides great enjoyment.",
	},
	{
		value: 7.5,
		label: "Good+",
		description:
			"A solid, enjoyable watch with some remarkable moments. While not perfect, it excels in certain areas, making it a worthwhile experience.",
	},
	{
		value: 7,
		label: "Good",
		description:
			"Worth watching – a solid, if average, entry for its category. Elements are competently employed, and it's generally enjoyable without glaring weaknesses.",
	},
	{
		value: 6.5,
		label: "Decent+",
		description:
			"Generally enjoyable but with noticeable shortcomings. It has value and can be entertaining, but doesn't quite stand out.",
	},
	{
		value: 6,
		label: "Decent",
		description:
			"Doesn't particularly stand out; it's a little weak for the genre. Could be worth a watch for mild entertainment, but can also be bland. Some elements don't perform as well.",
	},
	{
		value: 5.5,
		label: "Mediocre+",
		description:
			"Neither particularly good nor bad. It might have a few redeeming qualities but is generally unmemorable or otherwise lacking. It leans slightly towards okay.",
	},
	{
		value: 5,
		label: "Mediocre / Average",
		description:
			"So-so, generally unmemorable or otherwise lacking. This falls into the 'meh' category. Neither liked nor disliked.",
	},
	{
		value: 4.5,
		label: "Weak-",
		description:
			"Noticeably underwhelming, has clear problems that detract from the experience. It has more negatives than positives and might be disappointing.",
	},
	{
		value: 4,
		label: "Weak",
		description:
			"Few redeeming qualities and generally a waste of time. It has clear problems that will likely lead to complaints if discussed.",
	},
	{
		value: 3.5,
		label: "Bad-",
		description:
			"Substantially under-performing for the genre. There's something structurally wrong with the series, with critical flaws significantly detracting from it.",
	},
	{
		value: 3,
		label: "Bad",
		description:
			"Painful to watch, with very few redeeming qualities. Multiple critical flaws in its structure and execution.",
	},
	{
		value: 2.5,
		label: "Horrible-",
		description:
			"Extremely difficult to sit through. It has severe issues across most aspects, making it a frustrating experience.",
	},
	{
		value: 2,
		label: "Horrible",
		description:
			"A showcase of substantial structural flaws and completely failed execution. Weaknesses are so severe they eliminate almost any redeeming quality.",
	},
	{
		value: 1.5,
		label: "Appalling-",
		description:
			"Almost unwatchable. It fails on nearly all fronts and offers little to no entertainment or artistic value.",
	},
	{
		value: 1,
		label: "Appalling / Failure",
		description:
			"Mind-bleach inducing. Terrible in most aspects and fails to deliver in any meaningful or entertaining way. Avoid at all costs.",
	},
];

// --- Point Descriptions ---
const animePoints = [
	{
		label: "Story",
		weight: 3,
		description:
			"The plot, narrative structure, pacing, originality, twists, and overall coherence. Does it keep you engaged? Is it well-developed and impactful? Includes plot holes, character development, story structure, dialogue, ending, etc.",
	},
	{
		label: "Characters",
		weight: 2,
		description:
			"Development, depth, relatability, distinctiveness, and interaction. Are they memorable? Do they grow and change? Includes main and supporting cast. Are they compelling and do their motivations make sense?",
	},
	{
		label: "Animation Quality",
		weight: 2,
		description:
			"The visual execution, fluidity, art style consistency, and overall aesthetic appeal. Includes character designs, background art, special effects, and frame rate. Does it enhance the experience?",
	},
	{
		label: "Sound / Music / Voice Acting",
		weight: 1.5,
		description:
			"The quality of the soundtrack, opening/ending themes, background music, sound effects, and voice performances (Japanese and/or dub). Do they fit the mood and enhance immersion? Is the voice acting believable and well-cast?",
	},
	{
		label: "Enjoyment",
		weight: 1.5,
		description:
			"Your personal subjective enjoyment and overall satisfaction. How much fun did you have watching it? Did it leave you feeling satisfied? This can often override objective flaws if your personal enjoyment is high.",
	},
	{
		label: "Originality",
		weight: 1,
		description:
			"How unique and fresh the concepts, themes, and execution are. Does it bring something new to the table, or does it rely heavily on tropes? Innovation and creativity in storytelling or world-building.",
	},
	{
		label: "Themes",
		weight: 1,
		description:
			"The underlying messages, ideas, and philosophical concepts explored. Are they well-integrated and thought-provoking? Do they add depth to the narrative?",
	},
	{
		label: "Rewatchability",
		weight: 1,
		description:
			"How likely you are to rewatch the series. Does it offer new insights on subsequent viewings? Is it entertaining enough to revisit multiple times?",
	},
	{
		label: "Pacing",
		weight: 1,
		description:
			"The speed at which the story unfolds. Is it too fast, too slow, or just right? Does the pacing maintain engagement and build tension effectively?",
	},
];

const mangaPoints = [
	{
		label: "Story",
		weight: 3,
		description:
			"The plot, narrative structure, pacing, originality, twists, and overall coherence. Does it keep you engaged? Is it well-developed and impactful? Includes plot holes, character development, story structure, dialogue, ending, etc.",
	},
	{
		label: "Characters",
		weight: 2,
		description:
			"Development, depth, relatability, distinctiveness, and interaction. Are they memorable? Do they grow and change? Includes main and supporting cast. Are they compelling and do their motivations make sense?",
	},
	{
		label: "Art Quality",
		weight: 2,
		description:
			"The visual appeal of the artwork, including character designs, backgrounds, paneling, action choreography, and overall consistency. Does the art style enhance the storytelling and atmosphere?",
	},
	{
		label: "Enjoyment",
		weight: 1.5,
		description:
			"Your personal subjective enjoyment and overall satisfaction. How much fun did you have reading it? Did it leave you feeling satisfied? This can often override objective flaws if your personal enjoyment is high.",
	},
	{
		label: "Originality",
		weight: 1,
		description:
			"How unique and fresh the concepts, themes, and execution are. Does it bring something new to the table, or does it rely heavily on tropes? Innovation and creativity in storytelling or world-building.",
	},
	{
		label: "Themes",
		weight: 1,
		description:
			"The underlying messages, ideas, and philosophical concepts explored. Are they well-integrated and thought-provoking? Do they add depth to the narrative?",
	},
	{
		label: "Re-readability",
		weight: 1,
		description:
			"How likely you are to reread the series. Does it offer new insights on subsequent readings? Is it entertaining enough to revisit multiple times?",
	},
];

// ===== Functions =====
const getPointsForType = (type) =>
	type === "anime" ? animePoints : mangaPoints;

const renderPoints = (pointsArray) => {
	pointsContainer.innerHTML = pointsArray
		.map(
			({ label, weight, description }) => `
    <div class="rating-point">
      <div class="checkbox-container">
        <input type="checkbox" class="${CLASS_CHECKBOX}" id="${label}" checked>
        <label for="${label}" class="rating-point-label" title="${description}">${label}</label>
      </div>

      <select class="${CLASS_SCORE}">
        ${ratingScaleDescriptions
			.map(
				(item) =>
					`<option value="${item.value}" ${
						item.value === DEFAULT_SCORE ? "selected" : ""
					}>${item.value} - ${item.label}</option>`
			)
			.join("")}
      </select>

      <select class="${CLASS_WEIGHT}">
        ${Array.from({ length: 21 }, (_, i) => (i * 0.5).toFixed(1))
			.map(
				(val) =>
					`<option value="${val}" ${
						parseFloat(val) === weight ? "selected" : ""
					}>${val}</option>`
			)
			.join("")}
      </select>
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
	resultContainer.textContent = `Calculated Rating: ${weightedAverage}`;

	const percentages = getWeightedAveragePercent(points);
	stats.innerHTML = percentages
		.map(
			(p) =>
				`<div class="stat">${p.label}: ${p.percent.toFixed(
					2
				)}% of Total Weight</div>`
		)
		.join("");
};

const getWeightedAveragePercent = (points) => {
	let totalWeight = 0;

	points.forEach((point) => {
		const checkbox = point.querySelector(`.${CLASS_CHECKBOX}`);
		if (!checkbox.checked) return;

		const weight = parseFloat(
			point.querySelector(`.${CLASS_WEIGHT}`).value || 0
		);

		totalWeight += weight;
	});

	return points
		.map((point) => {
			const checkbox = point.querySelector(`.${CLASS_CHECKBOX}`);
			if (!checkbox.checked) return null;

			const label = point.querySelector(
				".rating-point-label"
			).textContent;
			const weight = parseFloat(
				point.querySelector(`.${CLASS_WEIGHT}`).value || 0
			);
			const percent = (weight / totalWeight) * 100;
			return { label, weight, percent };
		})
		.filter(Boolean);
};

// --- New Functions for Info Sections ---
const renderBeyondTheWords = () => {
	beyondTheWordsContainer.innerHTML = `
    <p>This section provides a deeper understanding of what each rating on a 1-10 scale might imply, moving beyond simple adjectives to guide you in your evaluation.</p>
    <ul>
      ${ratingScaleDescriptions
			.map(
				(item) => `
        <li><strong>${item.value} - ${item.label}:</strong> ${item.description}</li>
      `
			)
			.join("")}
    </ul>
  `;
};

const renderUnderstandingPoints = () => {
	let animePointsHtml = `<h3>For Anime:</h3><ul>`;
	animePoints.forEach((point) => {
		animePointsHtml += `<li><strong>${point.label}:</strong> ${point.description}</li>`;
	});
	animePointsHtml += `</ul>`;

	let mangaPointsHtml = `<h3>For Manga:</h3><ul>`;
	mangaPoints.forEach((point) => {
		mangaPointsHtml += `<li><strong>${point.label}:</strong> ${point.description}</li>`;
	});
	mangaPointsHtml += `</ul>`;

	understandingPointsContainer.innerHTML = `
    <p>These are the core elements often considered when rating anime or manga. Understanding what each point encompasses can help you provide a more comprehensive and fair evaluation.</p>
    <div class="points-description-grid">
      <div class="anime-points-description">
        ${animePointsHtml}
      </div>
      <div class="manga-points-description">
        ${mangaPointsHtml}
      </div>
    </div>
  `;
};

// ===== Event Listeners =====
typeSelect.addEventListener("change", () => {
	renderPoints(getPointsForType(typeSelect.value));
	calculateRating(); // auto-update result on type change
});

pointsContainer.addEventListener("input", calculateRating);

// ===== Initial render =====
renderPoints(animePoints);
calculateRating();
renderBeyondTheWords();
renderUnderstandingPoints();
