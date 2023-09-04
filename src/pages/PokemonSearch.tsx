import { useState } from 'react'
import { TextField, Typography, Grid, Container, Button } from '@mui/material'
import { PokemonInfoCard } from '../components/PokemonInfoCard'
import { PokemonInfo } from '../utils/Interfaces'

export function PokemonSearch() {
  const [val, setVal] = useState('')
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null)

  const handleChange = (e: $FixMe) => {
    setVal(e.target.value.toLowerCase())
  }

  const handleSearch = async () => {
    if (val.trim() === '') {
      return
    }
    setPokemon({
      name: val,
      url: `https://pokeapi.co/api/v2/pokemon/${val}`,
    })
  }

  return (
    <Container
      style={{
        paddingBottom: 24,
        paddingTop: 24,
        textAlign: 'center',
        background: 'white',
        marginTop: '20px',
        borderRadius: '5px',
      }}
      maxWidth={'lg'}
    >
      <Grid
        container
        spacing={{ xs: 4 }}
        columns={{ xs: 4 }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item xs={4} sm={4} md={4}>
          <Typography variant="h2">Find your Pokemon</Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            variant="outlined"
            color="secondary"
            label="search pokemon"
            onChange={handleChange}
            data-testid="search-input"
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            style={{ marginLeft: '10px' }}
            data-testid="search-button"
          >
            Search
          </Button>
        </Grid>
        {pokemon ? (
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <PokemonInfoCard
              pokemon={{ name: pokemon.name, url: pokemon.url }}
            />
          </Grid>
        ) : null}
      </Grid>
    </Container>
  )
}
