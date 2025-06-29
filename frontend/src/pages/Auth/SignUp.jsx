import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import {validateEmail} from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import {API_PATHS} from "../../utils/apiPaths";
import {UserContext} from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Por favor, ingresá tu nombre");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, ingresá una dirección de correo electrónico válida");
      return;
    }

    if (!password) {
      setError("Por favor, ingresá la contraseña");
      return;
    }

    setError("");

    // SignUp API Call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const {token, user} = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/inicio");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Algo salió mal. Por favor, intentá de nuevo.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Crear una Cuenta</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Sumate hoy ingresando tus datos a continuación.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({target}) => setFullName(target.value)}
              label='Nombre Completo'
              placeholder='Juan Cito'
              type='text'
            />

            <Input
              value={email}
              onChange={({target}) => setEmail(target.value)}
              label='Correo electrónico'
              placeholder='ejemplo@email.com'
              type='text'
            />

            <div className='md:col-span-2'>
              <Input
                value={password}
                onChange={({target}) => setPassword(target.value)}
                label='Contraseña'
                placeholder='Mínimo 8 Carecteres'
                type='password'
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            REGISTRATE
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            ¿Ya tenés una cuenta?{" "}
            <Link className='font-medium text-primary underline' to='/ingresar'>
              Iniciá Sesión
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
