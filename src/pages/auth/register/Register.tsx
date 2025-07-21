import UserRegister from "./child/UserRegister";
import { Card } from "../../../components/ui/card";

const Register = () => {
  return (
    <div className="flex justify-center items-center">
      <Card className="mx-3 my-12 md:px-10 pb-2">
        <UserRegister/>
      </Card>
    </div>
  )
}

export default Register
