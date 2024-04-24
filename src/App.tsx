import React, { useEffect, useState } from 'react';
import './App.css'

const useJsonFetch = (url: string, opts: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url+opts);
        const json = await response.json();
        setLoading(false);
        setData(json.status);
        setError(null);
      } catch(error) {
        setLoading(false);
        setData(null);
        //@ts-expect-error unknow type
        setError('Возникла ошибка: ' + error);
      }
    }
    fetchData();
  }, [opts])
  
  async () => {
    await fetch(url+opts)
    .then(res => res.json())
    .then(result => setData(result))
    .catch(e => setError(e))
    await setLoading(false);
  }

  return [data, loading, error]
}

function App() {
  const url = 'http://localhost:7030/';
  const [opts, setOpts] = useState('data');
  const [data, loading, error] = useJsonFetch(url, opts);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const button: HTMLButtonElement = e.currentTarget;
    setOpts(button.name);
  }

  return (
    <>
      <div className='container'>
        <div className='block'>
          {loading ? 'Идёт загрузка...' : data ? data : error}
        </div>
      </div>
      <button type='button' name='error' onClick={handleClick}>Получить ошибку</button>
      <button type='button' name='data' onClick={handleClick}>Получить данные быстро</button>
      <button type='button' name='loading' onClick={handleClick}>Получить данные с задержкой</button>
    </>
  )
}

export default App


/*
const [data, loading, error] = useJsonFetch(url, opts);

где:

data — данные, полученные после response.json(), не Promise, а именно данные;
error — ошибка: ошибка сети, ошибка ответа, если код не 20x, ошибка парсинга, если пришёл не JSON;
loading — boolean флаг, сигнализирующий о том, что загрузка идёт.
Покажите использование этого хука на примере трёх компонентов, каждый из которых делает запросы на следующие адреса:

GET http://localhost:7070/data — успешное получение данных;
GET http://localhost:7070/error — получение 500 ошибки;
GET http://localhost:7070/loading — индикатор загрузки.
*/