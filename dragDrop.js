function trackTableDragStart(dragEvent) {
    dragEvent.dataTransfer.setData("text", dragEvent.target.dataset.trackid);
    for (let input of cupInputs) {
        if (!input.disabled) {
            input.classList.add("input-highlighted");
        }
    }
}

function trackTableDragEnd(dragEvent) {
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
        const trackId = parseInt(dragEvent.dataTransfer.getData("text"));
        updateTrackFromCupInput(dragEvent.target, trackId);

        dragEvent.target.classList.remove("input-dragover");
    }
}