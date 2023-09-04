import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { BarChart } from '@mui/x-charts'
import { PokemonDetails } from '../utils/Interfaces'
import { ColoredChip } from '../utils/ColoredChip'

export function PokemonCard() {
  const { id } = useParams<{ id: string }>()
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  )

  async function fetchPokemonDetails() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()
    setPokemonDetails(data)
  }

  useEffect(() => {
    fetchPokemonDetails()
  }, [id])

  const baseStatsArray: number[] = pokemonDetails
    ? pokemonDetails.stats.map((stat) => stat.base_stat)
    : []

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {pokemonDetails ? (
        <div
          style={{
            background: 'white',
            padding: '20px',
            marginTop: '20px',
            borderRadius: '4px',
          }}
        >
          <h1>
            {pokemonDetails.name.charAt(0).toUpperCase() +
              pokemonDetails.name.slice(1)}
          </h1>
          <div className="types-div">
            {pokemonDetails.types.map((t: $FixMe) => (
              <ColoredChip
                label={t.type.name.toUpperCase()}
                key={t.type.name}
                eltype={t.type.name}
              />
            ))}
          </div>
          <img
            src={
              pokemonDetails.sprites.other['official-artwork']['front_default']
            }
            alt={pokemonDetails.name}
            height="140"
          />
          <Accordion sx={{ marginBottom: '10px' }}>
            <AccordionSummary
              sx={{ backgroundColor: '#212121' }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography sx={{ color: 'white' }}>Abilities</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: 'gray' }}>
              {pokemonDetails.abilities.map((a) => {
                return (
                  <p key={a.ability.name} style={{ color: 'white' }}>
                    {a.is_hidden ? '[HIDDEN] ' : null}
                    {a.ability.name.charAt(0).toUpperCase() +
                      a.ability.name.slice(1)}
                  </p>
                )
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ marginBottom: '10px' }}>
            <AccordionSummary
              sx={{ backgroundColor: '#212121' }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography sx={{ color: 'white' }}>Moves</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: 'gray' }}>
              {pokemonDetails.moves.map((m) => {
                const moveName = m.move.name
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
                return (
                  <p key={m.move.name} style={{ color: 'white' }}>
                    {moveName}
                  </p>
                )
              })}
            </AccordionDetails>
          </Accordion>
          <div>
            <h2 style={{ marginBottom: '-50px' }}>
              {pokemonDetails.name.charAt(0).toUpperCase() +
                pokemonDetails.name.slice(1)}
              &apos;s Base Stats
            </h2>
            <BarChart
              title="Base Stats"
              yAxis={[
                {
                  id: 'barCategories',
                  data: ['HP', 'Atk', 'SpA', 'Def', 'SpD', 'Spe'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: baseStatsArray,
                },
              ]}
              width={500}
              height={300}
              layout="horizontal"
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
