import { Circle } from "better-react-spinkit";

function Loading() {
    return (
        
      <div style={{ backgroundColor: "#131c21" }}>
        <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
         <div>
           <img
            src="https://media.tenor.com/images/38b679b6c8ebcc211c3b38acd1afad55/tenor.gif"
            alt=""
            style={{ marginBottom: 10 }}
            height={200}
           />
           <Circle color="#3CBC28" size={60} />
         </div>
        </center>               
      </div>  
      
    )
}

export default Loading
