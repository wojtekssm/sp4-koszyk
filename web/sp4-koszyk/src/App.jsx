import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const PRODUKTY = [
    {id:1, nazwa:"Notes", cena:12.50},
    {id:2, nazwa:"Długopis", cena:3.20},
    {id:3, nazwa:"Plecak", cena:89.00},
    {id:4, nazwa:"Kalkulator", cena:45.90},
    {id:5, nazwa:"Zakreślacz", cena:4.75},
  ]

  const wypiszStanKonsoli = (aktualnyKoszyk) => {
    const liczbaPozycji = aktualnyKoszyk.length;
    const sumaWszystkiego = aktualnyKoszyk.reduce( (suma, pozycja) => suma + pozycja.cena * pozycja.ilosc, 0)

    console.log(`Koszyk: ${liczbaPozycji} pozycji; suma: ${sumaWszystkiego.toFixed(2)}`)
  }

  const [koszyk, setKoszyk] = useState([])

  const dodajDoKoszyka = (produkt) => {
    const czyIstnieje = koszyk.some( (pozycja) => pozycja.id === produkt.id)
    let nowyKoszyk
    if(czyIstnieje){
      nowyKoszyk = koszyk.map((pozycja) => pozycja.id === produkt.id ? {...pozycja, ilosc: pozycja.ilosc +1} : pozycja)
    }else{
      nowyKoszyk = [...koszyk, {...produkt, ilosc: 1}]
    }
    setKoszyk(nowyKoszyk)
    wypiszStanKonsoli(nowyKoszyk)
  }

  const usunZKoszyka = (produkt) => {
    const nowyKoszyk = koszyk.filter( (pozycja) => pozycja.id !== produkt.id)
    setKoszyk(nowyKoszyk)
    wypiszStanKonsoli(nowyKoszyk)
  }

  const sumaKoszyka = koszyk.reduce((suma, pozycja) => suma + pozycja.cena * pozycja.ilosc,0)
  return (
    <div className='m-3'>
      <h2>Sklepik szkolny</h2>
      <ul className="list-group">
        {PRODUKTY.map( (produkt) => (
          <li key={produkt.id} className="list-group-item d-flex justify-content-between align-items-center">
          {produkt.nazwa} – {produkt.cena.toFixed(2)} zł
          <button type="button" className="btn btn-sm btn-primary" onClick={() => dodajDoKoszyka(produkt)}>Do koszyka</button>
        </li>
        ))}
      </ul>
      <h3>Koszyk ({koszyk.length} pozycji)</h3>
      {koszyk.length > 0 ? 
      (
        <div>
          <table className="table">
          <thead>
            <tr><th scope="col">Produkt</th><th scope="col">Ilość</th><th scope="col">Cena</th><th scope="col">Suma</th><th scope="col">Akcja</th></tr>
          </thead>
          <tbody>
            {koszyk.map( (produkt => (
              <tr key={produkt.id}>
              <td>{produkt.nazwa}</td><td>{produkt.ilosc}</td><td>{produkt.cena} zł</td><td>{(produkt.ilosc * produkt.cena).toFixed(2)} zł</td>
              <td><button type="button" className="btn btn-sm btn-outline-danger" onClick={() => usunZKoszyka(produkt)}>Usuń</button></td>
            </tr>
            )))}
          </tbody>
        </table>
        <p className='fw-bold'>Suma: {sumaKoszyka.toFixed(2)} zł</p>
        </div>
      ) :
      (<p className='alert alert-info'>Koszyk jest pusty</p>)}
    </div>
  )
}

export default App
