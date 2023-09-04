import { useEffect, useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Link,
} from '@mui/material'
import { Details, Pokemon, PokemonProp } from '../utils/Interfaces'
import { ColoredChip } from '../utils/ColoredChip'

export function PokemonInfoCard(props: { pokemon: PokemonProp }) {
  const {
    pokemon: { name, url },
  } = props
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon)
  const [details, setDetails] = useState<Details | null>(null)

  const getData = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPokemon(data)
  }

  const getText = async () => {
    if (pokemon.species) {
      const response = await fetch(pokemon.species?.url)
      const data = await response.json()
      setDetails(
        data['flavor_text_entries'].find(
          (t: $FixMe) => t.language.name === 'en'
        )
      )
    }
  }

  useEffect(() => {
    getData()
  }, [url])

  useEffect(() => {
    getText()
  }, [pokemon])

  return (
    <div data-testid="info-card">
      {details ? (
        <Link href={`/pokemon/${name}`} sx={{ textDecoration: 'none' }}>
          <Card
            sx={{
              maxWidth: 345,
              minWidth: 240,
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <CardMedia
              component="img"
              alt={name}
              height="140"
              style={{ objectFit: 'contain' }}
              image={
                pokemon?.sprites?.other['official-artwork']['front_default']
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {details.flavor_text}
              </Typography>
            </CardContent>
            <CardActions>
              {pokemon?.types?.map((t: $FixMe) => (
                <ColoredChip
                  label={t.type.name.toUpperCase()}
                  key={t.type.name}
                  eltype={t.type.name}
                />
              ))}
            </CardActions>
          </Card>
        </Link>
      ) : null}
    </div>
  )
}
