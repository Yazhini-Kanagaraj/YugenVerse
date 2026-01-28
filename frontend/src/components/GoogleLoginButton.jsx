import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLoginButton({ onSuccess, onError }) {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/google`,
            { tokenId: credentialResponse.credential }
          );
          onSuccess(res.data);
        } catch (err) {
          console.error("Google login failed", err);
          onError && onError(err);
        }
      }}
      onError={() => {
        console.log("Google Login Failed");
        onError && onError();
      }}
    />
  );
}
