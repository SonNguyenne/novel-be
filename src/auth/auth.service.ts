import { BadRequestException, Injectable } from '@nestjs/common';
import {
  SignUpCommand,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  ConfirmSignUpCommand,
  AuthFlowType,
  ResendConfirmationCodeCommand,
  ForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { ResendAuthDto } from './dto/resend-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

@Injectable()
export class AuthService {
  async signup(signupAuthDto: SignupAuthDto) {
    if (!signupAuthDto.name)
      throw new BadRequestException('Name cannot be null');
    if (!signupAuthDto.email)
      throw new BadRequestException('Email cannot be null');
    if (!signupAuthDto.password)
      throw new BadRequestException('Password cannot be null');

    const command = new SignUpCommand({
      ClientId: process.env.CLIENT_ID_KEY,
      Username: signupAuthDto.email,
      Password: signupAuthDto.password,
      UserAttributes: [
        { Name: 'email', Value: signupAuthDto.email },
        { Name: 'name', Value: signupAuthDto.name },
      ],
    });

    try {
      const response = await client.send(command);

      if (response.$metadata.httpStatusCode === 200) {
        return {
          email: signupAuthDto.email,
          name: signupAuthDto.name,
        };
      }
    } catch (error) {
      if (error.$metadata.httpStatusCode === 400) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  async verify(verifyAuthDto: VerifyAuthDto) {
    const params = {
      ClientId: process.env.CLIENT_ID_KEY,
      ConfirmationCode: verifyAuthDto.code.toString(),
      Username: verifyAuthDto.email,
    };

    const command = new ConfirmSignUpCommand(params);

    try {
      const response = await client.send(command);
      if (response.$metadata.httpStatusCode === 200) {
        return response;
      }
    } catch (error) {
      if (error.$metadata.httpStatusCode === 400) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  async resend(resendAuthDto: ResendAuthDto) {
    if (!resendAuthDto.email)
      throw new BadRequestException('Email cannot be null');

    try {
      const params = {
        Username: resendAuthDto.email,
        ClientId: process.env.CLIENT_ID_KEY,
      };

      const command = new ResendConfirmationCodeCommand(params);

      const response = await client.send(command);

      return response;
    } catch (error) {
      if (error.$metadata.httpStatusCode === 400) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  async signin(signinAuthDto: SigninAuthDto) {
    if (!signinAuthDto.email)
      throw new BadRequestException('Email cannot be null');
    if (!signinAuthDto.password)
      throw new BadRequestException('Password cannot be null');

    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: process.env.CLIENT_ID_KEY,
      AuthParameters: {
        USERNAME: signinAuthDto.email,
        PASSWORD: signinAuthDto.password,
      },
    });

    try {
      const response = await client.send(command);

      if (response.$metadata.httpStatusCode === 200) {
        // TODO: Put refresh token to user, Get from db
        const user = {
          name: 'Thanh',
          email: 'Test',
        };
        return {
          accessToken: response.AuthenticationResult.AccessToken,
          expiresIn: response.AuthenticationResult.ExpiresIn,
          refreshToen: response.AuthenticationResult.RefreshToken,
          data: {
            ...user,
          },
        };
      }
    } catch (error) {
      if (error.$metadata.httpStatusCode === 400) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  async refresh(refreshAuthDto: RefreshAuthDto) {
    if (!refreshAuthDto.refreshToken)
      throw new BadRequestException('Refresh token cannot be null');

    const params = {
      ClientId: process.env.CLIENT_ID_KEY,
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      AuthParameters: {
        REFRESH_TOKEN: refreshAuthDto.refreshToken,
      },
    };

    const command = new InitiateAuthCommand(params);

    try {
      const response = await client.send(command);
      if (response.$metadata.httpStatusCode === 200) {
        return {
          accessToken: response.AuthenticationResult.AccessToken,
          expiresIn: response.AuthenticationResult.ExpiresIn,
        };
      }
    } catch (error) {
      if (error.$metadata.httpStatusCode === 400) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  async forgot(resendAuthDto: ResendAuthDto) {
    if (!resendAuthDto.email)
      throw new BadRequestException('Email cannot be null');

    try {
      const params = {
        Username: resendAuthDto.email,
        ClientId: process.env.CLIENT_ID_KEY,
      };

      const command = new ForgotPasswordCommand(params);

      const response = await client.send(command);

      return response;
    } catch (error) {
      if (error.$metadata.httpStatusCode === 400) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  async signout() {
    // TODO: Delete refresh token in user db
    return 'This action log out the user';
  }
}
