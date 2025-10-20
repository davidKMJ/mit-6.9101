document.addEventListener("DOMContentLoaded", () => {
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";
    const tabLinks = document.querySelectorAll(".tab-link");

    tabLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (
            href === currentPage ||
            (currentPage === "index.html" && href === "timetable.html")
        ) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    const courses = document.querySelectorAll(".course");
    courses.forEach((course) => {
        course.addEventListener("click", (event) => {
            event.stopPropagation();
            showCourseDetails(course);
        });
    });

    const addCourseBtn = document.querySelector(".actions button:last-child");
    if (addCourseBtn) {
        addCourseBtn.addEventListener("click", () => {
            showAddCourseModal();
        });
    }

    const shareBtn = document.querySelector(".actions button:first-child");
    if (shareBtn && shareBtn.textContent === "Share") {
        shareBtn.addEventListener("click", () => {
            shareTimetable();
        });
    }

    const newPostBtn = document.querySelector(".actions button");
    if (newPostBtn && newPostBtn.textContent === "New Post") {
        newPostBtn.addEventListener("click", () => {
            showNewPostModal();
        });
    }

    const dayGrids = document.querySelectorAll(".day-grid");
    dayGrids.forEach((grid) => {
        grid.addEventListener("click", (event) => {
            if (event.target === grid) {
                const rect = grid.getBoundingClientRect();
                const clickY = event.clientY - rect.top;
                const percentage = (clickY / rect.height) * 100;
                const dayName =
                    grid.parentElement.querySelector(".day-header").textContent;
                showAddCourseModal(dayName, percentage);
            }
        });
    });
});

function showCourseDetails(course) {
    const courseName = course.textContent;
    const dayName = course
        .closest(".day-column")
        .querySelector(".day-header").textContent;

    const modal = document.createElement("div");
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement("div");
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 400px;
        width: 90%;
        text-align: center;
    `;

    modalContent.innerHTML = `
        <h3>Course Details</h3>
        <p><strong>Course:</strong> ${courseName}</p>
        <p><strong>Day:</strong> ${dayName}</p>
        <p><strong>Time:</strong> Based on position</p>
        <div style="margin-top: 1rem;">
            <button onclick="this.closest('.modal').remove()" style="
                background-color: #007bff;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
                margin-right: 0.5rem;
            ">Close</button>
            <button onclick="removeCourse('${courseName}', '${dayName}')" style="
                background-color: #dc3545;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
            ">Remove</button>
        </div>
    `;

    modal.className = "modal";
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function showAddCourseModal(dayName = null, timePercentage = null) {
    const modal = document.createElement("div");
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement("div");
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 400px;
        width: 90%;
    `;

    modalContent.innerHTML = `
        <h3>Add New Course</h3>
        <form id="addCourseForm">
            <div style="margin-bottom: 1rem;">
                <label for="courseName" style="display: block; margin-bottom: 0.5rem;">Course Name:</label>
                <input type="text" id="courseName" required style="
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-sizing: border-box;
                ">
            </div>
            <div style="margin-bottom: 1rem;">
                <label for="courseDay" style="display: block; margin-bottom: 0.5rem;">Day:</label>
                <select id="courseDay" required style="
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-sizing: border-box;
                ">
                    <option value="Monday" ${
                        dayName === "Monday" ? "selected" : ""
                    }>Monday</option>
                    <option value="Tuesday" ${
                        dayName === "Tuesday" ? "selected" : ""
                    }>Tuesday</option>
                    <option value="Wednesday" ${
                        dayName === "Wednesday" ? "selected" : ""
                    }>Wednesday</option>
                    <option value="Thursday" ${
                        dayName === "Thursday" ? "selected" : ""
                    }>Thursday</option>
                    <option value="Friday" ${
                        dayName === "Friday" ? "selected" : ""
                    }>Friday</option>
                    <option value="Saturday" ${
                        dayName === "Saturday" ? "selected" : ""
                    }>Saturday</option>
                    <option value="Sunday" ${
                        dayName === "Sunday" ? "selected" : ""
                    }>Sunday</option>
                </select>
            </div>
            <div style="margin-bottom: 1rem;">
                <label for="startTime" style="display: block; margin-bottom: 0.5rem;">Start Time:</label>
                <input type="time" id="startTime" required style="
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-sizing: border-box;
                ">
            </div>
            <div style="margin-bottom: 1rem;">
                <label for="endTime" style="display: block; margin-bottom: 0.5rem;">End Time:</label>
                <input type="time" id="endTime" required style="
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-sizing: border-box;
                ">
            </div>
            <div style="margin-bottom: 1rem;">
                <label for="courseColor" style="display: block; margin-bottom: 0.5rem;">Color:</label>
                <input type="color" id="courseColor" value="#007bff" style="
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-sizing: border-box;
                ">
            </div>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                <button type="button" onclick="this.closest('.modal').remove()" style="
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                ">Cancel</button>
                <button type="submit" style="
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                ">Add Course</button>
            </div>
        </form>
    `;

    modal.className = "modal";
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    const form = modalContent.querySelector("#addCourseForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const courseData = {
            name: document.getElementById("courseName").value,
            day: document.getElementById("courseDay").value,
            startTime: document.getElementById("startTime").value,
            endTime: document.getElementById("endTime").value,
            color: document.getElementById("courseColor").value,
        };
        addCourse(courseData);
        modal.remove();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function addCourse(courseData) {
    const dayColumn = Array.from(document.querySelectorAll(".day-column")).find(
        (col) => col.querySelector(".day-header").textContent === courseData.day
    );

    if (!dayColumn) return;

    const dayGrid = dayColumn.querySelector(".day-grid");
    const course = document.createElement("div");
    course.className = "course";
    course.textContent = courseData.name;
    course.style.backgroundColor = courseData.color;

    const startTime = courseData.startTime;
    const endTime = courseData.endTime;
    const startHour = parseInt(startTime.split(":")[0]);
    const startMinute = parseInt(startTime.split(":")[1]);
    const endHour = parseInt(endTime.split(":")[0]);
    const endMinute = parseInt(endTime.split(":")[1]);

    const startPercentage =
        (((startHour - 9) * 60 + startMinute) / (8 * 60)) * 100;
    const durationPercentage =
        (((endHour - startHour) * 60 + (endMinute - startMinute)) / (8 * 60)) *
        100;

    course.style.top = `${Math.max(0, startPercentage)}%`;
    course.style.height = `${Math.min(100, durationPercentage)}%`;

    course.addEventListener("click", (event) => {
        event.stopPropagation();
        showCourseDetails(course);
    });

    dayGrid.appendChild(course);
}

function removeCourse(courseName, dayName) {
    const dayColumn = Array.from(document.querySelectorAll(".day-column")).find(
        (col) => col.querySelector(".day-header").textContent === dayName
    );

    if (dayColumn) {
        const course = Array.from(dayColumn.querySelectorAll(".course")).find(
            (c) => c.textContent === courseName
        );

        if (course) {
            course.remove();
        }
    }

    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.remove());
}

