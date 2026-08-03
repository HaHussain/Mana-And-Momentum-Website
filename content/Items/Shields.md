---
icon: GiBorderedShield
aliases:
  - Shield
---

| Item Name                                                                                                                                                                            | Effect                                           | Weight Penalty |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | -------------- |
|                                                                                                                                                                                      | <                                                | <              |
| **[[#Buckler]]**                                                                                                                                                                     | [[Templates/Reaction\|Reaction]]: +2 [[Defence]] | <              |
| **1:** Disarm<br>**2:** Riposte                                                                                                                                                      | <                                                | <              |
| <tags>[[One-Handed]]</tags>                                                                                                                                                          | <                                                |                |
|                                                                                                                                                                                      | <                                                | <              |
| **[[#Heater Shield]]**                                                                                                                                                               | +1 [[Defence]]                                   |                |
| **1:** +1 [[Sturdy]]<br>**2:** +1 [[Deflection]]                                                                                                                                     | <                                                | <              |
| <tags>[[One-Handed]]</tags>                                                                                                                                                          | <                                                |                |
|                                                                                                                                                                                      | <                                                | <              |
| **[[#Kite Shield]]**                                                                                                                                                                 | +1 [[Deflection]]                                |                |
| **1:** Effect section also effects your mount<br>**2:** Mount cant take damage                                                                                                       | <                                                | <              |
| <tags>[[One-Handed]]</tags>                                                                                                                                                          | <                                                |                |
|                                                                                                                                                                                      | <                                                | <              |
| **[[#Hoplon Shield]]**                                                                                                                                                               | +2 [[Defence]]                                   | [[Orthogonal]] |
| **1:** Doubled effect against [[Rules/Actions/Tags/Reaction\|Reactions]]<br>**2:** [[Extra]]: [[Guard]] for 1 [[Momentum]]                                                           | <                                                | <              |
| <tags>[[Strength\|STR]] < 2: [[Two-Handed]]<br>[[Strength\|STR]] > 1: [[One-Handed]]<tags>                                                                                           | <                                                |                |
|                                                                                                                                                                                      | <                                                | <              |
| **[[#Tower Shield]]**                                                                                                                                                                | +2 [[Defence]]<br>+1 [[Deflection]]              | -1 [[Speed]]   |
| **1:** Block AOEs for people behind you<br>**2:** Plant tower shield, increase [[Sturdy]]                                                                                            | <                                                |                |
| <tags>[[Strength\|STR]] < 3: [[Two-Handed]]<br>[[Strength\|STR]] > 2: [[One-Handed]]</tags>                                                                                          | <                                                | <              |
|                                                                                                                                                                                      | <                                                | <              |
| **[[#Wardstone]]**                                                                                                                                                                   | +2 [[Willpower]]<br>+1 [[Resolve]]               | -1 [[Speed]]   |
| **1:** [[Rules/Actions/Tags/Reaction\|Reaction]]: Gain [[Deflection]] equal to [[Resolve]]<br>**2:** [[Rules/Actions/Tags/Reaction\|Reaction]] Gain [[Defence]] equal to [[Resolve]] | <                                                | <              |
| <tags>[[One-Handed]] [[Conduit]]</tags>                                                                                                                                              | <                                                | <              |
# Buckler
**Effect:** You gain the following Shield Block reaction.
**Focus 1:** 
When you use the Shield Block reaction and the attack is a [[Miss]], 
if the attacker is in [[Range]] 1, they are disarmed of their weapon, it falls to the ground.
**Focus 2:** 
When you use the Shield Block reaction and the attack is a [[Miss]], 
if the attacker is in [[Melee|Melee Range]], make a [[Strike]] against the attacker as part of the Shield Block reaction.
**Tags:** [[One-Handed]]

|              | Shield Block                                                                  |
| ------------ | ----------------------------------------------------------------------------- |
| **Tempo:**   | 5                                                                             |
| **Trigger:** | You are [[Hit]]                                                               |
| **Action:**  | Gain +2 [[Defence]] for that [[Hit]], potentially turning it into a [[Miss]]. |
| **Tags:**    | [[Rules/Actions/Tags/Reaction\|Reaction]]                                     |
# Heater Shield
**Effect:** +1 [[Defence]]
**Focus 1:** Gain +1 [[Sturdy]].
**Focus 2:** Gain +1 [[Deflection]].
**Tags:** [[One-Handed]]

# Kite Shield
**Effect:** +1 [[Deflection]]
**Focus 1:** You may take the [[Extra]]: [[Guard]] action targeting a [[Rules/Characters/index|Character]] you are mounted on.
**Focus 2:** When you [[Guard]], you may take the [[Guard#Intercept|Intercept]] reaction any number of times per round.
**Tags:** [[One-Handed]]

# Hoplon Shield
**Effect:** +2 [[Defence]]
**Weight Penalty:** [[Orthogonal]]
**Focus 1:** Double this shield's effect against [[Rules/Actions/Tags/Reaction|Reactions]].
**Focus 2:** You may spend 1 [[Momentum]] to take the [[Extra]]: [[Guard]] action.
**Tags:** [[One-Handed]]

# Tower Shield
**Effect:** +2 [[Defence]], +1 [[Deflection]]
**Weight Penalty:** -1 [[Speed]]
**Focus 1:** Enemy [[Rules/Characters/index|Characters]] cannot draw [[Line of Sight]] past your square.
**Focus 2:** 
When you are included in a non-[[Arcing]] AoE ability, you can choose to take max damage from the ability. If you do, draw a line between you and the source, all targets behind you take no damage from the ability.
**Tags:** [[One-Handed]]

# Wardstone
**Effect:** +2 [[Defence]], +1 [[Deflection]]
**Weight Penalty:** -1 [[Speed]]
**Focus 1:** Gain the [[#Mage Ward]] [[Rules/Actions/Tags/Reaction|Reaction]]:
**Focus 2:** Gain the [[#Arcane Shield]] [[Rules/Actions/Tags/Reaction|Reaction]]
**Tags:** [[One-Handed]] [[Conduit]]

## Mage Ward

| Mage Ward    | <                                                              | <              |
| ------------ | -------------------------------------------------------------- | -------------- |
| **Tempo:**   | 4                                                              | Before Trigger |
| **Trigger:** | You take [[Damage]]                                            | <              |
| **Action:**  | Gain [[Deflection]] equal to your [[Willpower]] for this turn. | <              |
| **Tags:**    | [[Rules/Actions/Tags/Reaction\|Reaction]]                      | <              |
## Arcane Shield

| Arcane Shield | <                                                           | <              |
| ------------- | ----------------------------------------------------------- | -------------- |
| **Tempo:**    | 4                                                           | Before Trigger |
| **Trigger:**  | You are [[Hit]]                                             | <              |
| **Action:**   | Gain [[Defence]] equal to your [[Willpower]] for this turn. | <              |
| **Tags:**     | [[Rules/Actions/Tags/Reaction\|Reaction]]                   | <              |
