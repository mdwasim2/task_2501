import { useSelector } from "react-redux"

const Home = () => {

  let user = useSelector((state)=>state.userInfo.value)

  console.log(user)
  return (
    <div>




      <h1>Home</h1>
      <h1>{user.displayName}</h1>
    </div>
  )
}
export default Home