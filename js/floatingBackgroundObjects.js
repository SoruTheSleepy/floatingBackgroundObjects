// ##############################################################################################################################
// 	
//	Auteur / Author: NaorimSenchai.
//
//	Description: Generating animated objects moving from left to right and from right to left
//				 in the background of any HTML element.
//
// ##############################################################################################################################

/**
	 * // Fonction used to return a random number between two given parameters.
	 * @param {number} min - The minimum value
	 * @param {number} max - The maximum value
	 * @param {boolean} integer - Specifies if the result must be an integer or a float
	 * @returns {number} - Either an int or a float depending on the "integer" boolean value
	 */
 function randomBetween(min = 0, max = 1, integer = true){
	max += 1; // So the max is also included in the results
	return integer ?
		Math.floor(Math.random() * (max - min)) + min
		:
		Math.random() * (max - min) + min
	;
};

// 	Used to add a unique number to each class and ID given to the created elements, avoiding conflicts with the CSS.
let scriptUsage = 0;

/**
 * Script used to generate animated floating objects inside an HTML tag
 * @param {string} htmlTag - The animation's recipient. (ex: "#container", ".box", "section")
 * @param {string} imgPath - The image path name
 * @param {object} settings - Parameters changing the animation's behavior (optional)
 * @param {number} settings.amount - Number of items
 * @param {number} settings.minSize - Minimum size for each item
 * @param {number} settings.maxSize - Maximum size for each item
 * @param {number} settings.minDelay - Minimum speed for each item
 * @param {number} settings.maxDelay - Maximum speed for each item
 * @param {number} settings.filterOpacity - The added foreground filter's opacity
 * @param {boolean} settings.flipHorizontally - Flips each items' image horizontally
 * @param {boolean} settings.flipVertically - Flips each items' image vertically
 * @param {boolean} settings.topOffset - Offset applied to each item from the top of the container
 * @param {boolean} settings.rightOffset - Offset applied to each item from the right of the container
 * @param {boolean} settings.bottomOffset - Offset applied to each item from the bottom of the container
 * @param {boolean} settings.leftOffset - Offset applied to each item from the left of the container
 * @returns {undefined} - Doesn't return anything
 */
