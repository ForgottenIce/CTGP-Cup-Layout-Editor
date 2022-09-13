function trackTableDragStart() {
    for (let input of cupInputs) {
        if (!input.disabled) {
            input.classList.add("input-highlighted");
        }
    }
}

function trackTableDragEnd() {
    for (let input of cupInputs) {
        input.classList.remove("input-highlighted");
    }
}

function inputDragOver(dragEvent) {
    if (!dragEvent.target.disabled) {
        dragEvent.preventDefault();
        dragEvent.target.classList.add("input-dragover");
    }
}

function inputDragLeave(dragEvent) {
    dragEvent.target.classList.remove("input-dragover");
}

function inputDragDrop(dragEvent) {
    if (!dragEvent.target.disabled) {
        dragEvent.preventDefault();
        dragEvent.target.classList.remove("input-dragover");
    }
}