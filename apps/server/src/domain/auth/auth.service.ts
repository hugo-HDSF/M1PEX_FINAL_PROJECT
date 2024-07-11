import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '$prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
	) {
	}
	
	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.prisma.user.findUnique({where: {email}});
		
		if (user && (await bcrypt.compare(pass, user.password))) {
			const {password, ...result} = user;
			return result;
		}
		return null;
	}
	
	async login(user: User) {
		const payload = {user};
		return {
			access_token: this.jwtService.sign(payload),
			id: user.id,
			email: user.email,
			username: user.username,
			phoneNumber: user.phoneNumber,
		};
	}
	
	async register(data: any) {
		const hashedPassword = await bcrypt.hash(data.password, 10);
		return this.prisma.user.create({
			data: {
				...data,
				password: hashedPassword,
			},
		});
	}
}
