const counters = [2,2,2,2,2,2,2,2,2,2];
const sphereOrders = [[3,5,2,1,4,0],[0,1,2,3,4,5],[1,4,0,2,5,3],[5,4,1,2,0,3],[1,2,4,3,0,5],[2,5,4,1,0,3],[3,4,0,5,2,1]]
const currentSphereOrders = [0,1,2,3,4,5,6,0,1,2];

let canvas = document.getElementById("icon-jumble");
let svg = canvas.getElementsByTagName("path");
let icons = document.getElementsByClassName("icon");
let newImgContainer = document.getElementById("new-icons");

const iconSets = [];
const svgLengths = [];
const increments = [];
const hrefSet = ["https://www.facebook.com/jiri.swen", "", "", "https://nl.linkedin.com/in/jiriswen", "", ""];

// Constants to impact flow of spheres
const spaceBetweenSheres = 0.07;
const speed = 2;

// Preparatory work: lots of copies of the social media spheres are created and put in a 2D array for 
// the animation-action that's about to follow, and also an array of all the 
// lengths of the SVG curves and the corresponding amount to increment their counters with
for (let j = 0; j < svg.length; j++) {
	let newIconSet = []
	for (let i = 0; i < 6; i++) {
		newA = document.createElement("a");
		newA.href = hrefSet[i];
		newA.target = "_blank";
		newA.style.position = "absolute";
		newImg = document.createElement("img");
		newImg.src = icons[i].src;
		newImg.className = "moving-icon";
		newA.appendChild(newImg);
		newImgContainer.appendChild(newA);
		newIconSet.push(newA);
	}
	iconSets.push(newIconSet);
	svgLengths.push(svg[j].getTotalLength());
	increments.push(1 / svgLengths[j] * speed);
}

// Every set of 6 spheres has its own counter which increases more rapidly for shorter paths 
// (because it's the percentage of the total length), and within every set a delay is applied to make
// the spheres follow after one another and then also some "randomness" to make the whole thing feel more organic.
// Each set also cycles through a series of "orders of the spheres" for every time they start their animation.
function move() {
	for (let j = 0; j < iconSets.length; j++) {
		counters[j] += increments[j];
		if (counters[j] % 1 < (increments[j] + 0.00001)) {
			if (currentSphereOrders[j] !== 6) {
				currentSphereOrders[j]++;				
			}
			else {
				currentSphereOrders[j] = 0;
			}
		}
		let k = 0;
		sphereOrders[currentSphereOrders[j]].forEach(function(i) {
			let ownCounter = (counters[j] - spaceBetweenSheres * k - 0.1 * j - 0.5 * (j % 2)) % 1;
			iconSets[j][i].style.transform = "translate(" + (svg[j].getPointAtLength(ownCounter * svgLengths[j]).x -15) * 0.10 + "vw, " + (svg[j].getPointAtLength(ownCounter * svgLengths[j]).y -15) * 0.08 + "vh)";
			k++;
		});
	}
	requestAnimationFrame(move); // A function calling itself 60 times per second, yeah that's definitely a good idea
}
requestAnimationFrame(move);