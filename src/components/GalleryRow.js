import { Link } from "react-router-dom";
import useFormattedDate from '../hooks/useFormattedDate';


export default function GalleryRow({ gallery }) {
  const formattedDate = useFormattedDate(gallery ? gallery.created_at : "", "dd-MM-yyyy HH:mm");


    return (
      <div>
        {gallery ? (
          <div
            style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "solid",
            margin: "5px",
            width: "40%",
            backgroundColor:'#F5F5F5',
            justifyContent: "center",
            }}
          >
  
          
            <div style={{  padding: "10px", fontSize:"20px" , fontWeight: "bold", }}>
              <Link style={{textDecoration:"none",color:"black"}} to={`/galleries/${gallery?.id}`}>{gallery?.title}</Link>
            </div>
            {formattedDate === "unknown" ? (
                        <div style={{ padding: "5px" }}>
                        Unknown date
                      </div>
                      ) : (
                          <div style={{ padding: "2px",fontSize:"10px" }}>
                          Created at: {formattedDate}
                        </div>
                      )}
            <div style={{ padding: "10px"  }}>
              <img src={gallery?.images[0]?.url} width="100" alt="Gallery cover" />
            </div>
              
            <div style={{ padding: "10px", color:"red", fontSize: 12 ,fontWeight: "bold"}}>
              Author: <Link style={{color:"black",fontWeight: "bold"}} to={`/authors/${gallery?.user.id}`}>{gallery?.user?.first_name} {gallery?.user?.last_name}</Link>
            </div>

          </div>

        ) : (
          <div>Loading</div>

        )
        }

      </div>
    );
  }