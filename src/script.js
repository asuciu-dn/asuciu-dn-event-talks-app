// Data structure for the event schedule
const eventSchedule = [
    {
        id: "talk-1",
        title: "Introduction to Generative AI",
        speakers: ["Dr. AI", "Dr. ML"],
        category: ["AI", "Machine Learning"],
        duration: 60,
        description: "A comprehensive overview of the latest advancements in generative AI, covering models like GPT, GANs, and VAEs. We will discuss their applications, ethical considerations, and future trends in the field.",
    },
    {
        id: "transition-1",
        type: "transition",
        duration: 10,
        title: "Transition",
    },
    {
        id: "talk-2",
        title: "Building Scalable Microservices with Node.js",
        speakers: ["Ms. Node"],
        category: ["Backend", "Node.js", "Architecture"],
        duration: 60,
        description: "Learn how to design and implement robust and scalable microservices using Node.js, Express, and modern database solutions. Topics include API design, authentication, and deployment strategies.",
    },
    {
        id: "transition-2",
        type: "transition",
        duration: 10,
        title: "Transition",
    },
    {
        id: "talk-3",
        title: "Frontend Frameworks: React vs. Vue",
        speakers: ["Mr. React", "Ms. Vue"],
        category: ["Frontend", "JavaScript"],
        duration: 60,
        description: "A deep dive into the pros and cons of React and Vue for modern web development. We will compare their ecosystems, performance, learning curves, and community support.",
    },
    {
        id: "lunch-break",
        type: "lunch",
        duration: 60,
        title: "Lunch Break",
    },
    {
        id: "talk-4",
        title: "Data Visualization with D3.js",
        speakers: ["Dr. Vis"],
        category: ["Data Science", "Frontend"],
        duration: 60,
        description: "Master the art of creating interactive data visualizations with D3.js. This talk will cover basic concepts, common chart types, and advanced techniques for storytelling with data.",
    },
    {
        id: "transition-3",
        type: "transition",
        duration: 10,
        title: "Transition",
    },
    {
        id: "talk-5",
        title: "Cloud Native Development on GCP",
        speakers: ["Mr. Cloud"],
        category: ["Cloud", "DevOps", "GCP"],
        duration: 60,
        description: "Best practices for building and deploying cloud-native applications on Google Cloud Platform. We will explore services like Cloud Run, Kubernetes Engine, and Cloud Functions.",
    },
    {
        id: "transition-4",
        type: "transition",
        duration: 10,
        title: "Transition",
    },
    {
        id: "talk-6",
        title: "Ethical AI: Challenges and Solutions",
        speakers: ["Prof. Ethics"],
        category: ["AI", "Ethics", "Social Impact"],
        duration: 60,
        description: "Exploring the ethical implications of AI technologies and strategies for responsible development. We will discuss bias, fairness, transparency, and accountability in AI systems.",
    },
];

// Function to format time
function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// Function to render the schedule
function renderSchedule(filterCategory = '') {
    const scheduleContainer = document.getElementById('schedule-container');
    scheduleContainer.innerHTML = ''; // Clear previous schedule

    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

    eventSchedule.forEach(item => {
        const itemEndTime = new Date(currentTime.getTime() + item.duration * 60 * 1000);

        if (item.type === "transition" || item.type === "lunch") {
            const breakElement = document.createElement('div');
            breakElement.classList.add('schedule-item', 'break');
            breakElement.innerHTML = `
                <div class="time">${formatTime(currentTime)} - ${formatTime(itemEndTime)}</div>
                <h3>${item.title}</h3>
            `;
            scheduleContainer.appendChild(breakElement);
        } else {
            // It's a talk
            const talk = item;
            const matchesFilter = filterCategory === '' ||
                                  talk.category.some(cat => cat.toLowerCase().includes(filterCategory.toLowerCase()));

            if (matchesFilter) {
                const talkElement = document.createElement('div');
                talkElement.classList.add('schedule-item');
                talkElement.setAttribute('data-id', talk.id);
                talkElement.innerHTML = `
                    <div class="time">${formatTime(currentTime)} - ${formatTime(itemEndTime)}</div>
                    <h3>${talk.title}</h3>
                    <div class="speakers"><strong>Speakers:</strong> ${talk.speakers.join(', ')}</div>
                    <div class="categories">
                        ${talk.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                    <div class="description">${talk.description}</div>
                `;
                talkElement.addEventListener('click', () => {
                    talkElement.classList.toggle('expanded');
                });
                scheduleContainer.appendChild(talkElement);
            }
        }
        currentTime = itemEndTime; // Update current time for the next item
    });
}

// Event listener for category search
document.addEventListener('DOMContentLoaded', () => {
    renderSchedule(); // Initial render
    const categorySearchInput = document.getElementById('category-search');
    categorySearchInput.addEventListener('input', (event) => {
        renderSchedule(event.target.value);
    });
});
