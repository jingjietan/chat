import { Outlet, useNavigation } from "react-router-dom"
import NavBar from "./NavBar"

const Root = () => {
  const navigation = useNavigation()
  return (
    <div className="flex flex-col min-h-screen">
      { navigation.state === "loading" && <div>loading</div>}
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default Root