function addFloatingBackgroundObjects(htmlTag, imgPath, settings = {
	amount : 0,
	minSize : 8,
	maxSize : 48,
	minDelay : 40,
	maxDelay : 100,
	filterOpacity : 85,
	flipHorizontally : false,
	flipVertically : false,
	topOffset : 0,
	rightOffset : 0,
	bottomOffset : 0,
	leftOffset : 0,
}){
	// Défining default values
	if (!settings.amount) settings.amount = 0;
	if (!settings.minSize) settings.minSize = 8;
	if (!settings.maxSize) settings.maxSize = 48;
	if (!settings.minDelay) settings.minDelay = 40;
	if (!settings.maxDelay) settings.maxDelay = 100;
	if (!settings.filterOpacity) settings.filterOpacity = 85;
	if (!settings.flipHorizontally) settings.flipHorizontally = false;
	if (!settings.flipVertically) settings.flipVertically = false;
	if (!settings.topOffset) settings.topOffset = 0;
	if (!settings.rightOffset) settings.rightOffset = 0;
	if (!settings.bottomOffset) settings.bottomOffset = 0;
	if (!settings.leftOffset) settings.leftOffset = 0;

	const createBgAnimation = (section) => {
		section.style.position = "relative";
		settings.amount = settings.amount === 0 ? (section.offsetHeight / 100) + 2 : settings.amount;

		const sectionBg = window.getComputedStyle(section, null).getPropertyValue("background-image");
		if (sectionBg === "none"){
			sectionBg = window.getComputedStyle(section, null).getPropertyValue("background-color");
			if (sectionBg === "none") sectionBg = "rgba(0, 0, 0, 0)";
		};

		const discriminant = new Date().getTime();

		const animationContainer = document.createElement("div");
		animationContainer.classList.add(`animation-container-${discriminant}`);
		animationContainer.setAttribute("style", `
			position: absolute;
			pointer-events: none;
			top: ${settings.topOffset};
			bottom: ${settings.bottomOffset};
			left: ${settings.leftOffset};
			right: ${settings.rightOffset};
			overflow: hidden;
		`);

		// Définition des styles d'appliquant sur les objets à ajouter
		let containerContent = `
			<style>
				@keyframes objectStartsLeft-${discriminant} {
					0% {
						margin-left: 0;
						transform: translateX(-150%) scaleX(${settings.flipHorizontally ? 1 : -1}) scaleY(${settings.flipVertically ? -1 : 1});
					}
					1% {
						transform: translateX(-150%) scaleX(${settings.flipHorizontally ? -1 : 1}) scaleY(${settings.flipVertically ? -1 : 1});
					}
					50% {
						margin-left: 100%;
						transform: translateX(150%) scaleX(${settings.flipHorizontally ? -1 : 1}) scaleY(${settings.flipVertically ? -1 : 1});
					}
					51% {
						transform: translateX(150%) scaleX(${settings.flipHorizontally ? 1 : -1}) scaleY(${settings.flipVertically ? -1 : 1});
					}
					100% {
						margin-left: 0;
						transform: translateX(-150%) scaleX(${settings.flipHorizontally ? 1 : -1}) scaleY(${settings.flipVertically ? -1 : 1});
					}
				}
				
				@keyframes objectStartsRight-${discriminant} {
					0% {
						margin-left: 100%;
						transform: translateX(150%) scaleX(${settings.flipHorizontally ? -1 : 1}) scaleY(${settings.flipVertically ? -1 : 1});
					}
					1% {
						transform: translateX(150%) scaleX(${settings.flipHorizontally ? 1 : -1}) scaleY(${settings.flipVertically ? -1 : 1});
					}
					50% {
						margin-left: 0;
						transform: translateX(-150%) scaleX(${settings.flipHorizontally ? 1 : -1}) scaleY(${settings.flipVertically ? -1 : 1});
					}
					51% {
						transform: translateX(-150%) scaleX(${settings.flipHorizontally ? -1 : 1}) scaleY(${settings.flipVertically ? -1 : 1});
					}
					100% {
						margin-left: 100%;
						transform: translateX(150%) scaleX(${settings.flipHorizontally ? -1 : 1}) scaleY(${settings.flipVertically ? -1 : 1});
					}
				}
			</style>
		`;
		for (i = 0; i < settings.amount; i++){
			let marginTop = randomBetween(0, (section.offsetHeight - settings.maxSize));
			containerContent += `
				<img class="${imgPath}-${discriminant}" src="${imgPath}" style="
					position: absolute;
					height: ${randomBetween(settings.minSize, settings.maxSize)}px;
					margin-top: ${marginTop}px;
					animation:
						${randomBetween(0, 1) === 1 ? `objectStartsLeft-${discriminant}` : `objectStartsRight-${discriminant}`}
						${randomBetween(settings.minDelay, settings.maxDelay)}s linear infinite,
						objectMovement${i}-${discriminant} ${randomBetween(3, 5)}s ease-in-out infinite
					;
				"
				alt="${imgPath}">
				<style>
					@keyframes objectMovement${i}-${discriminant}{
						0%{
							margin-top: ${marginTop}px;
						}
						50%{
							margin-top: ${randomBetween(0, 1) === 1 ? (marginTop - randomBetween(5, 20)) : (marginTop + randomBetween(5, 20))}px;
						}
						100%{
							margin-top: ${marginTop}px;
						}
					}
				</style>
			`;
		};
		// On rajoute le filtre
		containerContent += `
			<div class="animation-filter-${discriminant}" style="
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				background: ${sectionBg};
				opacity: ${settings.filterOpacity}%;
			"></div>
		`;
		animationContainer.innerHTML = containerContent;
		section.prepend(animationContainer);

		// Replacement de tous les éléments contenus dans la section à l'avant du container de l'animation
		const sectionChildren = Array.from(section.children);
		// console.log(sectionChildren);

		// Incrémentation du z-index de tous les enfants de la section
		for(i = 0; i < sectionChildren.length; i++){
			// Si l'enfant actuel n'est pas le container de l'animation
			if (!sectionChildren[i].classList.contains(`animation-container-${discriminant}`)){
				// console.log(sectionChildren[i]);
				// Si le z-index n'est pas défini
				if(window.getComputedStyle(sectionChildren[i], null).getPropertyValue("z-index") === "auto"){
					sectionChildren[i].style.zIndex = 0;
				};
				// On incrémente le z-index
				sectionChildren[i].style.zIndex += 1;

				// Si la position de l'enfant est en static ou en relative, on la met en relative par défaut
				// Sinon, on la met telle qu'elle est initialement
				let position = window.getComputedStyle(sectionChildren[i], null).getPropertyValue("position");
				if (position == "static" || position == "relative"){
					sectionChildren[i].style.position = "relative";
				} else{
					sectionChildren[i].style.position = position;
				}
			};
		};
	};

	if (htmlTag.startsWith("#")) {
		const section = document.querySelector(htmlTag);
		if (section == null) throw new Error(`HTML element with id "${htmlTag}" does not exist`);

		createBgAnimation(section);
	} else{
		const type = htmlTag.startsWith(".") ? "class" : "tag";

		const sections = Array.from(document.querySelectorAll(htmlTag));
		if (sections == null || sections.length === 0) throw new Error(`${type} "${htmlTag}" does not exist`);

		sections.forEach(section => {
			createBgAnimation(section);
		});
	};
};