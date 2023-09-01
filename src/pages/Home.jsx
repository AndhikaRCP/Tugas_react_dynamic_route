import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate();

  return (
    <div>
      <h1 className="t">Ini Home</h1>
      <div>
        <button className="p-2 px-4 border rounded-md mt-2 bg-white bg-opacity-30 hover:bg-opacity-50 border border-white" onClick={() => navigate("/prodi")}>Prodi</button>
      </div>
    </div>
  )
}

export default Home