import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Mahasiswa = () => {
    const params = useParams();
    const id = params.id;
    const [data, setData] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    
    const fetchData = async (tahunAjaran, kodeProdi, idMahasiswa) => 
    {
        const res = await axios.get('https://strapi-rygs.onrender.com/api/prodis/');
        const prodi = res.data.data[0].attributes.prodi[0].find(({ kode_prodi }) => kode_prodi === kodeProdi);
        const kelasMap = prodi.mahasiswa.find(({ tahun_masuk }) => tahun_masuk === `20${tahunAjaran}`);
        let mahasiswa;

        for (const listMahasiswa of Object.values(kelasMap.data)) {
            mahasiswa = listMahasiswa.find((e) => e.id === idMahasiswa) || undefined;
            if (mahasiswa !== undefined) {
                setData(mahasiswa);
                break;
            }
        }
        setDataFetched(true);
    };

    useEffect(() => 
    {
        const [tahunAjaran, kodeProdi, idMahasiswa] = [
        id.slice(0, 2),
        parseInt(id.slice(4, 6), 10),
        parseInt(id.slice(6), 10)
        ];

        if (id.length !== 10) {
            setDataFetched(true);
            return;
        }
        fetchData(tahunAjaran, kodeProdi, idMahasiswa);
    }, []);
  
  return !dataFetched ? null : !data ? 
    <div>
       <p style={{ fontSize: '24px' }}>Data Mahasiswa</p>
       <br></br>
       <p style={{ fontSize: '16px' }}>Mahasiswa Tidak terdata!</p>
    </div> : 
  (
    <div>
        <p style={{ fontSize: '24px' }}>Detail Data Mahasiswa</p>
        <br></br>
        <pre style={{ fontSize: '16px' }}>NPM           : {id}</pre>
        <pre style={{ fontSize: '16px' }}>Nama          : {data.nama}</pre>
        <pre style={{ fontSize: '16px' }}>Jenis Kelamin : {data.jenis_kelamin === 'L' ? 'Laki-laki' : data.jenis_kelamin === 'P' ? 'Perempuan' : 'Tidak Diketahui'} </pre>
        <pre style={{ fontSize: '16px' }}>Alamat        : {data.alamat}</pre>
        <pre style={{ fontSize: '16px' }}>Hobi          : {data.hobi.join(', ')}</pre>
    </div>
  );
}

export default Mahasiswa;