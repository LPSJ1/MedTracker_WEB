// script.js

let medications = []; // In-memory storage

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const modal = document.getElementById("add-modal");
    const addBtn = document.getElementById("add-medication-btn");
    const closeBtn = document.getElementById("close-modal");
    const form = document.getElementById("medication-form");

    function attachTabListeners() {
        const tabButtons = document.querySelectorAll(".tab-button, .tab-link");

        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                tabButtons.forEach(btn => {
                    btn.classList.remove("tab-button");
                    btn.classList.add("tab-link");
                });
                button.classList.remove("tab-link");
                button.classList.add("tab-button");
                const tabText = button.textContent.trim();
                updateTabContent(tabText);
            });
        });
    }

    function getStatusClass(med) {
        if (med.isTaken) return "taken";

        const now = new Date();
        const [hour, minute] = med.time.split(":" ).map(Number);
        const medDate = new Date(now);
        medDate.setHours(hour, minute, 0, 0);

        const fiveMinutesBefore = new Date(medDate.getTime() - 5 * 60 * 1000);
        const fiveMinutesAfter = new Date(medDate.getTime() + 5 * 60 * 1000);

        if (now < fiveMinutesBefore) return "upcoming";
        if (now >= fiveMinutesBefore && now <= fiveMinutesAfter) return "taken";
        return "missed";
    }

    function updateTabContent(tab) {
        const content = document.getElementById("content");

        switch (tab) {
            case "Today's Schedule":
                content.innerHTML = `
          <h3>Today's Medications</h3>
          <div class="medications">
            ${medications.map((med, index) => {
                    const status = getStatusClass(med);
                    const label = status === "missed" ? "Missed" : status === "taken" ? "Taken" : "Upcoming";
                    return `
                <div class="med-card">
                  <h3>${med.name}</h3>
                  <p>${med.dosage} · ${med.time}</p>
                  <p>${med.instructions}</p>
                  <span class="${status}">${label}</span>
                  ${!med.isTaken && status !== "missed" ? `<button class="mark-taken-btn" data-id="${index}">Mark as Taken</button>` : ""}
                </div>
              `;
                }).join('') || '<p>No medications yet.</p>'}
          </div>
          
        `;
                break;

            case "History":
                content.innerHTML = `
          <h3>Medication History</h3>
          <div class="history-entry">
            ${medications.map(m => {
                    const status = getStatusClass(m);
                    const label = status === "missed" ? "✗ Missed" : status === "taken" ? "✓ Taken" : "⏳ Upcoming";
                    return `
                <div class="entry">
                  <div class="left">
                    <strong>${m.name}</strong>
                    <p>Dosage: ${m.dosage}</p>
                    <p>Frequency: ${m.frequency}</p>
                    <p>Time: ${m.time}</p>
                    <p>Note: ${m.instructions}</p>
                  </div>
                  <div class="status ${status}">${label}</div>
                </div>
              `;
                }).join('') || '<p>No medications logged.</p>'}
          </div>
        `;
                break;
        }
        attachTabListeners();
        attachMarkTakenListeners();
    }

    function attachMarkTakenListeners() {
        const markButtons = document.querySelectorAll(".mark-taken-btn");
        markButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                medications[id].isTaken = true;
                updateTabContent("Today's Schedule");
            });
        });
    }

    attachTabListeners();
    updateTabContent("Today's Schedule");

    // Modal events
    if (addBtn) {
        addBtn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Handle form submission
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = form.querySelector("#med-name").value;
            const dosage = form.querySelector("#dosage").value;
            const frequency = form.querySelector("#frequency").value;
            const time = form.querySelector("#time").value;
            const instructions = form.querySelector("#instructions").value;

            medications.push({ name, dosage, frequency, time, instructions, isTaken: false });
            modal.style.display = "none";
            form.reset();
            updateTabContent("Today's Schedule");
        });
    }
});

