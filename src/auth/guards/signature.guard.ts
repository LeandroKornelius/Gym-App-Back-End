import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { UsersService } from 'src/users/users.service';

interface AuthenticatedRequest extends Request {
  user?: any;
}

@Injectable()
export class SignatureGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const user = request.user;
    if (!user) throw new UnauthorizedException('User not authenticated');

    const { signature, payload } = request.body as any;
    if (!signature || !payload)
      throw new BadRequestException('Missing signature or payload in body');

    const signatureBuffer = Buffer.from(signature, 'base64');

    console.log(user.userId);
    const userDb = await this.usersService.findById(user.userId);
    const publicKey = userDb?.public_key;
    if (!publicKey)
      throw new UnauthorizedException('User has no public key registered');

    const verifier = crypto.createVerify('SHA256');
    verifier.update(JSON.stringify(payload));
    verifier.end();

    const isValid = verifier.verify(publicKey, signatureBuffer);
    if (!isValid) throw new UnauthorizedException('Invalid signature');

    return true;
  }
}
