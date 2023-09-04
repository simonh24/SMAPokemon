import { ChipProps } from '@mui/material'

export interface PokemonProp {
  name: string
  url: string
}

export interface PokemonDetails {
  name: string
  id: number
  abilities: AbilityDetails[]
  sprites: $FixMe
  moves: MoveDetails[]
  types: Type[]
  stats: BaseStat[]
}

export interface AbilityDetails {
  is_hidden: boolean
  ability: Ability
}

export interface Ability {
  name: string
  url: string
}

export interface MoveDetails {
  move: Move
}

export interface Move {
  name: string
  url: string
}

export interface Type {
  name: string
  url: string
}

export interface Stat {
  name: string
  url: string
}

export interface BaseStat {
  base_stat: number
  stat: Stat
}

export interface ColoredChipProps extends ChipProps {
  eltype: $FixMe
}

export interface Pokemon {
  types: $FixMe
  sprites: $FixMe
  species: $FixMe
}

export interface Details {
  flavor_text: string
}

export interface PokemonInfo {
  name: string
  url: string
}
export interface Pokemon {
  name: string
  url: string
}
