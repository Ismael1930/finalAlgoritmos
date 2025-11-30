import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  
  const databaseUrl = configService.get<string>('DATABASE_URL');

  if (databaseUrl) {
    // Configuración para Railway (Producción)
    console.log('🚀 Using DATABASE_URL for Railway');
    return {
      type: 'postgres',
      url: databaseUrl,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, 
      ssl: {
        rejectUnauthorized: false, 
      },
      logging: false,
    };
  }

  // Configuración para desarrollo local (Docker)
  console.log('🏠 Using local database configuration');
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USERNAME', 'postgres'),
    password: configService.get<string>('DB_PASSWORD', 'postgres'),
    database: configService.get<string>('DB_NAME', 'prestamos_db'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  };
};