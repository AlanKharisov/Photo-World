async function uploadFile() {
    const fileInput = document.getElementById("file-input");
    if (!fileInput.files.length) {
        alert("Выберите файл для загрузки!");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:3000/upload", { // ← поменял URL
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        alert("Файл загружен! Имя файла: " + result.filename);
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Ошибка загрузки файла.");
    }
}
