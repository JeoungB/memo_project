import { useNavigate } from "react-router-dom";

const HomePage = (props) => {

    let navigate = useNavigate();

    return(
        <div className="homepage" style={{
          width : "75%",
          float : "right",
          position : "relative",
          top : "125px"
        }}>
            <div className="main">
                  <h2>Home</h2>
                  <div className="tag">
                    <p>Memos</p>
                    <p className="addmemo" onClick={() => {
                      navigate('/write');
                    }}>+ Addmemo</p>
                  </div>
                  <div className="content-box">
                    {
                      props.data?.map((data) => {
                        return <div key={data.id} className="content">{data.title}</div>
                      })
                    }
                  </div>
                </div>
        </div>
    )
}

export default HomePage;