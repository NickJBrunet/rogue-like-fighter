
const enemyContanier = document.getElementsByClassName("enemy-container")[0]


function createEntity(size, health)
{
    let newEntity = document.createElement('div')
    newEntity.classList.add("entity")

    let newHealthBar = createContainer(10, 10)
    newHealthBar.classList.add("entity-healthBar")
    setPercent(newHealthBar, 100)
    newEntity.appendChild(newHealthBar)

    let newEntitySprite = getEntitySprite(size)
    newEntitySprite.classList.add("entity-sprite")
    newEntity.appendChild(newEntitySprite)

    newEntity.onclick = () => {
        if (newHealthBar.dataset.percentage > 0) { damageEntity(newEntity, 1)}}
    return newEntity
}

function killEntity(entity)
{
    // entity.animate(deathTransform, deathTiming)

    child = entity.childNodes[0]

    let length = 500
    let start = Date.now();
    let timer = setInterval(function(){
        child.src = "images/enemy-dead.png"
        let timePassed = Date.now() - start
        width = (100 - ((timePassed/length) * 100))
        if (width > 0) {
            child.style.width = width + "%"
            entity.style.width = (width/4) + "%"
        } else {
            clearInterval(timer)
            entity.remove()
            return}
    }, 20)
}

function damageEntity(entity, damage)
{
    for (child of entity.childNodes)
    {

        child.src = "images/enemy-damaged.png"
        let length = 250
        let start = Date.now();
        let timer = setInterval(function(){
            let timePassed = Date.now() - start
            if (timePassed >= length) {
                clearInterval(timer) // finish the animation after 2 seconds
                child.src = "images/enemy.png"
                return
            }
        })

        if (child.classList.contains("entity-healthBar"))
        {
            damageTotal = damage * 10
            if (child.dataset.percentage - damageTotal > 0)
            {
                addPercent(child, -damageTotal)  
            } 
            else 
            {
                child.remove()
                killEntity(entity)
            }
        }
    }
}

function getEntitySprite(size)
{
    let newEntitySprite = document.createElement('img')
    newEntitySprite.src = "images/enemy.png"
    newEntitySprite.alt = "enemy sprite"
    newEntitySprite.classList.add("entity-sprite")
    return newEntitySprite
    
}

for (let i = 0; i < 20; i++)
{
    let newEnemy = createEntity(100,0)
    enemyContanier.appendChild(newEnemy)
}