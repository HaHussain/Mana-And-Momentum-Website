---
icon: RiGroupLine
aliases:
  - Faction
---
A faction represents a collection of people and not necessarily an organised one.
There are multiple types of factions that represent how they act, a faction can be more than one type if they are influential in more than one sphere.

Some example types include: Criminal, Economic, Folk, Information, Magical, Military.

Each faction has the following traits and represents their capabilities. Each trait can have a value from 0 to 5.

[[#Size]]: This represents the number of people within the faction.
[[#Might]]: Physical power. Magical and Military Factions often have high values.
[[#Influence]]: Social power. Information and some Criminal factions often have high values.
[[#Assets]]: Economic power. Economic Factions have high values.
[[#Secrets]]: Informational power. Information and Magical factions often have high values.

A faction grows by increasing these values and a faction can be destroyed by either 
- Reducing its [[#Size]] to 0.
- Cause a faction to [[#Tier Down]] to Tier 0.
- When it fails on a disband roll.


# Leader

Leaders are notable and major figures in a faction that lead parts of that faction, most Leaders will have some abilities that either strengthen a Faction's Traits or give it some unique abilities.

When a Leader leaves a faction, the faction must make a disband roll to survive the schism.

# Folk

Folk are a specific type of Faction, they have no Goal and represent the average civilians of a region.
The Leader of a Folk is not necessarily its Government as depending on the authoritarian nature of the governing system, it may be difficult to command a Folk to do anything.
Folk without a [[#Leader]] are not destroyed but cannot take [[Faction Actions]]

# Traits


## Tier

Tier represents the scale that a faction works at, factions dealing with factions higher tier than they are is a challenging ordeal factions dealing with factions of a lower tier is an easy task.
For each Tier above 1 a Faction has, it may have +1 additional [[#Leader]].

Tier 0: This represents a faction that is just starting in its local area, and has no power.
Tier 1: This is a faction that is able to work in its local area, whether that is a village, district of a city, or a section of wilderness.
Tier 2: This is a faction that works in a small city or controls several hexes of wilderness.
Tier 3: This is a faction that works to control a capital city and its surrounding area or an entire region of wilderness.
Tier 4: This is a faction that runs in a country or country size swathe of wilderness.
Tier 5: This is a faction that has an empire, spanning several continents and potentially controlling an entire continent. They work on a global scale.

#### Tier Up
To increase the Tier of a faction, two of their [[#Traits]] must be at 5, they may then spend a [[Faction Actions|Faction Action]] to upscale.
Their Tier increases by +1.
Their Traits that were at 5 are now set to 2.
Their Traits that were below 5 are now to set to 1.
They may now recruit an additional [[#Leader]].

#### Tier Down
To decrease the Tier of a faction, two of their [[#Traits]] (excluding [[#Secrets]]) must be at 0, they then must spend their next [[Faction Actions|Faction Action]] to downsize.
Their Tier decreases by -1.
They keep all [[#Secrets]].
All of their other Traits decrease by 3.
If they have more than their new maximum number of [[#Leader|Leaders]], one of their [[#Leader|Leaders]] leaves the Faction (which may cause a disband roll).



## Size

Size represents the number of individuals in a factions as well as how many operations it can run simultaneously. It also serves as the health of a faction.

Size 0: This is a faction with only a couple people, potentially only its [[#Leader]].
Size 1: This is a small faction that is able to run an operation and hold some power.
Size 2: The standard faction size in most games, they can run a couple operations and have influence.
Size 3: A larger faction that focuses on recruitment and is very resilient. The weight of hierarchy affects them.
Size 4: A faction contains a massive number of people, enormous and hard to destroy.
Size 5: This is a faction that contains all the people in its region.

Increasing Size can be done by Recruitment.
Decreasing Size can be done by Massacre or Propaganda.


## Might

Might represents the violence this faction is capable of including subtle Assassinations and overt Massacres.

Might 0: This represents a faction that is incapable of doing anything other than protecting themselves.
Might 1: This is a militia or platoon capable of protecting a faction of Size 1 or controlling one of Size 0.
Might 2: This is a trained squadron capable of protecting a faction of Size 2 or controlling one of Size 1.
Might 3: This is a full army with infantry, cavalry and artillery capable of protecting a faction of Size 3 or controlling one of Size 2.
Might 4: This is a faction capable of fighting armies and protecting large amounts of territory of Size 4 or controlling one of Size 3.
Might 5: This is an army that moves on global scales, acting interplanar and often backed with several dangerous Monsters.

Increasing Might can be done by Arming and Recruitment.
Decreasing Might can be done by


## Influence

Influence represents how much a faction can convince Folk, spread Propaganda and Recruit.

Influence 0: This represents an insular faction incapable of spreading any belief.
Influence 1: This is an unpopular group that is able to recruit the vulnerable, isolated, or needy.

Increasing Influence can be done by 
Decreasing Influence can be done by Propaganda and Assassinations.


## Assets

Assets represents the monetary capabilities of a faction, whether that be raw money or items.

Assets 0: This represents a faction that is barely capable of meeting their own living standards.
Assets 1: This is an small group that has enough wealth to invest, set up industry, and employ people. They may own some common treasures.
Assets 2: This is a large business with money to be a known name in an industry. They own dozens treasures, some of them prohibitively expensive.
Assets 3: This is a mercantile faction that trades on industries, with several priceless treasures.
Assets 4: This is the wealth of an Empire, they have enough wealth to manipulate many Folk, and have unique treasures that will never be seen before.
Assets 5: These are the wealthiest individuals, they have treasures uncountable and some unknowable and enough liquid money to buy up kingdoms.

Increasing Assets can be done by Investment and Procurement.
Decreasing Assets can be done by Stealing.


## Secrets

Secrets represent knowledge that can turn the tide in favour of the Faction. 
Whether it be a magical spell only they know, a spy in the midst of their enemies, or a powerful artefact.

Unlike the other stats, Secrets are a linear scale, and each Secret can be spent to succeed on a Faction Action without rolling.
Secrets can also be used to hide a faction from being known or found.



# Composite Factions

Composite factions are a way of combining multiple factions together to represent a greater whole like a Country.
A Composite faction is always made up of factions of the same [[#Tier]], and is considered +1 [[#Tier]] higher than those factions.

Its Size is equal to the Size of its Folk
Its Might is equal to its Military's ([[#Size]] * [[#Might]]) / 5
Its Influence is equal to its Media ([[#Size]] * [[#Influence]]) / 5
Its Assets is equal to its Industry ([[#Size]] * [[#Assets]]) / 5
Its Secrets are calculated separately.



# Reputation

As a party, the players can gain or lose Reputation with a faction as they interact with them.
