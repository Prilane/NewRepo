document.addEventListener("DOMContentLoaded", () => {
    // smooth scroll for nav links
   // const links = document.querySelectorAll("nav a");
    // links.forEach(link => {
    //     link.addEventListener("click", e => {
    //         e.preventDefault();
    //         const targetId = link.getAttribute("href").substring(2);
    //         const section = document.getElementById(targetId);
    //         if (section) section.scrollIntoView({ behavior: "smooth" });
    //     });
    // });
    const sections = document.querySelectorAll("section.glass");

const revealOnScroll = () => {
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            section.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Initial check on page load


    //contact form submission
    const form = document.getElementById("form");
    if (form){
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const name = formData.get("name").trim();
            const email = formData.get("email").trim();
            const message = formData.get("message").trim();

            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }

            const overlay = document.getElementById("formOverlay");
            const spinner = document.getElementById("spinner");

            if (overlay) overlay.style.display = "flex";
            if (spinner) spinner.style.display = "block";

            try {
                const res = await fetch("/contact", {
                    method: "POST",
                    headers: {"content-type": "application/x-www-form-urlencoded"},
                    body: new URLSearchParams(formData),
                });

                const html = await res.text();

                let messageBox = document.getElementById("messageBox");
                if (!messageBox) {
                    messageBox = document.createElement("div");
                    messageBox.id = "messageBox";
                    messageBox.style.marginTop = "20px";
                    form.parentNode.appendChild(messageBox);
                }
                window.location.href = "/thankyou.html";

                form.reset();
            } catch(err){
                alert("Something went wrong. Please try again later.");
            } finally{
                if (overlay) overlay.style.display = "none";
                if (spinner) spinner.style.display = "none";
            }
        });
    }
});
// const submitBtn = getElementById("submitBtn")
// submitBtn.addEventListener("click", () =>{
//     const form = getElementById("form")
//     if (name && email && message){
//         alert("Fill all the fields correctly!")
//     }
//     const popup = document.getElementById("spinner");
//     popup.style.display = "flex"
// })
