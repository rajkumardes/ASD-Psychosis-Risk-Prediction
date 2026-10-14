const form = document.getElementById("assessmentForm");

if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const resultBox = document.getElementById("resultBox");
        const submitButton = form.querySelector("button[type='submit']");

        submitButton.disabled = true;
        submitButton.textContent = "Analyzing...";

        const data = {
            age: Number(document.getElementById("age").value),

            language_score: Number(
                document.getElementById("language_score").value
            ),

            social_score: Number(
                document.getElementById("social_score").value
            ),

            repetitive_behavior: Number(
                document.getElementById("repetitive_behavior").value
            ),

            cognitive_score: Number(
                document.getElementById("cognitive_score").value
            ),

            anxiety_level: Number(
                document.getElementById("anxiety_level").value
            ),

            emotional_regulation: Number(
                document.getElementById("emotional_regulation").value
            ),

            sleep_quality: Number(
                document.getElementById("sleep_quality").value
            ),

            paranoia_traits: Number(
                document.getElementById("paranoia_traits").value
            ),

            perceptual_abnormalities: Number(
                document.getElementById("perceptual_abnormalities").value
            ),

            gender: Number(
                document.getElementById("gender").value
            ),

            speech_delay: Number(
                document.getElementById("speech_delay").value
            ),

            attention_deficit: Number(
                document.getElementById("attention_deficit").value
            ),

            family_history_asd: Number(
                document.getElementById("family_history_asd").value
            ),

            family_history_psychosis: Number(
                document.getElementById("family_history_psychosis").value
            ),

            developmental_delay: Number(
                document.getElementById("developmental_delay").value
            ),

            functional_decline: Number(
                document.getElementById("functional_decline").value
            )
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/predict",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.detail || "Prediction failed"
                );
            }

            resultBox.style.display = "block";

            resultBox.innerHTML = `
                <h2>Prediction Result</h2>

                <p>
                    <strong>Predicted Class:</strong>
                    Class ${result.risk_class}
                </p>

                <h3>Model Probabilities</h3>

                <p>
                    Class 0:
                    ${(result.probabilities.class_0 * 100).toFixed(2)}%
                </p>

                <p>
                    Class 1:
                    ${(result.probabilities.class_1 * 100).toFixed(2)}%
                </p>

                <p>
                    Class 2:
                    ${(result.probabilities.class_2 * 100).toFixed(2)}%
                </p>

                <small>
                    This is a research prototype prediction and
                    is not a clinical diagnosis.
                </small>
            `;

        } catch (error) {

            console.error(error);

            resultBox.style.display = "block";

            resultBox.innerHTML = `
                <h2>Connection Error</h2>
                <p>
                    Unable to connect to the prediction server.
                </p>
                <p>
                    Make sure FastAPI is running on
                    <strong>127.0.0.1:8000</strong>.
                </p>
            `;

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Predict Risk";
        }
    });
}