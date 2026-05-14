import { a as GetWorkersClient } from './Base_IAktlLoN.mjs';

class AuthAPI {
  Workers = GetWorkersClient();
  async Login(Email, Password) {
    const Response = await this.Workers.Authentication.Login(
      Email,
      Password
    );
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Login failed");
    }
    return Response.data;
  }
  async Register(Email, Password, Username, DisplayName) {
    const Response = await this.Workers.Authentication.Register(
      Email,
      Password,
      Username,
      DisplayName
    );
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Registration failed");
    }
    return Response.data;
  }
  async Logout() {
    const Response = await this.Workers.Authentication.Logout();
    if (!Response.success) {
      throw new Error(Response.error || "Logout failed");
    }
  }
  async Refresh(Token) {
    const Response = await this.Workers.Authentication.Refresh(Token);
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Token refresh failed");
    }
    return Response.data;
  }
  async VerifyEmail(Token) {
    const Response = await this.Workers.Authentication.VerifyEmail(Token);
    if (!Response.success) {
      throw new Error(Response.error || "Email verification failed");
    }
  }
  async ResendVerification() {
    const Response = await this.Workers.Authentication.ResendVerification();
    if (!Response.success) {
      throw new Error(
        Response.error || "Failed to resend verification email"
      );
    }
  }
  async ForgotPassword(Email) {
    const Response = await this.Workers.Authentication.ForgotPassword(Email);
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Password reset request failed");
    }
    return Response.data;
  }
  async ResetPassword(Token, Password) {
    const Response = await this.Workers.Authentication.ResetPassword(
      Token,
      Password
    );
    if (!Response.success) {
      throw new Error(Response.error || "Password reset failed");
    }
  }
  async GetSession() {
    const Response = await this.Workers.Authentication.GetSession();
    if (!Response.success || !Response.data) {
      throw new Error(Response.error || "Failed to get session");
    }
    return Response.data;
  }
  async OAuth(Provider) {
    return await this.Workers.Authentication.OAuth(Provider);
  }
}

export { AuthAPI as A };
