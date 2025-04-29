import { Controller, Post, Body, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './create-menu-dto';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  async getAllMenus() {
    return this.menuService.findAll();
  }
}
