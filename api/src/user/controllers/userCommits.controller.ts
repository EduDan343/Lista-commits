import {
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    ParseIntPipe,
    Controller,
} from '@nestjs/common';

import { UserCommitService } from '../services/userCommit.service';
import { ReadCommitsDto, UpdateCommitDto } from '../dtos/userCommits.dtos';

@Controller('commits')
export class UserCommitsController {
    constructor(
        private UserCommitService: UserCommitService
    ) { }

    @Get()
    findAll() {
        return this.UserCommitService.findAllCommits();
    }

    // @Get(':id')
    // get(@Param('id', ParseIntPipe) id: number) {
    //     return this.usersService.findOne(id);
    // }

    // @Get(':id/orders')
    // getOrders(@Param('id', ParseIntPipe) id: number) {
    //     return this.usersService.getOrderByUser(id);
    // }
}
