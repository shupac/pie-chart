const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

// Define the colors and labels for each section
const sections = [
    { color: "#FF75A5", label: "Race" },
    { color: "#0FD78D", label: "Gender" },
    { color: "#FE9452", label: "Class" },
    { color: "#DFFA33", label: "Other" },
    { color: "#570F29", label: "Region" },
    { color: "#828fa7", label: "Ability" },
    { color: "#6C1178", label: "Religion" },
    { color: "#127DBF", label: "Sexual Orientation" },
    { color: "#2FF415", label: "Age" },
    { color: "#24129B", label: "Education" },
];

// Calculate the angle for each section
const angle = (Math.PI * 2) / sections.length;

// Set the radius and center coordinates
const radius = Math.min(canvas.width, canvas.height) * 0.4 - 40;
const outerRadius = radius + 40; // Outer 20px
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Store the selected section
let selectedSection = null;

// Function to draw the wheel
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < sections.length; i++) {
        const startAngle = i * angle;
        const endAngle = startAngle + angle;

        // Draw the section
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = sections[i].color;
        ctx.fill();

        // Draw the inner border
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.closePath();
        ctx.lineWidth = 4; // Adjust the border width as needed
        ctx.stroke();

        // Calculate label position along the circumference
        const labelAngle = startAngle + angle / 2;
        const labelRadius = outerRadius + 40; // Adjust label distance from the circumference

        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;

        // Draw the label
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(sections[i].label, labelX, labelY);
    }

    // Draw the white circle in the middle with a black border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 4; // Adjust the border width as needed
    ctx.strokeStyle = "black"; // Border color
    ctx.stroke();

    drawBorder();
}

function drawBorder() {
    for (let i = 0; i < sections.length; i++) {
        const startAngle = i * angle;
        const endAngle = startAngle + angle;

        // Draw the inner border
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.closePath();
        ctx.lineWidth = 4; // Adjust the border width as needed
        ctx.stroke();
    }
}

window.onload = function () {
    // Event listener to fill a section when clicked
    canvas.addEventListener("click", (e) => {
        const x = e.clientX - canvas.getBoundingClientRect().left - centerX;
        const y = e.clientY - canvas.getBoundingClientRect().top - centerY;

        // Calculate the distance from the center
        const distance = Math.sqrt(x ** 2 + y ** 2);

        // Check if the click is within the outer 20px
        if (distance <= radius) {
            // Calculate the angle from the center of the wheel to the click point
            const clickAngle = Math.atan2(y, x);

            // Determine which section was clicked
            let clickedSection = Math.floor(clickAngle / angle);
            if (clickedSection < 0) clickedSection += sections.length;

            // Unfill the previously selected section
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(
                centerX,
                centerY,
                radius - 5,
                clickedSection * angle,
                (clickedSection + 1) * angle,
            );
            ctx.closePath();
            ctx.fillStyle = "white";
            ctx.fill();

            // Fill the clicked section with its color
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(
                centerX,
                centerY,
                distance,
                clickedSection * angle,
                (clickedSection + 1) * angle,
            );
            ctx.closePath();
            ctx.fillStyle = sections[clickedSection].color;
            ctx.fill();

            // Store the selected section
            selectedSection = clickedSection;
        }

        drawBorder();
    });

    // Initial drawing of the wheel
    drawWheel();
};
