function setPercent(container, percentage)
{   
    container.dataset.percentage = percentage
    let count = (percentage * 0.01 * container.dataset.containerSize)
    let i = 0
    for (child of container.childNodes)
    {
        i++
        if (i <= count) { setBox(child, "on") }
        if (i > count) { setBox(child, "off") }
    }
}

function addPercent(container, percentage)
{
    setPercent(container, percentage + parseInt(container.dataset.percentage))
}

function createContainer(containerSize, boxSize)
{
    let newContainer = document.createElement('div')
    newContainer.classList.add("interval-container")
    newContainer.style.display = "flex"

    newContainer.dataset.containerSize = containerSize
    newContainer.dataset.boxSize = boxSize
    newContainer.dataset.percentage = 0

    setContainerSize(newContainer)
    return newContainer
}

function setContainerSize(container)
{
    for (let i = 0; i < parseInt(container.dataset.containerSize); i++)
    {
        let newBox = createBox(parseInt(container.dataset.boxSize))
        container.appendChild(newBox)
    }
}

function deleteContainer(container)
{
    for (child of container.childNodes)
    {
        child.remove()
    }
}

function createBox(size)
{
    let newBox = document.createElement('div')
    newBox.style.width = size+"px"
    newBox.style.height = size+"px"
    newBox.classList.add("ib-off")
    return newBox
}

function setBox(box, toggle)
{   
    if (toggle === "off")
    {
        box.classList.remove("ib-on")
        box.classList.add("ib-off")
    } 
    else if (toggle === "on")
    {
        box.classList.add("ib-on")
        box.classList.remove("ib-off")
    }
}

// let newContainerSize = 10
// let newContainer = createContainer(newContainerSize, 20) // createContainer(# of divs, size of divs)
// setPercent(newContainer, 40)
// addPercent(newContainer, 10)
// addPercent(newContainer, 10)

// document.querySelector('body').appendChild(newContainer) // must append interval bar to element