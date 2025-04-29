import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from '../menu/create-menu-dto';
import { Menu } from './menu.entity';  // Mengimpor entity Menu
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = this.menuRepository.create(createMenuDto);
    return this.menuRepository.save(menu);
  }

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.find(); // Fetch semua data menu dari database
  }
}
