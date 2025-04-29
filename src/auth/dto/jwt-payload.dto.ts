// src/auth/dto/jwt-payload.dto.ts
export class JwtPayloadDto {
  sub: number;   // ID pengguna
  email: string; // Email pengguna
  iat?: number;  // Waktu diterbitkannya token
  exp?: number;  // Waktu kadaluarsa token
}
