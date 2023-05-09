import '@/assets/scss/loading.scss'
const Loading = ({ texto = "Cargando" }) => {
    return ( 
        <div className="flex w-full h-screen justify-center items-center align-middle flex-col">
            <span className="loader"></span>
            <p className="text-center pt-5 text-devarana-midnight"> {texto} </p>
        </div>
     );
}
 
export default Loading;