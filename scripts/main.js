
const enemyContanier = document.getElementsByClassName("enemy-container")[0]
let enemyDying = false

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
    child.classList.toggle("death")
    entity.classList.toggle("death")

    let start = Date.now();
    enemyDying = true
    let timer = setInterval(function(){
        child.src = "images/enemy-dead.png"
        let timePassed = Date.now() - start
        if (timePassed >= 500) {
            clearInterval(timer)
            enemyDying = false
            child.remove()
            entity.remove()
            return
        }
    })
}

function damageEntity(entity, damage)
{
    console.log(enemyDying)
    if (enemyDying === false)
    {
        for (child of entity.childNodes)
            {
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
            } else {
                child.src = "images/enemy-damaged.png"
                let length = 300
                let start = Date.now();
                let damaged = setInterval(function(){
                    let timePassed = Date.now() - start
                    if (timePassed >= length) {
                        clearInterval(damaged)
                        child.src = "images/enemy.png"
                        return
                    }
                })
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
    let newEnemy = createEntity(50,0)
    enemyContanier.appendChild(newEnemy)
}