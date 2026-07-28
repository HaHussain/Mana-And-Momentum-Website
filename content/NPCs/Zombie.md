# Overview

# Stat Block


| <center>Zombie</center>           | <                                                                                                                                                                                                                                           | <                  | <                  | <                     | <                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------ | --------------------- | ----------------- |
| [[Health Points\|Max HP]]         | <                                                                                                                                                                                                                                           | 10                 | <                  | [[Willpower\|Will]]   | -                 |
| [[AI]]: [[Robotic]]               | <                                                                                                                                                                                                                                           | <                  | Starting [[PP]]: 0 | <                     | <                 |
|                                   | [[Speed]]: 3                                                                                                                                                                                                                                | <                  | <                  | [[Seek]]: 1           | <                 |
|                                   | <                                                                                                                                                                                                                                           | <                  | <                  | <                     | <                 |
| [[Defence]]                       | <                                                                                                                                                                                                                                           | 6                  | [[Resolve]]        | <                     | 6                 |
| [[Deflection]]                    | <                                                                                                                                                                                                                                           | 0                  | [[Sturdy]]         | <                     | 0                 |
|                                   | <                                                                                                                                                                                                                                           | <                  | <                  | <                     | <                 |
| [[Strength\|STR]]                 | [[Dexterity\|DEX]]                                                                                                                                                                                                                          | [[Fortitude\|FOR]] | [[Awareness\|AWR]] | [[Intelligence\|INT]] | [[Instinct\|INS]] |
| +3                                | -2                                                                                                                                                                                                                                          | +4                 | 0                  | -4                    | -2                |
|                                   | <                                                                                                                                                                                                                                           | <                  | <                  | <                     | <                 |
| **Passive Abilities**             | <                                                                                                                                                                                                                                           | <                  | <                  | <                     | <                 |
|                                   | **Undying**<br>When this [[Rules/Characters/index\|Character]] would die from damage that isn't [[Elemental Type\|Light]] or a [[Critical Strike\|Crit]] and has more than 1 [[Health Points\|HP]], it survives on 1 [[Health Points\|HP]]. | <                  | <                  | <                     | <                 |
|                                   | **Necromantic Source**<br>When this [[Rules/Characters/index\|Character]] dies from damage that isn't [[Elemental Type\|Light]], gain 1 [[Power Point]].                                                                                    | <                  | <                  | <                     | <                 |
|                                   | <                                                                                                                                                                                                                                           | <                  | <                  | <                     | <                 |
| **Active Abilities**              | <                                                                                                                                                                                                                                           | <                  | <                  | <                     | <                 |
|                                   | ![[#Bite]]                                                                                                                                                                                                                                  | <                  | <                  | <                     | <                 |
|                                   | <                                                                                                                                                                                                                                           | <                  | <                  | <                     | <                 |
| **Action Sets**                   | <                                                                                                                                                                                                                                           | <                  | <                  | <                     | <                 |
| ![[#Attack]]                      | <                                                                                                                                                                                                                                           |                    | <                  |                       | <                 |
|                                   | <                                                                                                                                                                                                                                           | <                  | <                  | <                     | <                 |
| **Tags:** <tags>[[Undead]]</tags> | <                                                                                                                                                                                                                                           | <                  | <                  | <                     | <                 |


# Lore


# Quartz:Hidden

## Bite

| Bite                                                                                    | <                       |
| --------------------------------------------------------------------------------------- | ----------------------- |
| **Tempo:** [[Strike]]                                                                   | <                       |
| **[[Hit]]:** +4                                                                         | **[[Damage]]:** 1d4 + 3 |
| **Special:** [[Grappling]] counts if any [[Ally]] is [[Grappled\|Grappling]] the target | <                       |
| **Tags:** <tags>[[Natural]] [[Melee]] 1 [[Grappling]]</tags>                            | <                       |


## Action Sets
### Attack
```mermaid
flowchart TB
    A["**4: Move**<br/>Move to closest Character"]
    B["**5: Attack**<br/>Grapple<br>Bite - Called Shot"]
    A --> B
    click A "[[Move]]"
    click B "[[Attack]]"
    %% mermaid-flow:pos A=300,110 B=300,220
```

