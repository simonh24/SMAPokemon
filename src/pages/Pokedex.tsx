import { useState, useEffect, useCallback } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { PokemonInfoCard } from '../components/PokemonInfoCard'
import { Pokemon } from '../utils/Interfaces'
import { CircularProgress } from '@mui/material'

export function Pokedex() {
  const [pokemon, setPokemon] = useState<Array<Pokemon>>([])
  const [offset, setOffset] = useState(0)

  const getPokemon = useCallback(async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=21&offset=${offset}`
    )
    const data = await response.json()
    setPokemon((prevPokemon) => prevPokemon.concat(data.results))
  }, [offset])

  useEffect(() => {
    getPokemon()
  }, [getPokemon])

  const handleLoad = () => {
    const position = window.innerHeight + document.documentElement.scrollTop
    const totalHeight = document.documentElement.offsetHeight
    if (position === totalHeight) {
      setOffset((prevOffset) => prevOffset + 21)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleLoad)
    return () => {
      window.removeEventListener('scroll', handleLoad)
    }
  }, [])

  return (
    <Container
      sx={{
        paddingBottom: 24,
        paddingTop: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      maxWidth={'lg'}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {pokemon.map((p) => (
          <Grid item xs={4} sm={4} md={4} key={p.name}>
            <PokemonInfoCard pokemon={p} />
            <br />
          </Grid>
        ))}
      </Grid>
      <CircularProgress color="info" />
    </Container>
  )
}
