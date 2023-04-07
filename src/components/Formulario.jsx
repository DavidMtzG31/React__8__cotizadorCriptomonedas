import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useSelectMonedas from '../hooks/useSelectMonedas';
import {monedas} from '../data/monedas';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #EEE;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;


    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ( {setMonedas} ) => {

    const [ cryptos, setCriptos ] = useState([]);
    const [ error, setError ] = useState(false);

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas); // El moneda del inicio es el state del Hook personalizado
    const [ criptomoneda, SelectCriptomonedas ] = useSelectMonedas('Elige tu Cripto', cryptos);

    useEffect( () => {
        const consutlarAPI = async () => {
          const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

          const respuesta = await fetch(url);
          const resultado = await respuesta.json();

          const arrayCriptos = resultado.Data.map( (cripto) => {

            const objeto = {
              id: cripto.CoinInfo.Name,
              nombre: cripto.CoinInfo.FullName
            }

            return objeto;
          })

          setCriptos(arrayCriptos)

        }

        consutlarAPI();
    },[])

    const handleSubmit = (e) => {
      e.preventDefault();

      if( [moneda, criptomoneda].includes('') ) {
        setError(true);

        return;
      }

      setError(false);
      setMonedas({
          moneda,
          criptomoneda
      })
      }

  return (

    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      
      <form form
          onSubmit={handleSubmit}
      >

        <SelectMonedas />

        <SelectCriptomonedas />

        <InputSubmit 
              type="submit" 
              value="Cotizar"
          /> 
      </form>
  </>

  )
}

export default Formulario