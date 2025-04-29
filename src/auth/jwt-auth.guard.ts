import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) throw new UnauthorizedException('Token tidak ditemukan');
  
      try {
        const payload = this.jwtService.verify(token);
        request.user = payload;
        return true;
      } catch (err) {
        throw new UnauthorizedException('Token tidak valid');
      }
    }
  
    private extractTokenFromHeader(request: Request): string | null {
      const authHeader = request.headers.authorization;
      if (!authHeader) return null;
  
      const [type, token] = authHeader.split(' ');
      return type === 'Bearer' ? token : null;
    }
  }
  