function shareTimetable() {
    if (navigator.share) {
        navigator.share({
            title: "My MIT Timetable",
            text: "Check out my course schedule!",
            url: window.location.href,
        });
    } else {
        const shareText = "Check out my MIT timetable!";
        navigator.clipboard
            .writeText(shareText)
            .then(() => {
                alert("Timetable link copied to clipboard!");
            })
            .catch(() => {
                alert("Share: " + shareText);
            });
    }
}

function showNewPostModal() {
    const modal = document.createElement("div");
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement("div");
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
    `;

    modalContent.innerHTML = `
        <h3>Create New Post</h3>
        <form id="newPostForm">
            <div style="margin-bottom: 1rem;">
                <label for="postContent" style="display: block; margin-bottom: 0.5rem;">What's on your mind?</label>
                <textarea id="postContent" required style="
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-sizing: border-box;
                    min-height: 100px;
                    resize: vertical;
                " placeholder="Share something with the MIT community..."></textarea>
            </div>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                <button type="button" onclick="this.closest('.modal').remove()" style="
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                ">Cancel</button>
                <button type="submit" style="
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                ">Post</button>
            </div>
        </form>
    `;

    modal.className = "modal";
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    const form = modalContent.querySelector("#newPostForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const postContent = document.getElementById("postContent").value;
        addNewPost(postContent);
        modal.remove();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function addNewPost(content) {
    const thread = document.querySelector(".thread");
    if (!thread) return;

    const post = document.createElement("div");
    post.className = "post";

    const randomHandle = "user" + Math.random().toString(36).substr(2, 6);

    post.innerHTML = `
        <p class="handle">${randomHandle}</p>
        <p>${content}</p>
        <button class="report">Report</button>
    `;
    
    thread.insertBefore(post, thread.firstChild);

    alert("Post created successfully!");
}
